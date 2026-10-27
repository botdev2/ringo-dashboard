import fs from 'node:fs'
import path from 'node:path'
import pg from 'pg'

const SOURCES = [
  ['ringomarket', process.env.RINGOMARKET_DATABASE_URL],
  ['soittamo', process.env.SOITTAMO_DATABASE_URL],
  ['staging', process.env.STAGING_DATABASE_URL],
]

export function openPools() {
  const pools = []
  for (const [name, connectionString] of SOURCES) {
    if (!connectionString) {
      pools.push({ name, pool: null, error: 'not configured' })
      continue
    }
    const pool = new pg.Pool({
      connectionString,
      max: 2,
      connectionTimeoutMillis: 15000,
      idleTimeoutMillis: 20000,
    })
    pool.on('connect', (client) => {
      client.query('SET statement_timeout = 20000').catch(() => {})
    })
    pools.push({ name, pool, error: null })
  }
  return pools
}

export function redact(err) {
  return String(err && err.message ? err.message : err)
    .replace(/postgres(?:ql)?:\/\/\S+/gi, 'postgres://***')
    .slice(0, 240)
}

export async function columns(pool, table) {
  const result = await pool.query(
    `SELECT column_name FROM information_schema.columns
     WHERE table_schema = 'public' AND table_name = $1`,
    [table],
  )
  return new Set(result.rows.map((row) => row.column_name))
}

export function dataDir() {
  const dir = process.env.DATA_DIR || path.join(process.cwd(), 'data')
  fs.mkdirSync(dir, { recursive: true })
  return dir
}
