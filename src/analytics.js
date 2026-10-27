import { columns, redact } from './db.js'

const cache = { at: 0, value: null }

function days(rows) {
  const map = new Map(rows.map((row) => [row.day, row.n]))
  const out = []
  const start = new Date()
  start.setUTCHours(0, 0, 0, 0)
  start.setUTCDate(start.getUTCDate() - 13)
  for (let i = 0; i < 14; i += 1) {
    const day = new Date(start)
    day.setUTCDate(start.getUTCDate() + i)
    const key = day.toISOString().slice(0, 10)
    out.push({ day: key, n: map.get(key) || 0 })
  }
  return out
}

async function one(pool) {
  const colsCalls = await columns(pool, 'calls')
  const colsLeads = await columns(pool, 'leads')
  const colsCampaigns = await columns(pool, 'campaigns')
  const version = await pool.query(`SELECT current_setting('server_version') AS version`)
  const headline = await pool.query(`
    SELECT
      (SELECT count(*)::int FROM calls) AS calls,
      (SELECT count(*)::int FROM leads) AS leads,
      (SELECT count(*)::int FROM sales) AS sales,
      (SELECT max(started_at) FROM calls) AS latest_call
  `)
  const daily = colsCalls.has('started_at')
    ? await pool.query(`
        SELECT to_char(date_trunc('day', started_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS day,
               count(*)::int AS n
        FROM calls
        WHERE started_at >= now() - interval '14 days'
        GROUP BY 1
      `)
    : { rows: [] }
  const byStatus = colsCalls.has('status')
    ? await pool.query(`
        SELECT status::text AS label, count(*)::int AS n
        FROM calls
        WHERE started_at >= now() - interval '14 days'
        GROUP BY 1
        ORDER BY n DESC
        LIMIT 6
      `)
    : { rows: [] }
  const byOutcome = colsCalls.has('outcome')
    ? await pool.query(`
        SELECT coalesce(outcome::text, '(none)') AS label, count(*)::int AS n
        FROM calls
        WHERE started_at >= now() - interval '14 days'
        GROUP BY 1
        ORDER BY n DESC
        LIMIT 6
      `)
    : { rows: [] }
  const leadStatus = colsLeads.has('status')
    ? await pool.query(`
        SELECT status::text AS label, count(*)::int AS n
        FROM leads
        GROUP BY 1
        ORDER BY n DESC
        LIMIT 6
      `)
    : { rows: [] }
  const liveCampaigns = colsCampaigns.has('status')
    ? await pool.query(`SELECT count(*)::int AS n FROM campaigns WHERE status::text = 'live'`)
    : { rows: [{ n: null }] }
  const [sellers, callCentres, operatorOrgs] = await Promise.all([
    sellerOrganizations(pool, colsCampaigns),
    assignedOrganizations(pool, 'call_centres', 'call_centre_campaigns', 'call_centre_id'),
    assignedOrganizations(pool, 'campaign_operator_orgs', 'campaign_operator_grants', 'org_id'),
  ])
  const row = headline.rows[0]
  return {
    ok: true,
    version: version.rows[0].version,
    calls: row.calls,
    leads: row.leads,
    sales: row.sales,
    liveCampaigns: liveCampaigns.rows[0].n,
    latestCall: row.latest_call ? new Date(row.latest_call).toISOString() : null,
    dailyCalls: days(daily.rows),
    callStatus: byStatus.rows,
    callOutcome: byOutcome.rows,
    leadStatus: leadStatus.rows,
    sellers,
    callCentres,
    operatorOrgs,
  }
}

