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
  }
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
