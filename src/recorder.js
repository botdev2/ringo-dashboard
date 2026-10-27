import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { columns, dataDir, redact } from './db.js'

const ZERO_ID = '00000000-0000-0000-0000-000000000000'

function openSqlite() {
  const db = new DatabaseSync(path.join(dataDir(), 'ringo.sqlite'))
  db.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source TEXT NOT NULL,
      kind TEXT NOT NULL,
      external_id TEXT NOT NULL,
      happened_at TEXT NOT NULL,
      recorded_at TEXT NOT NULL,
      status TEXT,
      outcome TEXT,
      country TEXT,
      duration_sec INTEGER,
      UNIQUE(source, kind, external_id)
    );
    CREATE TABLE IF NOT EXISTS cursors (
      source TEXT NOT NULL,
      kind TEXT NOT NULL,
      cursor_at TEXT NOT NULL,
      cursor_id TEXT NOT NULL,
      PRIMARY KEY (source, kind)
    );
    CREATE TABLE IF NOT EXISTS snapshots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recorded_at TEXT NOT NULL,
      source TEXT NOT NULL,
      calls INTEGER,
      leads INTEGER,
      sales INTEGER,
      latest_call TEXT
    );
  `)
  return db
}

function cursorOf(db, source, kind) {
  const row = db.prepare('SELECT cursor_at, cursor_id FROM cursors WHERE source = ? AND kind = ?').get(source, kind)
  if (row) return row
  const cursorAt = new Date(Date.now() - 60_000).toISOString()
  db.prepare('INSERT INTO cursors (source, kind, cursor_at, cursor_id) VALUES (?, ?, ?, ?)').run(source, kind, cursorAt, ZERO_ID)
  return { cursor_at: cursorAt, cursor_id: ZERO_ID }
}

function saveCursor(db, source, kind, at, id) {
  db.prepare('UPDATE cursors SET cursor_at = ?, cursor_id = ? WHERE source = ? AND kind = ?').run(at, id, source, kind)
}

async function pullKind(pool, source, kind, db) {
  const table = kind === 'call' ? 'calls' : kind === 'lead' ? 'leads' : 'sales'
  const cols = await columns(pool, table)
  if (!cols.has('id')) return []
  const timeCol = kind === 'call' && cols.has('started_at') ? 'started_at' : 'created_at'
  if (!cols.has(timeCol)) return []
  const cursor = cursorOf(db, source, kind)
  const select = ['t.id::text AS id', `t.${timeCol} AS happened_at`]
  if (cols.has('status')) select.push('t.status::text AS status')
  else if (cols.has('confirmation_status')) select.push('t.confirmation_status::text AS status')
  else select.push('NULL AS status')
  if (cols.has('outcome')) select.push('t.outcome::text AS outcome')
  else if (cols.has('payment_status')) select.push('t.payment_status::text AS outcome')
  else select.push('NULL AS outcome')
  if (cols.has('duration')) select.push('t.duration AS duration_sec')
  else select.push('NULL AS duration_sec')
  const join = kind === 'call' && cols.has('campaign_id')
    ? 'LEFT JOIN campaigns camp ON camp.id = t.campaign_id'
    : ''
  const country = join && (await columns(pool, 'campaigns')).has('country')
    ? 'camp.country AS country'
    : 'NULL AS country'
  const result = await pool.query(
    `SELECT ${select.join(', ')}, ${country}
     FROM ${table} t
     ${join}
     WHERE (t.${timeCol}, t.id) > ($1::timestamptz, $2::uuid)
     ORDER BY t.${timeCol}, t.id
     LIMIT 200`,
    [cursor.cursor_at, cursor.cursor_id],
  )
  if (result.rows.length === 0) return []
  const insert = db.prepare(
    `INSERT OR IGNORE INTO events
      (source, kind, external_id, happened_at, recorded_at, status, outcome, country, duration_sec)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
  const recordedAt = new Date().toISOString()
  const saved = []
  db.exec('BEGIN')
  try {
    for (const row of result.rows) {
      const info = insert.run(
        source,
        kind,
        row.id,
        new Date(row.happened_at).toISOString(),
        recordedAt,
        row.status,
        row.outcome,
        row.country,
        row.duration_sec,
      )
      if (info.changes > 0) {
        saved.push({
          source,
          kind,
          status: row.status,
          outcome: row.outcome,
          country: row.country,
          durationSec: row.duration_sec,
          happenedAt: new Date(row.happened_at).toISOString(),
        })
      }
    }
    const last = result.rows[result.rows.length - 1]
    saveCursor(db, source, kind, new Date(last.happened_at).toISOString(), last.id)
    db.exec('COMMIT')
  } catch (err) {
    db.exec('ROLLBACK')
    throw err
  }
  return saved
}

export function startRecorder(pools, emit) {
  const db = openSqlite()
  const state = { startedAt: new Date().toISOString(), lastPollAt: null, lastError: null, lastSnapshotAt: 0 }

  async function snapshot() {
    for (const source of pools) {
      if (!source.pool) continue
      const counts = await source.pool.query(`
        SELECT
          (SELECT count(*)::int FROM calls) AS calls,
          (SELECT count(*)::int FROM leads) AS leads,
          (SELECT count(*)::int FROM sales) AS sales,
          (SELECT max(started_at) FROM calls) AS latest_call
      `)
      const row = counts.rows[0]
      db.prepare(
        `INSERT INTO snapshots (recorded_at, source, calls, leads, sales, latest_call)
         VALUES (?, ?, ?, ?, ?, ?)`,
      ).run(
        new Date().toISOString(),
        source.name,
        row.calls,
        row.leads,
        row.sales,
        row.latest_call ? new Date(row.latest_call).toISOString() : null,
      )
    }
    state.lastSnapshotAt = Date.now()
  }

  async function poll() {
    const fresh = []
    for (const source of pools) {
      if (!source.pool) continue
      for (const kind of ['call', 'lead', 'sale']) {
        try {
          const rows = await pullKind(source.pool, source.name, kind, db)
          fresh.push(...rows)
        } catch (err) {
          state.lastError = `${source.name} ${kind}: ${redact(err)}`
        }
      }
    }
    state.lastPollAt = new Date().toISOString()
    if (Date.now() - state.lastSnapshotAt > 60_000) {
      try {
        await snapshot()
      } catch (err) {
        state.lastError = `snapshot: ${redact(err)}`
      }
    }
    if (fresh.length) emit(fresh)
  }

  const timer = setInterval(() => {
    poll().catch((err) => {
      state.lastError = redact(err)
    })
  }, Number(process.env.POLL_MS || 10_000))
  poll().catch((err) => {
    state.lastError = redact(err)
  })

  return {
    stop() {
      clearInterval(timer)
    },
    state,
    recent(limit = 40) {
      return db.prepare(
        `SELECT source, kind, happened_at, recorded_at, status, outcome, country, duration_sec
         FROM events ORDER BY id DESC LIMIT ?`,
      ).all(limit)
    },
    counts() {
      return db.prepare('SELECT source, kind, count(*) AS n FROM events GROUP BY 1, 2').all()
    },
  }
}
