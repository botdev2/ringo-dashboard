const login = document.querySelector('#login')
const app = document.querySelector('#app')
const labels = { ringomarket: 'RIngomarket', soittamo: 'soittamo', staging: 'Staging' }

const fieldTerms = {
  en: {
    '(none)': 'None',
    no_answer: 'No Answer',
    not_interested: 'Not Interested',
    busy: 'Busy',
    voicemail: 'Voicemail',
    callback: 'Callback',
    other: 'Other',
    completed: 'Completed',
    canceled: 'Canceled',
    cancelled: 'Cancelled',
    failed: 'Failed',
    sale: 'Sale',
    no_sale: 'No Sale',
    wrong_number: 'Wrong Number',
    booking: 'Booking',
    available: 'Available',
    called: 'Called',
    dead: 'Dead',
    exhausted: 'Exhausted',
    confirmed: 'Confirmed',
    rejected: 'Rejected',
    expired: 'Expired',
    pending: 'Pending',
    pending_send: 'Pending Send',
    send_failed: 'Send Failed',
  },
  fi: {
    '(none)': 'Ei arvoa',
    no_answer: 'Ei vastausta',
    not_interested: 'Ei kiinnostunut',
    busy: 'Varattu',
    voicemail: 'Puhelinvastaaja',
    callback: 'Takaisinsoitto',
    other: 'Muu',
    completed: 'Valmis',
    canceled: 'Peruttu',
    cancelled: 'Peruttu',
    failed: 'Epäonnistui',
    sale: 'Kauppa',
    no_sale: 'Ei kauppaa',
    wrong_number: 'Väärä numero',
    booking: 'Varaus',
    available: 'Vapaa',
    called: 'Soitettu',
    dead: 'Kuollut',
    exhausted: 'Käytetty loppuun',
    confirmed: 'Vahvistettu',
    rejected: 'Hylätty',
    expired: 'Vanhentunut',
    pending: 'Odottaa',
    pending_send: 'Lähetystä odottaa',
    send_failed: 'Lähetys epäonnistui',
  },
}