async function sellerOrganizations(pool, campaignCols) {
  const profiles = await columns(pool, 'advertiser_profiles')
  if (!profiles.has('company_name') || !campaignCols.has('advertiser_id')) return []
  const verified = profiles.has('is_verified') ? 'a.is_verified' : 'NULL::boolean'
  const result = await pool.query(`
    WITH camp AS (
      SELECT advertiser_id, count(*)::int AS campaigns
      FROM campaigns
      GROUP BY advertiser_id
    ),
    call_n AS (
      SELECT c.advertiser_id, count(*)::int AS calls
      FROM calls ca
      JOIN campaigns c ON c.id = ca.campaign_id
      GROUP BY c.advertiser_id
    ),
    lead_n AS (
      SELECT c.advertiser_id, count(*)::int AS leads
      FROM leads l
      JOIN campaigns c ON c.id = l.campaign_id
      GROUP BY c.advertiser_id
    ),
    sale_n AS (
      SELECT c.advertiser_id, count(*)::int AS sales
      FROM sales s
      JOIN campaigns c ON c.id = s.campaign_id
      GROUP BY c.advertiser_id
    )
    SELECT
      coalesce(nullif(a.company_name, ''), '(unnamed)') AS name,
      ${verified} AS verified,
      coalesce(camp.campaigns, 0)::int AS campaigns,
      coalesce(lead_n.leads, 0)::int AS leads,
      coalesce(call_n.calls, 0)::int AS calls,
      coalesce(sale_n.sales, 0)::int AS sales
    FROM advertiser_profiles a
    LEFT JOIN camp ON camp.advertiser_id = a.id
    LEFT JOIN call_n ON call_n.advertiser_id = a.id
    LEFT JOIN lead_n ON lead_n.advertiser_id = a.id
    LEFT JOIN sale_n ON sale_n.advertiser_id = a.id
    WHERE coalesce(camp.campaigns, 0) + coalesce(call_n.calls, 0)
        + coalesce(lead_n.leads, 0) + coalesce(sale_n.sales, 0) > 0
    ORDER BY calls DESC, leads DESC, sales DESC, name
  `)
  return result.rows
}

async function assignedOrganizations(pool, table, linkTable, foreignKey) {
  const orgCols = await columns(pool, table)
  const linkCols = await columns(pool, linkTable)
  if (!orgCols.has('id') || !orgCols.has('name') || !linkCols.has('campaign_id') || !linkCols.has(foreignKey)) {
    return []
  }
  const status = orgCols.has('status') ? 'o.status' : 'NULL::text'
  const result = await pool.query(`
    WITH link AS (
      SELECT o.id, o.name, ${status} AS status, l.campaign_id
      FROM ${table} o
      JOIN ${linkTable} l ON l.${foreignKey} = o.id
    ),
    call_n AS (SELECT campaign_id, count(*)::int AS n FROM calls GROUP BY 1),
    lead_n AS (SELECT campaign_id, count(*)::int AS n FROM leads GROUP BY 1),
    sale_n AS (SELECT campaign_id, count(*)::int AS n FROM sales GROUP BY 1)
    SELECT
      link.name,
      link.status,
      count(DISTINCT link.campaign_id)::int AS campaigns,
      coalesce(sum(call_n.n), 0)::int AS calls,
      coalesce(sum(lead_n.n), 0)::int AS leads,
      coalesce(sum(sale_n.n), 0)::int AS sales
    FROM link
    LEFT JOIN call_n ON call_n.campaign_id = link.campaign_id
    LEFT JOIN lead_n ON lead_n.campaign_id = link.campaign_id
    LEFT JOIN sale_n ON sale_n.campaign_id = link.campaign_id
    GROUP BY link.id, link.name, link.status
    ORDER BY calls DESC, name
  `)
  return result.rows
}

export async function loadAnalytics(pools, recorder) {
  if (cache.value && Date.now() - cache.at < 30_000) return cache.value
  const sources = {}
  for (const source of pools) {
    if (!source.pool) {
      sources[source.name] = { ok: false, error: source.error }
      continue
    }
    try {
      sources[source.name] = await one(source.pool)
    } catch (err) {
      sources[source.name] = { ok: false, error: redact(err) }
    }
  }
  cache.value = {
    generatedAt: new Date().toISOString(),
    sources,
    recorder: {
      startedAt: recorder.state.startedAt,
      lastPollAt: recorder.state.lastPollAt,
      lastError: recorder.state.lastError,
      counts: recorder.counts(),
      recent: recorder.recent(),
    },
  }
  cache.at = Date.now()
  return cache.value
}
