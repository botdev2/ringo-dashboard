import { spawn } from 'node:child_process'
import { execFileSync } from 'node:child_process'

function cs(project, db) {
  return execFileSync(
    'neon.cmd',
    ['connection-string', 'production', '--project-id', project, '--database-name', db, '--pooled', 'false'],
    { encoding: 'utf8', shell: true, windowsHide: true },
  ).trim()
}

const env = {
  ...process.env,
  PORT: '3017',
  DATA_DIR: 'data',
  POLL_MS: '60000',
  RINGOMARKET_DATABASE_URL: cs('round-thunder-88661271', 'neondb'),
  SOITTAMO_DATABASE_URL: cs('noisy-unit-13631194', 'neondb'),
  STAGING_DATABASE_URL: cs('lingering-resonance-21157504', 'ringomarket_telegram_staging'),
}
const child = spawn(process.execPath, ['src/server.js'], { env, stdio: ['ignore', 'pipe', 'pipe'] })
let log = ''
child.stdout.on('data', (buf) => { log += buf })
child.stderr.on('data', (buf) => { log += buf })
function wait(ms) { return new Promise((r) => setTimeout(r, ms)) }
try {
  await wait(8000)
  const health = await fetch('http://127.0.0.1:3017/health')
  const summary = await fetch('http://127.0.0.1:3017/api/summary')
  const body = await summary.json()
  const brief = {}
  for (const [name, source] of Object.entries(body.sources || {})) {
    brief[name] = source.ok ? { calls: source.calls, leads: source.leads, sales: source.sales } : { error: source.error }
  }
  console.log('health', health.status)
  console.log('summary', summary.status, JSON.stringify(brief))
  console.log('recorder', JSON.stringify({
    lastPollAt: body.recorder?.lastPollAt,
    lastError: body.recorder?.lastError,
    recent: body.recorder?.recent?.length,
  }))
} finally {
  child.kill()
  if (!log.includes('listening')) console.log('log-tail', log.slice(-400).replace(/postgres(?:ql)?:\/\/\S+/gi, 'postgres://***'))
}