const copy = {
  en: {
    title: 'Ringo Dashboard',
    kicker: 'Three databases, one picture',
    help: 'Enter the dashboard token.',
    open: 'Open',
    badToken: 'Token was not accepted.',
    intro: 'Live picture of the three Ringo databases. History is read from Neon. New calls, leads, and sales are recorded here as they arrive.',
    privacy: 'Phone numbers and personal details are not shown.',
    waiting: 'Waiting for the backends.',
    updated: 'Updated {when}',
    recording: 'Recording since {when}. {n} new rows saved. Last poll {poll}.',
    recorderError: 'Recorder: {error}',
    stack: 'Stack',
    frontendRole: 'App',
    frontendTitle: 'Ringo frontend',
    frontendBody: 'The app people open. Calls, campaigns, and sellers start here.',
    middleRole: 'Middleman',
    middleTitle: 'Backend',
    middleBody: 'The service between the app and the databases. It will sit in the middle once the connection is added.',
    clusterRole: 'Data',
    clusterTitle: 'Database clusters',
    clusterBody: 'The three Neon Postgres books this dashboard reads.',
    later: 'Connection comes later',
    chart: 'RIngomarket calls, last 14 days',
    feed: 'New activity',
    feedHelp: 'Only rows that arrived after this dashboard process started.',
    feedEmpty: 'No new calls, leads, or sales since recording started.',
    outcomes: '{name} outcomes, 14 days',
    noRecent: 'No calls in the last 14 days.',
    sellers: '{name} sellers',
    noSellers: 'No seller organizations.',
    centres: 'Call centres',
    operators: 'Operator organizations',
    seller: 'Seller',
    organization: 'Organization',
    status: 'Status',
    campaigns: 'Campaigns',
    leads: 'Leads',
    calls: 'Calls',
    sales: 'Sales',
    unverified: '{name} (unverified)',
    latest: 'Latest call',
    none: 'none',
    justNow: 'just now',
    minutesAgo: '{n} min ago',
    hoursAgo: '{n} h ago',
    daysAgo: '{n} d ago',
    live: 'Live',
    quiet: 'Quiet',
    empty: 'Empty',
    liveCampaigns: '{n} campaigns live now',
    oneCampaign: '1 campaign live now',
    noCallsYet: 'No calls yet',
    callUnit: 'calls',
    detail: '{leads} leads · {sales} sales',
    postgres: 'Postgres {version}',
    active: 'active',
    suspended: 'suspended',
    about: {
      ringomarket: 'Production book. This is the one being written now: campaigns, leads, calls, and sales across the live markets.',
      soittamo: 'Earlier Finnish dialer. Calls stopped on 24 Aug 2026. Leads, sales, and sellers are still stored here.',
      staging: 'Telegram Ops staging. Same shape as RIngomarket, with almost no business data of its own.',
    },
  },
  fi: {
    title: 'Ringo-kojelauta',
    kicker: 'Kolme tietokantaa, yksi näkymä',
    help: 'Anna kojelaudan tunnus.',
    open: 'Avaa',
    badToken: 'Tunnusta ei hyväksytty.',
    intro: 'Kolmen Ringo-tietokannan live-näkymä. Historia luetaan Neonista. Uudet puhelut, liidit ja kaupat tallentuvat tänne sitä mukaa kun ne syntyvät.',
    privacy: 'Puhelinnumeroita ja henkilötietoja ei näytetä.',
    waiting: 'Odotetaan taustapalveluita.',
    updated: 'Päivitetty {when}',
    recording: 'Tallennus alkoi {when}. {n} uutta riviä. Viimeisin tarkistus {poll}.',
    recorderError: 'Tallennin: {error}',
    stack: 'Pino',
    frontendRole: 'Sovellus',
    frontendTitle: 'Ringon käyttöliittymä',
    frontendBody: 'Sovellus, jonka ihmiset avaavat. Puhelut, kampanjat ja myyjät alkavat täältä.',
    middleRole: 'Välikerros',
    middleTitle: 'Taustapalvelu',
    middleBody: 'Palvelu sovelluksen ja tietokantojen välissä. Se asettuu keskelle, kun yhteys lisätään.',
    clusterRole: 'Data',
    clusterTitle: 'Tietokantaklusterit',
    clusterBody: 'Kolme Neon Postgres -kirjaa, joita tämä kojelauta lukee.',
    later: 'Yhteys lisätään myöhemmin',
    chart: 'RIngomarketin puhelut, 14 päivää',
    feed: 'Uusi toiminta',
    feedHelp: 'Vain rivit, jotka ovat tulleet tämän kojelautaprosessin käynnistymisen jälkeen.',
    feedEmpty: 'Ei uusia puheluita, liidejä tai kauppoja tallennuksen alettua.',
    outcomes: '{name}, tulokset 14 päivältä',
    noRecent: 'Ei puheluita viimeisen 14 päivän aikana.',
    sellers: '{name}, myyjät',
    noSellers: 'Ei myyjäorganisaatioita.',
    centres: 'Puhelukeskukset',
    operators: 'Operaattorit',
    seller: 'Myyjä',
    organization: 'Organisaatio',
    status: 'Tila',
    campaigns: 'Kampanjat',
    leads: 'Liidit',
    calls: 'Puhelut',
    sales: 'Kaupat',
    unverified: '{name} (vahvistamaton)',
    latest: 'Viimeisin puhelu',
    none: 'ei yhtään',
    justNow: 'juuri nyt',
    minutesAgo: '{n} min sitten',
    hoursAgo: '{n} t sitten',
    daysAgo: '{n} pv sitten',
    live: 'Käynnissä',
    quiet: 'Hiljainen',
    empty: 'Tyhjä',
    liveCampaigns: '{n} kampanjaa käynnissä',
    oneCampaign: '1 kampanja käynnissä',
    noCallsYet: 'Ei vielä puheluita',
    callUnit: 'puhelua',
    detail: '{leads} liidiä · {sales} kauppaa',
    postgres: 'Postgres {version}',
    active: 'aktiivinen',
    suspended: 'keskeytetty',
    about: {
      ringomarket: 'Tuotantokanta. Tätä kirjoitetaan nyt: kampanjat, liidit, puhelut ja kaupat elävillä markkinoilla.',
      soittamo: 'Aiempi suomalainen soitin. Puhelut päättyivät 24.8.2026. Liidit, kaupat ja myyjät ovat yhä tallessa.',
      staging: 'Telegram-opsin staging. Sama rakenne kuin RIngomarketilla, lähes ilman omaa liiketoimintadataa.',
    },
  },
}

let lang = localStorage.getItem('ringo_lang') === 'fi' ? 'fi' : 'en'
let lastSummary = null
let started = false

function t(key, vars) {
  const text = key.split('.').reduce((node, part) => (node ? node[part] : undefined), copy[lang]) || key
  return String(text).replace(/\{(\w+)\}/g, (_, name) => (vars && vars[name] != null ? vars[name] : ''))
}

function el(tag, text, className) {
  const node = document.createElement(tag)
  if (text != null) node.textContent = text
  if (className) node.className = className
  return node
}

function locale() {
  return lang === 'fi' ? 'fi-FI' : 'en-GB'
}

function when(iso) {
  if (!iso) return t('none')
  return new Date(iso).toLocaleString(locale())
}

