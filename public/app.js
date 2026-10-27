const login = document.querySelector('#login')
const shell = document.querySelector('#shell')

// Drop each mp4 in public/clips and add it here. id stays stable so an attachment survives a reload.
const members = [
  { name: 'Aleksi', mark: 'AL' },
  { name: 'Aaron', mark: 'AA' },
  { name: 'Wahid', mark: 'WA' },
]
const dueAt = new Date('2026-10-31T23:59:59+02:00').getTime()

const clips = [
  // { id: 'welcome', title: 'Welcome', file: 'welcome.mp4' },
]
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
    title: 'Ringo Market',
    kicker: 'Three call books, one picture',
    help: 'Enter the access code.',
    open: 'Open',
    badToken: 'That code was not accepted.',
    intro: 'One picture of Ringo’s three call books. Older calls are already here. New calls, leads, and sales appear as they happen.',
    privacy: 'Phone numbers and personal details are not shown.',
    waiting: 'Waiting for the call books.',
    updated: 'Updated {when}',
    recording: 'Recording since {when}. {n} new items saved. Last check {poll}.',
    recorderError: 'Could not record: {error}',
    stack: 'How the pieces fit',
    participants: 'Participants',
    readyOn: 'Ready 31.10.2026',
    left: 'left',
    dueNow: 'deadline passed',
    statusLegend: 'What the marks mean',
    liveRule: 'A call in the last 6 hours.',
    quietRule: 'Calls exist, and the latest is more than 6 hours old.',
    emptyRule: 'No calls in this book.',
    retiredRule: 'Calling has stopped. The old calls, leads, and sales stay here to read.',
    frontendRole: 'What people open',
    frontendTitle: 'Ringo Market',
    frontendBody: 'Where callers and sellers work.',
    middleRole: 'In the middle',
    middleTitle: 'The calling desk',
    middleBody: 'Decides how many lines to open, and passes each call between the people and the books.',
    clusterRole: 'The books',
    clusterTitle: 'Three call books',
    clusterBody: 'RIngomarket is the one being written now. soittamo is retired. Staging is a practice copy and has no calls yet.',
    flowToApp: 'From the people',
    flowFromApp: 'Back to the people',
    flowToData: 'Saved in the books',
    flowFromData: 'Taken from the books',
    appOut: 'A free caller, the result of a call, a sale',
    appIn: 'The next person to call, who was connected, and whether only one line is open',
    dbOut: 'Calls, tries, calls nobody took, sales',
    dbIn: 'People still to call, how many lines are allowed, the 3% limit or soittamo’s recent stretch',
    later: 'Waiting for connection',
    clips: 'Clips',
    clipsEmpty: 'Video clips will be added here. Attach one and it stays on this page.',
    attach: 'Attach',
    attached: 'Attached',
    removeClip: 'Remove',
    clipsClose: 'Close',
    chart: 'RIngomarket calls, last 14 days',
    feed: 'New activity',
    feedHelp: 'Only calls, leads, and sales that arrived after this page was opened.',
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
    perSale: 'Calls per sale',
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
    retired: 'Retired',
    liveCampaigns: '{n} campaigns live now',
    oneCampaign: '1 campaign live now',
    noCallsYet: 'No calls yet',
    callUnit: 'calls',
    light: 'Light',
    dark: 'Dark',
    detail: '{leads} leads · {sales} sales',
    saleRatio: '1 sale per {per} calls · {pct}%',
    zeroSales: '0 sales in {calls} calls',
    active: 'active',
    suspended: 'suspended',
    about: {
      ringomarket: 'The book in use now. Campaigns, leads, calls, and sales on the live markets are written here.',
      soittamo: 'Retired. Calls stopped on 24 Aug 2026. Leads, sales, and sellers are still kept here.',
      staging: 'A practice copy of RIngomarket. Almost no real calls, leads, or sales yet.',
    },
  },
  fi: {
    title: 'Ringo Market',
    kicker: 'Kolme puhelukirjaa, yksi näkymä',
    help: 'Anna kojelaudan tunnus.',
    open: 'Avaa',
    badToken: 'Tunnusta ei hyväksytty.',
    intro: 'Yksi näkymä Ringon kolmeen puhelukirjaan. Vanhat puhelut ovat jo täällä. Uudet puhelut, liidit ja kaupat ilmestyvät sitä mukaa kun ne syntyvät.',
    privacy: 'Puhelinnumeroita ja henkilötietoja ei näytetä.',
    waiting: 'Odotetaan puhelukirjoja.',
    updated: 'Päivitetty {when}',
    recording: 'Tallennus alkoi {when}. {n} uutta merkintää. Viimeisin tarkistus {poll}.',
    recorderError: 'Tallennin: {error}',
    stack: 'Miten osat liittyvät',
    participants: 'Osallistujat',
    readyOn: 'Valmis 31.10.2026',
    left: 'jäljellä',
    dueNow: 'määräaika mennyt',
    statusLegend: 'Merkkien kriteerit',
    liveRule: 'Puhelu viimeisen 6 tunnin aikana.',
    quietRule: 'Puheluita on, ja viimeisin on yli 6 tuntia vanha.',
    emptyRule: 'Tässä kirjassa ei ole puheluita.',
    retiredRule: 'Soitot on lopetettu. Vanhat puhelut, liidit ja kaupat ovat yhä luettavissa.',
    frontendRole: 'Mitä ihmiset avaavat',
    frontendTitle: 'Ringo Market',
    frontendBody: 'Täällä soittajat ja myyjät työskentelevät.',
    middleRole: 'Keskellä',
    middleTitle: 'Soitontyö',
    middleBody: 'Päättää, montako linjaa avataan, ja välittää puhelut ihmisten ja kirjojen välillä.',
    clusterRole: 'Kirjat',
    clusterTitle: 'Kolme puhelukirjaa',
    clusterBody: 'RIngomarket on se, jota kirjoitetaan nyt. soittamo on poistettu käytöstä. Staging on harjoituskopio, eikä siinä ole vielä puheluita.',
    flowToApp: 'Ihmisiltä',
    flowFromApp: 'Ihmisille',
    flowToData: 'Tallennetaan kirjoihin',
    flowFromData: 'Haetaan kirjoista',
    appOut: 'Vapaa soittaja, puhelun tulos ja kauppa',
    appIn: 'Seuraava soitettava, kuka kytkettiin, ja onko auki vain yksi linja',
    dbOut: 'Puhelut, yritykset, ilman soittajaa jääneet ja kaupat',
    dbIn: 'Vielä soittamatta olevat, linjojen katto, 3 % raja tai soittamon tuore jakso',
    later: 'Odottaa yhteyttä',
    clips: 'Leikkeet',
    clipsEmpty: 'Videoleikkeet lisätään tähän. Liitetty leike jää tälle sivulle.',
    attach: 'Liitä',
    attached: 'Liitetty',
    removeClip: 'Poista',
    clipsClose: 'Sulje',
    chart: 'RIngomarketin puhelut, 14 päivää',
    feed: 'Uusi toiminta',
    feedHelp: 'Vain puhelut, liidit ja kaupat, jotka ovat tulleet tämän sivun avaamisen jälkeen.',
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
    perSale: 'Puhelua / kauppa',
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
    retired: 'Poistettu käytöstä',
    liveCampaigns: '{n} kampanjaa käynnissä',
    oneCampaign: '1 kampanja käynnissä',
    noCallsYet: 'Ei vielä puheluita',
    callUnit: 'puhelua',
    light: 'Vaalea',
    dark: 'Tumma',
    detail: '{leads} liidiä · {sales} kauppaa',
    saleRatio: '1 kauppa / {per} puhelua · {pct} %',
    zeroSales: '0 kauppaa / {calls} puhelua',
    active: 'aktiivinen',
    suspended: 'keskeytetty',
    about: {
      ringomarket: 'Kirja, jota kirjoitetaan nyt. Kampanjat, liidit, puhelut ja kaupat elävillä markkinoilla.',
      soittamo: 'Poistettu käytöstä. Puhelut päättyivät 24.8.2026. Liidit, kaupat ja myyjät ovat yhä tallessa.',
      staging: 'Harjoituskopio RIngomarketista. Oikeita puheluita, liidejä ja kauppoja ei juuri ole.',
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

function sourceTone(key, source) {
  if (key === 'soittamo') return 'retired'
  return source.ok ? tone(source) : 'empty'
}

function wordmark(id) {
  const node = document.querySelector(id)
  node.classList.add('wordmark')
  node.replaceChildren(document.createTextNode('Ringo '), el('span', 'Market'))
}

function renderLegend() {
  const root = document.querySelector('#legend')
  if (!root) return
  root.replaceChildren()
  root.append(el('h2', t('statusLegend')))
  const row = el('div', null, 'legend-row')
  for (const key of ['live', 'quiet', 'empty', 'retired']) {
    const item = el('p', null, 'legend-item')
    item.append(statusMark(key, t(key)), el('span', t(`${key}Rule`)))
    row.append(item)
  }
  root.append(row)
}

function fill(id, text) {
  const node = document.querySelector(id)
  if (node) node.textContent = text
}

const marks = {
  ringo: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2.6"/><circle cx="16" cy="16" r="3" fill="currentColor"/><path d="M16 5v4.2" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>',
  ringomarket: '<svg viewBox="0 0 32 32"><circle cx="12" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M17 20l6 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/><path d="M20 8v8M24 6v10M28 11v5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  soittamo: '<svg viewBox="0 0 32 32"><path d="M7 14c0-5 4-9 9-9s9 4 9 9" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round"/><rect x="5" y="14" width="6" height="9" rx="2.2" fill="currentColor"/><rect x="21" y="14" width="6" height="9" rx="2.2" fill="currentColor"/><path d="M11 21h10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
  staging: '<svg viewBox="0 0 32 32"><rect x="5" y="7" width="16" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="11" y="13" width="16" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  frontend: '<svg viewBox="0 0 32 32"><rect x="4" y="6" width="24" height="20" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M4 12h24" stroke="currentColor" stroke-width="2.2"/><circle cx="8" cy="9" r="1" fill="currentColor"/></svg>',
  backend: '<svg viewBox="0 0 32 32"><circle cx="8" cy="16" r="3" fill="currentColor"/><circle cx="24" cy="8" r="3" fill="currentColor"/><circle cx="24" cy="24" r="3" fill="currentColor"/><path d="M11 15.2 21 9.2M11 16.8 21 22.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  database: '<svg viewBox="0 0 32 32"><ellipse cx="16" cy="8" rx="8" ry="3.2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 8v16c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V8" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 16c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  sun: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="5" fill="currentColor"/><path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M24.5 7.5l-2.8 2.8M10.3 21.7l-2.8 2.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  moon: '<svg viewBox="0 0 32 32"><path d="M20 5a10 10 0 1 0 7 17A8 8 0 0 1 20 5z" fill="currentColor"/></svg>',
  live: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2.4" fill="currentColor"/></svg>',
  quiet: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.2 5.6v4.8M9.8 5.6v4.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  empty: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2.4 2.1"/></svg>',
  done: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5 8.2 7.1 10.3 11.2 5.8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.4 8h5M8.4 5.7 10.7 8 8.4 10.3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  wait: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.7V8l2.1 1.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  later: '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 8h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  retired: '<svg viewBox="0 0 16 16"><rect x="2.4" y="3" width="11.2" height="2.6" rx="0.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.6 5.6v6.2h8.8V5.6M6.5 8.2h3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  due: '<svg viewBox="0 0 16 16"><rect x="2.2" y="3.2" width="11.6" height="10.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M2.2 6.4h11.6M5.2 2.2v2.2M10.8 2.2v2.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  track: '<svg viewBox="0 0 16 16"><circle cx="3.2" cy="8" r="1.5" fill="currentColor"/><path d="M6.2 8h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  arrow: '<svg viewBox="0 0 16 16"><path d="M2 8h11M9.2 4.6 13 8 9.2 11.4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  clip: '<svg viewBox="0 0 16 16"><rect x="2" y="3.2" width="12" height="9.6" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M6.8 6.1v3.8L10.6 8z" fill="currentColor"/></svg>',
  attach: '<svg viewBox="0 0 16 16"><path d="M6.4 8.7 10.2 4.9a2 2 0 0 1 2.8 2.8L7.8 12.9a3.1 3.1 0 0 1-4.4-4.4l4.9-4.9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 16 16"><path d="M4.6 4.6 11.4 11.4M11.4 4.6 4.6 11.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
}

function svgEl(name) {
  const span = document.createElement('span')
  span.className = `logo ${name}`
  span.innerHTML = marks[name]
  return span
}

function statusMark(kind, label) {
  const node = el('span', null, `status ${kind}`)
  const mark = svgEl(kind)
  mark.classList.add('tiny')
  node.append(mark, el('span', label))
  return node
}

function chosenTheme() {
  const saved = localStorage.getItem('ringo_theme')
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

let theme = chosenTheme()

function applyTheme() {
  document.documentElement.dataset.theme = theme
}

function setTheme(next) {
  theme = next
  localStorage.setItem('ringo_theme', next)
  applyTheme()
  themeSwitch(document.querySelector('#theme'))
  themeSwitch(document.querySelector('#login-theme'))
}

function themeSwitch(parent) {
  if (!parent) return
  parent.replaceChildren()
  const next = theme === 'dark' ? 'light' : 'dark'
  const button = el('button')
  button.type = 'button'
  button.className = 'theme-toggle'
  button.append(svgEl(next === 'light' ? 'sun' : 'moon'), el('span', t(next)))
  button.addEventListener('click', () => setTheme(next))
  parent.append(button)
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

const plan = {
  en: {
    title: 'Objectives and roadmap',
    now: 'Current objectives',
    road: 'Roadmap',
    predictive: 'Predictive calling',
    tracking: 'Tracking, ready 31.10.2026',
    due: 'Everything still open is ready on 31.10.2026.',
    connect: 'Connection',
    states: { done: 'In place', next: 'Next', wait: 'Waiting', later: 'Later', due: '31.10.2026' },
    objectives: [
      ['done', 'Show RIngomarket, soittamo, and Staging together, with the latest call on each.'],
      ['done', 'Name the seller, call centre, and operator behind the calls, leads, and sales.'],
      ['done', 'Record new calls, leads, and sales as they arrive, and keep phone numbers and personal details off this page.'],
      ['due', 'Connect the Ringo Market page to the calling desk. The picture is already drawn. The addresses come when they are ready.'],
      ['due', 'Show predictive calling in plain numbers: how many extra lines are open, how often a person answers with nobody free, and when calling drops to one line.'],
    ],
    steps: [
      ['done', 'Picture', 'The three books, the sellers, the last 14 days, and new calls as they arrive.'],
      ['done', 'How the pieces fit', 'Ringo Market on the left, the calling desk in the middle, and the three books on the right.'],
      ['due', 'Predictive calling', 'Show how RIngomarket paces calls now, and how soittamo used to.'],
      ['due', 'Tracking', 'How often people answer, how many answers are machines, how long a connection waits, how sellers turn calls into sales, and how long callers sit waiting.'],
    ],
    lead: 'Predictive calling rings more lines than there are free callers. Most lines are not answered by a person. The extra lines are there so that, when a person does answer, a caller is already free. If the person answers and no caller is free, that call is left waiting. We call that an abandoned call.',
    where: 'RIngomarket keeps each round of calling: how many lines were tried, how many reached a person, how many were left with nobody free, how many extra lines were open, and the running share of abandoned answers against a limit. If that share gets too high, calling drops to one line per free caller until it cools. soittamo kept an older count: calls made, answers, people, machines, abandoned calls, and a short recent stretch of the same.',
    formulas: [
      ['How often someone answers', '(people reached + calls left waiting) ÷ lines tried', 'The share of tries that reached a person. Lines nobody answered, and answering machines, stay in the count of tries. This is the share the calling desk uses.'],
      ['Extra lines', 'keep it between the lowest and highest allowed, around 1 ÷ how often someone answers', 'Lines to ring = free callers × extra lines. If one try in five reaches a person, about five lines are rung. The desk will not go under its lowest setting or over its highest.'],
      ['Calls left waiting', 'calls left waiting ÷ (calls left waiting + calls joined to a caller)', 'People who answered and were not joined to a caller, divided by every person who answered. This running share is compared with the limit saved for that round of calling. Many markets keep it near 3% of answered calls. The saved limit is the one this desk uses.'],
      ['soittamo’s recent stretch', 'abandoned calls in the stretch ÷ calls made in the stretch', 'This counts abandoned calls per call made, so the number looks smaller than the share of people who answered and were left waiting. The limit should use that answer-based share.'],
      ['Back to one line', 'if too many answered calls are left waiting, ring only one line per free caller', 'No extra lines until the share cools, or someone turns the extra lines back on.'],
      ['People, not machines', 'people ÷ (people + machines)', 'Was the answer a person or a machine. A machine should not take a caller. soittamo counted both. RIngomarket notes the result on each try.'],
    ],
    tracks: [
      'How long a person waits after answering, including the short message played when nobody is free',
      'Abandoned calls by campaign and country, and whether that short message was played',
      'When extra lines were turned off, why, and how long only one line stays open',
      'How sellers convert: sales ÷ calls',
      'How long a caller sits free, waiting for a person',
      'How full the callers’ time is: talk time ÷ (talk time + waiting)',
    ],
  },
  fi: {
    title: 'Tavoitteet ja tiekartta',
    now: 'Nykyiset tavoitteet',
    road: 'Tiekartta',
    predictive: 'Ennakoiva soitto',
    tracking: 'Seuranta, valmis 31.10.2026',
    due: 'Kaikki kesken oleva on valmis 31.10.2026.',
    connect: 'Yhteys',
    states: { done: 'Käytössä', next: 'Seuraavaksi', wait: 'Odottaa', later: 'Myöhemmin', due: '31.10.2026' },
    objectives: [
      ['done', 'Näytä RIngomarket, soittamo ja Staging yhdessä, ja jokaisen viimeisin puhelu.'],
      ['done', 'Nimeä myyjä, puhelukeskus ja operaattori puheluiden, liidien ja kauppojen takana.'],
      ['done', 'Tallenna uudet puhelut, liidit ja kaupat sitä mukaa kun ne syntyvät, ilman puhelinnumeroita ja henkilötietoja.'],
      ['due', 'Yhdistä Ringo Marketin sivu soitontyöhön. Kuva on jo valmis. Osoitteet tulevat, kun ne annetaan.'],
      ['due', 'Näytä ennakoiva soitto selvin luvuin: montako ylimääräistä linjaa on auki, kuinka usein ihminen vastaa eikä soittajaa ole vapaana, ja milloin soitto pudotetaan yhteen linjaan.'],
    ],
    steps: [
      ['done', 'Kuva', 'Kolme kirjaa, myyjät, viimeiset 14 päivää ja uudet puhelut sitä mukaa kun ne tulevat.'],
      ['done', 'Miten osat liittyvät', 'Ringo Market vasemmalla, soitontyö keskellä ja kolme kirjaa oikealla.'],
      ['due', 'Ennakoiva soitto', 'Näytetään, miten RIngomarket tahdistaa soitot nyt, ja miten soittamo teki sen aiemmin.'],
      ['due', 'Seuranta', 'Kuinka usein vastataan, montako vastausta on koneita, kauanko kytkentää odotetaan, miten myyjät päätyvät kauppaan, ja kauanko soittaja istuu vapaana.'],
    ],
    lead: 'Ennakoiva soitto soittaa useampia linjoja kuin vapaita soittajia on. Suurin osa linjoista ei päädy ihmiselle. Ylimääräiset linjat ovat sitä varten, että ihmisen vastatessa soittaja on jo vapaa. Jos ihminen vastaa eikä soittajaa ole vapaana, puhelu jää odottamaan. Sitä kutsutaan hylätyksi puheluksi.',
    where: 'RIngomarket pitää kirjaa jokaisesta soittojaksosta: montako linjaa yritettiin, montako tavoitti ihmisen, montako jäi ilman vapaata soittajaa, montako ylimääräistä linjaa oli auki, ja miten hylättyjen vastausten osuus liikkuu rajaa vasten. Jos osuus nousee liian korkeaksi, soitto pudotetaan yhteen linjaan vapaata soittajaa kohden, kunnes osuus jäähtyy. soittamo piti vanhempaa lukua: soitetut, vastaukset, ihmiset, koneet, hylätyt puhelut ja lyhyt tuore jakso samoista.',
    formulas: [
      ['Kuinka usein joku vastaa', '(tavoitetut ihmiset + odottamaan jääneet) ÷ yritetyt linjat', 'Osuus yrityksistä, jotka tavoittivat ihmisen. Linjat, joihin kukaan ei vastannut, ja puhelinvastaajat jäävät yritysten joukkoon. Tätä osuutta soitontyö käyttää.'],
      ['Ylimääräiset linjat', 'pysy alimman ja ylimmän sallitun välissä, noin 1 ÷ kuinka usein joku vastaa', 'Soitot = vapaat soittajat × ylimääräiset linjat. Jos joka viides yritys tavoittaa ihmisen, linjoja soitetaan noin viisi. Soitontyö ei laske alle alimman eikä nouse yli ylimmän asetuksen.'],
      ['Odottamaan jääneet', 'odottamaan jääneet ÷ (odottamaan jääneet + soittajalle kytketyt)', 'Ihmiset, jotka vastasivat eikä heitä kytketty soittajalle, jaettuna kaikilla vastanneilla. Tätä liikkuvaa osuutta verrataan sille soittojaksolle tallennettuun rajaan. Monilla markkinoilla katto on noin 3 % vastanneista. Tallennettu raja on se, jota tämä soitontyö käyttää.'],
      ['soittamon tuore jakso', 'jakson hylätyt puhelut ÷ jakson soitot', 'Tämä laskee hylätyt puhelut per soitto, joten luku näyttää pienemmältä kuin niiden osuus, jotka vastasivat ja jäivät odottamaan. Rajan pitäisi käyttää tuota vastauksiin perustuvaa osuutta.'],
      ['Takaisin yhteen linjaan', 'jos liian moni vastannut jää odottamaan, soi vain yksi linja vapaata soittajaa kohden', 'Ei ylimääräisiä linjoja, ennen kuin osuus jäähtyy tai joku kytkee ylimääräiset linjat takaisin.'],
      ['Ihmiset, eivät koneet', 'ihmiset ÷ (ihmiset + koneet)', 'Oliko vastaus ihminen vai kone. Koneen ei pidä viedä soittajaa. soittamo laski molemmat. RIngomarket merkitsee tuloksen jokaiseen yritykseen.'],
    ],
    tracks: [
      'Kauanko ihminen odottaa vastattuaan, mukaan lukien lyhyt viesti, joka soi kun soittajaa ei ole vapaana',
      'Hylätyt puhelut kampanjoittain ja maittain, ja soitettiinko tuo lyhyt viesti',
      'Milloin ylimääräiset linjat suljettiin, miksi, ja kauanko vain yksi linja pysyy auki',
      'Miten myyjät päätyvät kauppaan: kaupat ÷ puhelut',
      'Kauanko soittaja istuu vapaana odottaen ihmistä',
      'Miten täynnä soittajien aika on: puheaika ÷ (puheaika + odotus)',
    ],
  },
}

let planIndex = 0
let planCount = 0
let planShow = () => {}
let planGen = 0
let planOrigin = 0
let planPaused = false
let planPauseAt = 0
let planPausedFor = 0
const planMs = 30000

function planGoals(text) {
  return [
    {
      state: 'done',
      name: text.steps[0][1],
      paragraphs: [text.steps[0][2]],
      lines: text.objectives.slice(0, 3).map((row) => row[1]),
    },
    {
      state: 'done',
      name: text.steps[1][1],
      paragraphs: [text.steps[1][2]],
    },
    {
      state: 'due',
      name: text.connect,
      paragraphs: [text.objectives[3][1]],
    },
    {
      state: 'due',
      name: text.predictive,
      paragraphs: [text.lead, text.where],
      formulas: text.formulas,
    },
    {
      state: 'due',
      name: text.steps[3][1],
      paragraphs: [text.steps[3][2]],
      lines: text.tracks,
    },
  ]
}

function paintPlanMeter(ratio) {
  const fill = document.querySelector('#plan-fill')
  const count = document.querySelector('#plan-count')
  const clamped = Math.max(0, Math.min(1, ratio))
  if (fill) fill.style.width = `${clamped * 100}%`
  if (count) count.textContent = `${Math.ceil((1 - clamped) * (planMs / 1000))}s`
}

function resetPlanClock() {
  planOrigin = performance.now()
  planPausedFor = 0
  if (planPaused) planPauseAt = planOrigin
  paintPlanMeter(0)
}

function armPlanClock() {
  const gen = ++planGen
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    paintPlanMeter(0)
    return
  }
  const loop = (now) => {
    if (gen !== planGen) return
    if (!planOrigin) planOrigin = now
    const frozen = planPaused ? planPauseAt : now
    const elapsed = Math.max(0, frozen - planOrigin - planPausedFor)
    if (!planPaused && elapsed >= planMs) {
      planIndex = (planIndex + 1) % planCount
      planShow(planIndex)
      planOrigin = now
      planPausedFor = 0
      paintPlanMeter(0)
    } else {
      paintPlanMeter(elapsed / planMs)
    }
    requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

function renderPlan() {
  const text = plan[lang]
  const goals = planGoals(text)
  planCount = goals.length
  if (planIndex >= planCount) planIndex = 0
  const root = document.querySelector('#plan')
  root.className = 'window'
  root.replaceChildren()
  const bar = el('div', null, 'window-bar')
  const dots = el('span', null, 'dots')
  dots.append(document.createElement('i'), document.createElement('i'), document.createElement('i'))
  bar.append(dots, el('strong', text.title))

  const tabs = el('div', null, 'plan-tabs')
  tabs.setAttribute('role', 'tablist')
  const panels = el('div', null, 'plan-panels')
  const buttons = []

  goals.forEach((goal, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.setAttribute('role', 'tab')
    button.setAttribute('aria-selected', index === planIndex ? 'true' : 'false')
    const mark = svgEl(goal.state)
    mark.classList.add('tiny')
    button.append(mark, el('span', goal.name))
    button.addEventListener('click', () => {
      planIndex = index
      planShow(index)
      resetPlanClock()
    })
    buttons.push(button)
    tabs.append(button)

    const panel = el('div', null, 'plan-panel')
    panel.setAttribute('role', 'tabpanel')
    panel.hidden = index !== planIndex
    const head = el('div', null, 'meta')
    head.append(el('h2', goal.name), statusMark(goal.state, text.states[goal.state]))
    panel.append(head)
    for (const paragraph of goal.paragraphs || []) panel.append(el('p', paragraph))
    if (goal.formulas) {
      const formulas = el('div', null, 'formulas')
      for (const [name, formula, note] of goal.formulas) {
        const card = el('article', null, 'formula')
        card.append(el('h3', name))
        const code = document.createElement('code')
        code.textContent = formula
        card.append(code, el('p', note))
        formulas.append(card)
      }
      panel.append(formulas)
    }
    if (goal.lines) {
      const list = el('ul', null, 'plan-lines')
      for (const line of goal.lines) {
        const item = document.createElement('li')
        const mark = svgEl(goal.state === 'due' ? 'track' : 'done')
        mark.classList.add('tiny')
        item.append(mark, el('span', line))
        list.append(item)
      }
      panel.append(list)
    }
    panels.append(panel)
  })

  const meter = el('div', null, 'plan-meter')
  const timer = el('div', null, 'plan-timer')
  const fill = document.createElement('i')
  fill.id = 'plan-fill'
  timer.append(fill)
  const count = el('span', '30s', 'plan-count')
  count.id = 'plan-count'
  meter.append(timer, count)
  meter.setAttribute('aria-hidden', 'true')

  const due = el('p', text.due, 'plan-due')
  root.append(bar, due, tabs, meter, panels)

  planShow = (index) => {
    buttons.forEach((button, i) => button.setAttribute('aria-selected', i === index ? 'true' : 'false'))
    panels.querySelectorAll('.plan-panel').forEach((panel, i) => {
      panel.hidden = i !== index
    })
    const selected = buttons[index]
    if (!selected) return
    const strip = selected.parentElement
    const start = selected.offsetLeft
    const end = start + selected.offsetWidth
    if (start < strip.scrollLeft || end > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: Math.max(0, start - 12), behavior: 'smooth' })
    }
  }

  root.onpointerenter = () => {
    if (planPaused) return
    planPaused = true
    planPauseAt = performance.now()
  }
  root.onpointerleave = () => {
    if (!planPaused) return
    planPausedFor += performance.now() - planPauseAt
    planPaused = false
  }

  armPlanClock()
}

function attachedIds() {
  try {
    const saved = JSON.parse(localStorage.getItem('ringo_attached') || '[]')
    if (!Array.isArray(saved)) return []
    const known = new Set(clips.map((clip) => clip.id))
    return saved.filter((id) => known.has(id))
  } catch {
    return []
  }
}

function setAttached(ids) {
  localStorage.setItem('ringo_attached', JSON.stringify(ids))
  renderClips()
}

function toggleAttached(id) {
  const ids = attachedIds()
  const next = ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
  setAttached(next)
  if (!next.includes(id)) return
  if (window.matchMedia('(max-width: 900px)').matches) closeClips()
}

function closeClips() {
  shell.classList.remove('clips-open')
  const toggle = document.querySelector('#clips-toggle')
  if (toggle) toggle.setAttribute('aria-expanded', 'false')
}

function clipSrc(clip) {
  return `/clips/${encodeURIComponent(clip.file)}`
}

function clipLength(node, file, seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    node.textContent = file
    return
  }
  const total = Math.round(seconds)
  const minutes = Math.floor(total / 60)
  const remain = String(total % 60).padStart(2, '0')
  node.textContent = `${file} · ${minutes}:${remain}`
}

function clipButton(on) {
  const button = el('button', null, 'clip-attach')
  button.type = 'button'
  const mark = svgEl(on ? 'close' : 'attach')
  mark.classList.add('tiny')
  button.append(mark, el('span', on ? t('removeClip') : t('attach')))
  return button
}

function renderClips() {
  const aside = document.querySelector('#clips')
  aside.replaceChildren()
  aside.setAttribute('aria-label', t('clips'))
  aside.append(el('p', 'Ringo Market', 'workspace'))
  const head = el('div', null, 'clips-head')
  head.append(el('h2', t('clips')))
  const close = el('button', null, 'ghost clips-close')
  close.type = 'button'
  const closeMark = svgEl('close')
  closeMark.classList.add('tiny')
  close.append(closeMark, el('span', t('clipsClose')))
  close.addEventListener('click', closeClips)
  head.append(close)
  aside.append(head)

  const on = new Set(attachedIds())
  if (!clips.length) {
    const empty = el('div', null, 'clips-empty')
    const mark = svgEl('clip')
    mark.classList.add('tiny')
    empty.append(mark, el('p', t('clipsEmpty')))
    aside.append(empty)
  } else {
    const list = el('div', null, 'clip-list')
    for (const clip of clips) list.append(clipRow(clip, on.has(clip.id)))
    aside.append(list)
  }

  const stage = document.querySelector('#attached')
  const shown = clips.filter((clip) => on.has(clip.id))
  stage.replaceChildren()
  stage.hidden = shown.length === 0
  for (const clip of shown) stage.append(attachmentCard(clip))

  const toggle = document.querySelector('#clips-toggle')
  if (!toggle) return
  const mark = svgEl('clip')
  mark.classList.add('tiny')
  toggle.replaceChildren(mark, el('span', t('clips')))
  toggle.setAttribute('aria-expanded', shell.classList.contains('clips-open') ? 'true' : 'false')
}

function clipRow(clip, on) {
  const row = el('article', null, on ? 'clip is-on' : 'clip')
  const frame = el('div', null, 'clip-frame')
  const video = document.createElement('video')
  video.preload = 'metadata'
  video.muted = true
  video.playsInline = true
  video.src = clipSrc(clip)
  frame.append(video)
  const meta = el('div', null, 'clip-meta')
  const file = el('span', clip.file)
  video.addEventListener('loadedmetadata', () => clipLength(file, clip.file, video.duration))
  meta.append(el('strong', clip.title))
  if (on) meta.append(el('span', t('attached'), 'clip-state'))
  meta.append(file)
  const button = clipButton(on)
  button.addEventListener('click', () => toggleAttached(clip.id))
  row.append(frame, meta, button)
  return row
}

function attachmentCard(clip) {
  const card = el('article', null, 'attachment')
  const video = document.createElement('video')
  video.controls = true
  video.playsInline = true
  video.preload = 'metadata'
  video.src = clipSrc(clip)
  const bar = el('div', null, 'attachment-bar')
  const mark = svgEl('clip')
  mark.classList.add('tiny')
  const name = el('div', null, 'attachment-name')
  const file = el('span', clip.file)
  video.addEventListener('loadedmetadata', () => clipLength(file, clip.file, video.duration))
  name.append(el('strong', clip.title), file)
  const remove = el('button', null, 'attachment-remove')
  remove.type = 'button'
  remove.setAttribute('aria-label', t('removeClip'))
  const close = svgEl('close')
  close.classList.add('tiny')
  remove.append(close)
  remove.addEventListener('click', () => toggleAttached(clip.id))
  bar.append(mark, name, remove)
  card.append(video, bar)
  return card
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function paintDue() {
  const clock = document.querySelector('#due-clock')
  const left = document.querySelector('#due-left')
  const when = document.querySelector('#due-when')
  if (!clock || !left || !when) return
  when.textContent = t('readyOn')
  const ms = dueAt - Date.now()
  if (ms <= 0) {
    clock.textContent = lang === 'fi' ? '00 pv 00:00:00' : '00d 00:00:00'
    left.textContent = t('dueNow')
    return
  }
  const total = Math.floor(ms / 1000)
  const days = Math.floor(total / 86400)
  const hours = Math.floor(total / 3600) % 24
  const minutes = Math.floor(total / 60) % 60
  const seconds = total % 60
  clock.textContent = lang === 'fi'
    ? `${pad(days)} pv ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(days)}d ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  left.textContent = t('left')
}

function renderMembers() {
  const list = document.querySelector('#members')
  const label = document.querySelector('#people-label')
  if (!list || !label) return
  label.textContent = t('participants')
  list.replaceChildren()
  list.setAttribute('aria-label', t('participants'))
  members.forEach((person, index) => {
    const item = el('li')
    item.append(el('span', person.mark, `avatar tone-${index}`), el('span', person.name))
    list.append(item)
  })
}

function applyStatic() {
  document.documentElement.lang = lang === 'fi' ? 'fi' : 'en'
  document.title = 'Ringo Market'
  fill('#login-kicker', t('kicker'))
  wordmark('#login-title')
  fill('#login-help', t('help'))
  fill('#login-submit', t('open'))
  wordmark('#title')
  paintDue()
  renderMembers()
  renderLegend()
  fill('#intro', t('intro'))
  fill('#privacy', t('privacy'))
  fill('#chart-title', t('chart'))
  fill('#feed-title', t('feed'))
  fill('#feed-help', t('feedHelp'))
  langSwitch(document.querySelector('#login-lang'))
  langSwitch(document.querySelector('#lang'))
  applyTheme()
  themeSwitch(document.querySelector('#login-theme'))
  themeSwitch(document.querySelector('#theme'))
  document.querySelector('#login-logo').replaceChildren(svgEl('ringo'))
  document.querySelector('#logo').replaceChildren(svgEl('ringo'))
  renderPlan()
  renderClips()
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

function callsPerSale(calls, sales) {
  const dials = Number(calls) || 0
  const deals = Number(sales) || 0
  if (!dials || !deals) return null
  return Math.round(dials / deals)
}

function saleRatioText(calls, sales) {
  const dials = Number(calls) || 0
  const deals = Number(sales) || 0
  if (!dials) return ''
  if (!deals) return t('zeroSales', { calls: dials.toLocaleString(locale()) })
  const pct = (deals / dials) * 100
  const shown = pct >= 1 ? pct.toFixed(1) : pct.toFixed(3)
  return t('saleRatio', { per: callsPerSale(dials, deals).toLocaleString(locale()), pct: shown })
}

function statusWord(value) {
  if (value === 'active' || value === 'suspended') return t(value)
  return value || ''
}

function orgTable(rows, withStatus) {
  const table = document.createElement('table')
  const head = document.createElement('tr')
  const headings = withStatus
    ? [t('organization'), t('status'), t('campaigns'), t('leads'), t('calls'), t('sales'), t('perSale')]
    : [t('seller'), t('campaigns'), t('leads'), t('calls'), t('sales'), t('perSale')]
  headings.forEach((label, index) => {
    const cell = el('th', label)
    if (index >= headings.length - 5) cell.className = 'num'
    head.append(cell)
  })
  table.append(head)
  const labels = headings.slice(1)
  for (const row of rows) {
    const line = document.createElement('tr')
    const name = row.verified === false ? t('unverified', { name: row.name }) : row.name
    const values = []
    if (withStatus) values.push(statusWord(row.status))
    for (const key of ['campaigns', 'leads', 'calls', 'sales']) values.push(Number(row[key] || 0).toLocaleString(locale()))
    const per = callsPerSale(row.calls, row.sales)
    values.push(per ? per.toLocaleString(locale()) : '—')
    line.append(el('td', name))
    values.forEach((value, index) => {
      const cell = el('td', value, index === 0 && withStatus ? '' : 'num')
      cell.dataset.label = labels[index]
      line.append(cell)
    })
    table.append(line)
  }
  const wrap = el('div', null, 'table-scroll')
  wrap.append(table)
  return wrap
}

function renderStack(sources) {
  const root = document.querySelector('#stack')
  root.replaceChildren()
  root.className = 'window'
  const bar = el('div', null, 'window-bar')
  bar.append(el('strong', t('stack')))
  const grid = el('div', null, 'stack')

  const front = el('article', null, 'node frontend')
  const frontTitle = el('div', null, 'named')
  frontTitle.append(svgEl('frontend'), el('h2', t('frontendTitle')))
  front.append(el('p', t('frontendRole'), 'role'), frontTitle, el('p', t('frontendBody')), statusMark('later', t('later')))
  const mid = el('article', null, 'node middle')
  const midTitle = el('div', null, 'named')
  midTitle.append(svgEl('backend'), el('h2', t('middleTitle')))
  mid.append(el('p', t('middleRole'), 'role'), midTitle, el('p', t('middleBody')), statusMark('later', t('later')))
  const clusters = el('article', null, 'node clusters')
  const clusterTitle = el('div', null, 'named')
  clusterTitle.append(svgEl('database'), el('h2', t('clusterTitle')))
  clusters.append(el('p', t('clusterRole'), 'role'), clusterTitle, el('p', t('clusterBody')))
  const list = el('ul', null, 'cluster-list')
  for (const [key, source] of Object.entries(sources)) {
    const item = document.createElement('li')
    const name = el('span', null, 'named')
    const mark = svgEl(key)
    mark.classList.add('tiny')
    name.append(mark, el('span', labels[key] || key))
    const toneKey = sourceTone(key, source)
    const state = statusMark(toneKey, t(toneKey))
    item.append(name, state)
    list.append(item)
  }
  clusters.append(list)
  grid.append(
    front,
    flow(t('flowToApp'), t('appOut'), t('flowFromApp'), t('appIn')),
    mid,
    flow(t('flowToData'), t('dbOut'), t('flowFromData'), t('dbIn')),
    clusters,
  )
  root.append(bar, grid)
}

function lane(kind, dir, cargo) {
  const row = el('p', null, `lane ${kind}`)
  const mark = svgEl('arrow')
  row.append(mark, el('span', dir, 'dir'), el('span', cargo, 'cargo'))
  return row
}

function flow(outDir, outCargo, backDir, backCargo) {
  const box = el('div', null, 'flow')
  box.append(lane('to', outDir, outCargo), lane('back', backDir, backCargo))
  return box
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
    const state = sourceTone(key, source)
    const card = el('article', null, `${state} source-${key}`)
    const meta = el('div', null, 'meta')
    meta.append(statusMark(state, t(state)))
    const heading = el('div', null, 'named')
    heading.append(svgEl(key), el('h2', labels[key] || key))
    card.append(meta, heading)
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
      const ratio = saleRatioText(source.calls, source.sales)
      if (ratio) card.append(el('p', ratio, 'ratio'))
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
    shell.hidden = true
    return
  }
  login.hidden = true
  shell.hidden = false
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

document.querySelector('#clips-toggle').addEventListener('click', () => {
  shell.classList.toggle('clips-open')
  document.querySelector('#clips-toggle').setAttribute('aria-expanded', shell.classList.contains('clips-open') ? 'true' : 'false')
})
document.querySelector('#clips-backdrop').addEventListener('click', closeClips)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeClips()
})

applyStatic()
setInterval(paintDue, 1000)
refresh()
