import { timingSafeEqual } from 'node:crypto'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadAnalytics } from './analytics.js'
import { openPools } from './db.js'
import { startRecorder } from './recorder.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const token = process.env.DASHBOARD_TOKEN || ''
const pools = openPools()
const clients = new Set()
const recorder = startRecorder(pools, (events) => {
  const payload = `data: ${JSON.stringify({ type: 'events', events })}\n\n`
  for (const res of clients) res.write(payload)
})

function readCookie(req, name) {
  const raw = req.headers.cookie || ''
  for (const part of raw.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return ''
}

function sameToken(given) {
  if (!token) return true
  const left = Buffer.from(given)
  const right = Buffer.from(token)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

function authorized(req) {
  return sameToken(readCookie(req, 'ringo_session'))
}

const app = express()
app.set('trust proxy', 1)
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/login', (req, res) => {
  const given = String(req.body?.token || '')
  if (!sameToken(given)) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  res.setHeader(
    'Set-Cookie',
    `ringo_session=${encodeURIComponent(given)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=2592000${req.secure ? '; Secure' : ''}`,
  )
  res.json({ ok: true })
})

app.post('/api/logout', (req, res) => {
  res.setHeader(
    'Set-Cookie',
    `ringo_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${req.secure ? '; Secure' : ''}`,
  )
  res.json({ ok: true })
})

app.use('/api', (req, res, next) => {
  if (!authorized(req)) {
    res.status(401).json({ error: 'unauthorized' })
    return
  }
  next()
})

app.get('/api/summary', async (_req, res) => {
  res.json(await loadAnalytics(pools, recorder))
})

app.get('/api/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()
  res.write(`data: ${JSON.stringify({ type: 'hello', recent: recorder.recent() })}\n\n`)
  clients.add(res)
  const beat = setInterval(() => res.write(': ping\n\n'), 15000)
  req.on('close', () => {
    clearInterval(beat)
    clients.delete(res)
  })
})

const port = Number(process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`ringo dashboard listening on ${port}`)
})