function ago(iso) {
  if (!iso) return t('none')
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return t('justNow')
  if (mins < 60) return t('minutesAgo', { n: mins })
  const hours = Math.round(mins / 60)
  if (hours < 48) return t('hoursAgo', { n: hours })
  return t('daysAgo', { n: Math.round(hours / 24) })
}

function tone(source) {
  if (!source || !source.ok || !source.calls) return 'empty'
  if (!source.latestCall) return 'empty'
  if (Date.now() - new Date(source.latestCall).getTime() > 6 * 60 * 60 * 1000) return 'quiet'
  return 'live'
}

function fill(id, text) {
  const node = document.querySelector(id)
  if (node) node.textContent = text
}

function langSwitch(parent) {
  parent.replaceChildren()
  for (const code of ['en', 'fi']) {
    const button = el('button', code === 'fi' ? 'FIN' : 'EN')
    button.type = 'button'
    if (code === lang) button.className = 'active'
    button.addEventListener('click', () => setLang(code))
    parent.append(button)
  }
}

function applyStatic() {
  document.documentElement.lang = lang === 'fi' ? 'fi' : 'en'
  document.title = t('title')
  fill('#login-kicker', t('kicker'))
  fill('#login-title', t('title'))
  fill('#login-help', t('help'))
  fill('#login-submit', t('open'))
  fill('#title', t('title'))
  fill('#intro', t('intro'))
  fill('#privacy', t('privacy'))
  fill('#chart-title', t('chart'))
  fill('#feed-title', t('feed'))
  fill('#feed-help', t('feedHelp'))
  langSwitch(document.querySelector('#login-lang'))
  langSwitch(document.querySelector('#lang'))
}

function setLang(next) {
  lang = next
  localStorage.setItem('ringo_lang', next)
  applyStatic()
  if (lastSummary) render(lastSummary)
}

