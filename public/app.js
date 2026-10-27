const login = document.querySelector('#login')
const app = document.querySelector('#app')
const labels = { ringomarket: 'RIngomarket', soittamo: 'soittamo', staging: 'Staging' }

function el(tag, text) {
  const node = document.createElement(tag)
  if (text != null) node.textContent = text
  return node
}

function when(iso) {
  if (!iso) return 'none'
  return new Date(iso).toLocaleString()
}

function quiet(iso) {
  if (!iso) return true
  return Date.now() - new Date(iso).getTime() > 6 * 60 * 60 * 1000
}

function renderFeed(events) {
  const list = document.querySelector('#feed')
  list.replaceChildren()
  if (!events.length) {
    list.append(el('li', 'No new calls, leads, or sales since recording started.'))
    return
  }
  for (const event of events) {
    const bits = [
      labels[event.source] || event.source,
      event.organization,
      event.kind,
      event.status,
      event.outcome,
      event.country,
    ]
      .filter(Boolean)
      .join(' · ')
    const line = el('li', `${bits} · ${when(event.happened_at || event.happenedAt)}`)
    list.append(line)
  }
}

function bars(parent, rows) {
  const max = Math.max(1, ...rows.map((row) => row.n))
  parent.replaceChildren()
  for (const row of rows) {
    const line = el('div')
    line.className = 'bar'
    line.append(el('span', row.label || row.day.slice(5)))
    const track = el('span')
    const fill = document.createElement('i')
    fill.style.width = `${Math.max(2, (row.n / max) * 100)}%`
    track.append(fill)
    line.append(track, el('span', String(row.n)))
    parent.append(line)
  }
}

function render(summary) {
  document.querySelector('#updated').textContent = `Updated ${when(summary.generatedAt)}`
  const rec = summary.recorder
  const recorded = rec.counts.reduce((sum, row) => sum + row.n, 0)
  document.querySelector('#recorder').textContent = rec.lastError
    ? `Recorder: ${rec.lastError}`
    : `Recording since ${when(rec.startedAt)}. ${recorded} new rows saved. Last poll ${when(rec.lastPollAt)}.`

  const cards = document.querySelector('#cards')
  cards.replaceChildren()
  for (const [key, source] of Object.entries(summary.sources)) {
    const card = el('article')
    card.className = source.ok && !quiet(source.latestCall) ? 'live' : 'quiet'
    card.append(el('h2', labels[key] || key))
    if (!source.ok) {
      card.append(el('p', source.error || 'unavailable'))
    } else {
      card.append(el('strong', source.calls.toLocaleString()))
      card.append(el('span', `calls · ${source.leads.toLocaleString()} leads · ${source.sales.toLocaleString()} sales`))
      card.append(el('p', `Latest call ${when(source.latestCall)}`))
    }
    cards.append(card)
  }

  const ringo = summary.sources.ringomarket
  const chart = document.querySelector('#chart')
  if (ringo && ringo.ok) bars(chart, ringo.dailyCalls.map((row) => ({ label: row.day.slice(5), n: row.n })))

  const breakdowns = document.querySelector('#breakdowns')
  breakdowns.replaceChildren()
  for (const [key, source] of Object.entries(summary.sources)) {
    if (!source.ok) continue
    const card = el('article')
    card.append(el('h2', `${labels[key]} outcomes, 14 days`))
    const box = el('div')
    bars(box, (source.callOutcome.length ? source.callOutcome : source.callStatus))
    card.append(box)
    breakdowns.append(card)
  }
  renderOrganizations(summary.sources)
  renderFeed(rec.recent)
}

function orgTable(rows, status) {
  const table = document.createElement('table')
  const head = document.createElement('tr')
  const labelsForHead = status
    ? ['Organization', 'Status', 'Campaigns', 'Leads', 'Calls', 'Sales']
    : ['Seller', 'Campaigns', 'Leads', 'Calls', 'Sales']
  labelsForHead.forEach((label, index) => {
    const cell = el('th', label)
    if (index >= labelsForHead.length - 4) cell.className = 'num'
    head.append(cell)
  })
  table.append(head)
  for (const row of rows) {
    const line = document.createElement('tr')
    const name = row.verified === false ? `${row.name} (unverified)` : row.name
    line.append(el('td', name))
    if (status) line.append(el('td', row.status || ''))
    for (const key of ['campaigns', 'leads', 'calls', 'sales']) {
      const cell = el('td', Number(row[key] || 0).toLocaleString())
      cell.className = 'num'
      line.append(cell)
    }
    table.append(line)
  }
  return table
}

function renderOrganizations(sources) {
  const root = document.querySelector('#organizations')
  root.replaceChildren()
  for (const [key, source] of Object.entries(sources)) {
    if (!source.ok) continue
    const card = el('article')
    card.append(el('h2', `${labels[key] || key} sellers`))
    if (!source.sellers?.length) card.append(el('p', 'No seller organizations.'))
    else card.append(orgTable(source.sellers, false))
    if (source.callCentres?.length) {
      card.append(el('h3', 'Call centres'))
      card.append(orgTable(source.callCentres, true))
    }
    if (source.operatorOrgs?.length) {
      card.append(el('h3', 'Operator organizations'))
      card.append(orgTable(source.operatorOrgs, true))
    }
    root.append(card)
  }
}

let started = false

async function refresh() {
  const response = await fetch('/api/summary')
  if (response.status === 401) {
    login.hidden = false
    app.hidden = true
    return
  }
  login.hidden = true
  app.hidden = false
  render(await response.json())
  if (started) return
  started = true
  const stream = new EventSource('/api/stream')
  stream.onmessage = (message) => {
    const payload = JSON.parse(message.data)
    if (payload.type === 'events') refresh()
  }
  setInterval(refresh, 30000)
}

login.addEventListener('submit', async (event) => {
  event.preventDefault()
  const token = new FormData(login).get('token')
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
  if (!response.ok) {
    document.querySelector('#login-error').textContent = 'Token was not accepted.'
    return
  }
  refresh()
})

refresh()