function fieldLabel(raw) {
  const key = String(raw ?? '')
  const known = fieldTerms[lang][key]
  if (known) return known
  return key.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function bars(parent, rows, showField) {
  const max = Math.max(1, ...rows.map((row) => row.n))
  parent.replaceChildren()
  if (!rows.length) {
    parent.append(el('p', t('noRecent')))
    return
  }
  for (const row of rows) {
    const line = el('div', null, 'bar')
    if (showField) {
      const term = el('span', null, 'term')
      term.append(el('small', row.label), el('b', fieldLabel(row.label)))
      line.append(term)
    } else {
      line.append(el('span', row.label))
    }
    const track = el('span')
    const fillBar = document.createElement('i')
    fillBar.style.width = `${Math.max(2, (row.n / max) * 100)}%`
    track.append(fillBar)
    line.append(track, el('span', Number(row.n).toLocaleString(locale()), 'count'))
    parent.append(line)
  }
}

function statusWord(value) {
  if (value === 'active' || value === 'suspended') return t(value)
  return value || ''
}

function orgTable(rows, withStatus) {
  const table = document.createElement('table')
  const head = document.createElement('tr')
  const headings = withStatus
    ? [t('organization'), t('status'), t('campaigns'), t('leads'), t('calls'), t('sales')]
    : [t('seller'), t('campaigns'), t('leads'), t('calls'), t('sales')]
  headings.forEach((label, index) => {
    const cell = el('th', label)
    if (index >= headings.length - 4) cell.className = 'num'
    head.append(cell)
  })
  table.append(head)
  for (const row of rows) {
    const line = document.createElement('tr')
    const name = row.verified === false ? t('unverified', { name: row.name }) : row.name
    line.append(el('td', name))
    if (withStatus) line.append(el('td', statusWord(row.status)))
    for (const key of ['campaigns', 'leads', 'calls', 'sales']) {
      line.append(el('td', Number(row[key] || 0).toLocaleString(locale()), 'num'))
    }
    table.append(line)
  }
  return table
}

function renderStack(sources) {
  const root = document.querySelector('#stack')
  root.replaceChildren()
  root.className = 'window'
  const bar = el('div', null, 'window-bar')
  const dots = el('span', null, 'dots')
  dots.append(document.createElement('i'), document.createElement('i'), document.createElement('i'))
  bar.append(dots, el('strong', t('stack')))
  const grid = el('div', null, 'stack')

  const front = el('article', null, 'node frontend')
  front.append(el('p', t('frontendRole'), 'role'), el('h2', t('frontendTitle')), el('p', t('frontendBody')), el('p', t('later'), 'wait'))
  const mid = el('article', null, 'node middle')
  mid.append(el('p', t('middleRole'), 'role'), el('h2', t('middleTitle')), el('p', t('middleBody')), el('p', t('later'), 'wait'))
  const clusters = el('article', null, 'node clusters')
  clusters.append(el('p', t('clusterRole'), 'role'), el('h2', t('clusterTitle')), el('p', t('clusterBody')))
  const list = el('ul', null, 'cluster-list')
  for (const [key, source] of Object.entries(sources)) {
    const item = document.createElement('li')
    const name = el('span', labels[key] || key)
    const state = el('span', source.ok ? t(tone(source)) : t('empty'), `pill ${source.ok ? tone(source) : 'empty'}`)
    item.append(name, state)
    list.append(item)
  }
  clusters.append(list)
  grid.append(front, el('div', null, 'link'), mid, el('div', null, 'link'), clusters)
  root.append(bar, grid)
}

function renderFeed(events) {
  const list = document.querySelector('#feed')
  list.replaceChildren()
  if (!events.length) {
    list.append(el('li', t('feedEmpty')))
    return
  }
  for (const event of events) {
    const bits = [
      labels[event.source] || event.source,
      event.organization,
      event.kind,
      event.status ? fieldLabel(event.status) : '',
      event.outcome ? fieldLabel(event.outcome) : '',
      event.country,
    ]
      .filter(Boolean)
      .join(' · ')
    list.append(el('li', `${bits} · ${when(event.happened_at || event.happenedAt)}`))
  }
}

function render(summary) {
  lastSummary = summary
  fill('#updated', t('updated', { when: when(summary.generatedAt) }))
  const rec = summary.recorder
  const recorded = rec.counts.reduce((sum, row) => sum + row.n, 0)
  fill('#recorder', rec.lastError
    ? t('recorderError', { error: rec.lastError })
    : t('recording', { when: when(rec.startedAt), n: recorded.toLocaleString(locale()), poll: when(rec.lastPollAt) }))

  renderStack(summary.sources)

  const cards = document.querySelector('#cards')
  cards.replaceChildren()
  for (const [key, source] of Object.entries(summary.sources)) {
    const state = source.ok ? tone(source) : 'empty'
    const card = el('article', null, state)
    const meta = el('div', null, 'meta')
    meta.append(el('span', source.ok ? t(state) : t('empty'), `pill ${state}`))
    if (source.version) meta.append(el('span', t('postgres', { version: String(source.version).split(' ')[0] }), 'version'))
    card.append(meta, el('h2', labels[key] || key))
    if (!source.ok) {
      card.append(el('p', source.error || t('waiting')))
    } else {
      card.append(el('p', t(`about.${key}`), 'about'))
      card.append(el('strong', Number(source.calls).toLocaleString(locale())))
      card.append(el('span', t('callUnit')))
      card.append(el('p', t('detail', {
        leads: Number(source.leads).toLocaleString(locale()),
        sales: Number(source.sales).toLocaleString(locale()),
      })))
      if (source.liveCampaigns != null) {
        card.append(el('p', Number(source.liveCampaigns) === 1 ? t('oneCampaign') : t('liveCampaigns', { n: source.liveCampaigns })))
      }
      const latest = el('div', null, 'latest')
      if (!source.latestCall) {
        latest.append(el('span', t('latest')), el('p', t('noCallsYet')))
      } else {
        latest.append(el('span', t('latest')))
        latest.append(el('b', ` ${ago(source.latestCall)}`))
        latest.append(el('p', when(source.latestCall)))
      }
      card.append(latest)
    }
    cards.append(card)
  }

  const ringo = summary.sources.ringomarket
  const chart = document.querySelector('#chart')
  if (ringo && ringo.ok) bars(chart, ringo.dailyCalls.map((row) => ({ label: row.day.slice(5), n: row.n })))
  else bars(chart, [])

  const breakdowns = document.querySelector('#breakdowns')
  breakdowns.replaceChildren()
  for (const [key, source] of Object.entries(summary.sources)) {
    if (!source.ok) continue
    const card = el('article')
    card.append(el('h2', t('outcomes', { name: labels[key] || key })))
    const box = el('div')
    const rows = source.callOutcome.length ? source.callOutcome : source.callStatus
    bars(box, rows, true)
    card.append(box)
    breakdowns.append(card)
  }

  const orgs = document.querySelector('#organizations')
  orgs.replaceChildren()
  for (const [key, source] of Object.entries(summary.sources)) {
    if (!source.ok) continue
    const card = el('article')
    card.append(el('h2', t('sellers', { name: labels[key] || key })))
    card.append(source.sellers?.length ? orgTable(source.sellers, false) : el('p', t('noSellers')))
    if (source.callCentres?.length) {
      card.append(el('h3', t('centres')))
      card.append(orgTable(source.callCentres, true))
    }
    if (source.operatorOrgs?.length) {
      card.append(el('h3', t('operators')))
      card.append(orgTable(source.operatorOrgs, true))
    }
    orgs.append(card)
  }
  renderFeed(rec.recent)
}

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
    document.querySelector('#login-error').textContent = t('badToken')
    return
  }
  refresh()
})

applyStatic()
refresh()
