const login = document.querySelector('#login')
const shell = document.querySelector('#shell')

// Drop each mp4 in public/clips and add it here. id stays stable so an attachment survives a reload.
const members = [
  { name: 'Aleksi', mark: 'AL' },
  { name: 'Aaron', mark: 'AA' },
  { name: 'Wahid', mark: 'WA' },
]
/** Milestone label only — LeadDesk path has no hard desk deadline on this page. */
const dueClockLabel = { en: 'LIVE', fi: 'LIVE' }

const clips = [
  // { id: 'welcome', title: 'Welcome', file: 'welcome.mp4' },
]
const labels = { ringomarket: 'Ringo Market DB', soittamo: 'soittamo', staging: 'Staging' }

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
    title: 'Project: Ringo Market',
    kicker: 'Three databases, one picture',
    help: 'Enter the access code.',
    open: 'Open',
    share: 'Share access',
    shareDone: 'Copied',
    logout: 'Log out',
    badToken: 'That code was not accepted.',
    waiting: 'Waiting for the databases.',
    updated: 'Updated {when}',
    recording: 'Recording since {when}. {n} new items saved. Last check {poll}.',
    recorderError: 'Could not record: {error}',
    stack: 'Technical Stack',
    participants: 'Participants',
    readyOn: 'LeadDesk competitor path open',
    dueLabel: 'Project status',
    left: 'left',
    dueNow: 'deadline passed',
    budget: 'Budget',
    budgetAmount: 'Unknown',
    budgetUsed: 'Share used',
    budgetUsedValue: 'Unknown',
    budgetSpan: 'Duration',
    budgetSpanValue: 'Unknown',
    liveRule: 'A call in the last 6 hours.',
    quietRule: 'Calls exist, and the latest is more than 6 hours old.',
    emptyRule: 'No calls in this database.',
    frontendRole: 'What people open',
    frontendKind: 'Frontend',
    frontendTitle: 'Ringo Market',
    frontendBody: 'Where callers and sellers work.',
    middleRole: 'In the middle',
    middleKind: 'Middleware',
    middleTitle: 'Calling Facilitator',
    middleBody: 'Decides how many lines to open, and passes each call between the people and the databases.',
    clusterRole: 'The databases',
    clusterKind: 'Databases',
    clusterTitle: 'Three databases',
    clusterBody: 'Ringo Market DB is the one being written now. soittamo is retired. Staging is a practice copy and has no calls yet.',
    flowToApp: 'From the people',
    flowFromApp: 'Back to the people',
    flowToData: 'Saved in the databases',
    flowFromData: 'Taken from the databases',
    appOut: 'A free caller, the result of a call, a sale',
    appIn: 'The next person to call, who was connected, and whether only one line is open',
    dbOut: 'Calls, tries, calls nobody took, sales',
    dbIn: 'People still to call, how many lines are allowed, the 3% limit or soittamo’s recent stretch',
    later: 'Waiting for connection',
    clips: 'Clips & Notes',
    clipsEmpty: 'Video clips will be added here. Attach one and it stays on this page.',
    attach: 'Attach',
    attached: 'Attached',
    removeClip: 'Remove',
    clipsClose: 'Close',
    tabBooks: 'Databases',
    tabActivity: 'Activity',
    tabResults: 'Results',
    tabPeople: 'Sellers',
    tabPieces: 'Technical Stack',
    tabGoals: 'Goals',
    tabBooksHint: 'The three databases, and what the marks mean.',
    tabActivityHint: 'Calls over the last 14 days, and what arrived after this page was opened.',
    tabResultsHint: 'How the calls turned out over the last 14 days.',
    tabPeopleHint: 'Sellers, call centres, and operators.',
    tabPiecesHint: 'How Ringo Market, the Calling Facilitator, and the databases pass the work.',
    archTitle: 'Technical architecture',
    archPeople: 'People',
    archPeopleBody: 'Callers and sellers',
    tabGoalsHint: 'Where the salvaged product stands now, and how it aims to compete with LeadDesk.',
    tabVariables: 'Variables',
    tabVariablesHint: 'Environment variables and secrets of the salvaged Ringo Market app on this server.',
    varsTitle: 'ringomarket-salvaged',
    varsEmpty: 'No variables have been added yet.',
    varsDownload: 'Download .txt',
    varsReveal: 'Show',
    varsHide: 'Hide',
    varsCopy: 'Copy',
    varsCopied: 'Copied',
    varsKey: 'Name',
    varsValue: 'Value',
    varsScope: 'Used in',
    varsLocked: 'Variables are only shown when the dashboard has an access code.',
    footer: 'A project platform by EB Systech for projects.',
    chart: 'Ringo Market DB calls, last 14 days',
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
      ringomarket: 'The database in use now. Campaigns, leads, calls, and sales on the live markets are written here.',
      soittamo: 'Retired. Calls stopped on 24 Aug 2026. Leads, sales, and sellers are still kept here.',
      staging: 'A practice copy of Ringo Market DB. Almost no real calls, leads, or sales yet.',
    },
  },
  fi: {
    title: 'Project: Ringo Market',
    kicker: 'Kolme tietokantaa, yksi näkymä',
    help: 'Anna kojelaudan tunnus.',
    open: 'Avaa',
    share: 'Jaa pääsy',
    shareDone: 'Kopioitu',
    logout: 'Kirjaudu ulos',
    badToken: 'Tunnusta ei hyväksytty.',
    waiting: 'Odotetaan tietokantoja.',
    updated: 'Päivitetty {when}',
    recording: 'Tallennus alkoi {when}. {n} uutta merkintää. Viimeisin tarkistus {poll}.',
    recorderError: 'Tallennin: {error}',
    stack: 'Tekninen toteutus',
    participants: 'Osallistujat',
    readyOn: 'LeadDesk-kilpailijan polku auki',
    dueLabel: 'Projektin tila',
    left: 'jäljellä',
    dueNow: 'määräaika mennyt',
    budget: 'Budjetti',
    budgetAmount: 'Ei tiedossa',
    budgetUsed: 'Käytetty osuus',
    budgetUsedValue: 'Ei tiedossa',
    budgetSpan: 'Kesto',
    budgetSpanValue: 'Ei tiedossa',
    liveRule: 'Puhelu viimeisen 6 tunnin aikana.',
    quietRule: 'Puheluita on, ja viimeisin on yli 6 tuntia vanha.',
    emptyRule: 'Tässä tietokannassa ei ole puheluita.',
    frontendRole: 'Mitä ihmiset avaavat',
    frontendKind: 'Frontend',
    frontendTitle: 'Ringo Market',
    frontendBody: 'Täällä soittajat ja myyjät työskentelevät.',
    middleRole: 'Keskellä',
    middleKind: 'Middleware',
    middleTitle: 'Soitonvälittäjä',
    middleBody: 'Päättää, montako linjaa avataan, ja välittää puhelut ihmisten ja tietokantojen välillä.',
    clusterRole: 'Tietokannat',
    clusterKind: 'Tietokannat',
    clusterTitle: 'Kolme tietokantaa',
    clusterBody: 'Ringo Market DB on se, jota kirjoitetaan nyt. soittamo on poistettu käytöstä. Staging on harjoituskopio, eikä siinä ole vielä puheluita.',
    flowToApp: 'Ihmisiltä',
    flowFromApp: 'Ihmisille',
    flowToData: 'Tallennetaan tietokantoihin',
    flowFromData: 'Haetaan tietokannoista',
    appOut: 'Vapaa soittaja, puhelun tulos ja kauppa',
    appIn: 'Seuraava soitettava, kuka kytkettiin, ja onko auki vain yksi linja',
    dbOut: 'Puhelut, yritykset, ilman soittajaa jääneet ja kaupat',
    dbIn: 'Vielä soittamatta olevat, linjojen katto, 3 % raja tai soittamon tuore jakso',
    later: 'Odottaa yhteyttä',
    clips: 'Clips & Notes',
    clipsEmpty: 'Videoleikkeet lisätään tähän. Liitetty leike jää tälle sivulle.',
    attach: 'Liitä',
    attached: 'Liitetty',
    removeClip: 'Poista',
    clipsClose: 'Sulje',
    tabBooks: 'Tietokannat',
    tabActivity: 'Toiminta',
    tabResults: 'Tulokset',
    tabPeople: 'Myyjät',
    tabPieces: 'Tekninen toteutus',
    tabGoals: 'Tavoitteet',
    tabBooksHint: 'Kolme tietokantaa ja se, mitä merkit tarkoittavat.',
    tabActivityHint: 'Puhelut viimeiseltä 14 päivältä, ja se mikä on tullut tämän sivun avaamisen jälkeen.',
    tabResultsHint: 'Miten puhelut päättyivät viimeisen 14 päivän aikana.',
    tabPeopleHint: 'Myyjät, puhelukeskukset ja operaattorit.',
    tabPiecesHint: 'Miten Ringo Market, soitonvälittäjä ja tietokannat välittävät työn.',
    archTitle: 'Tekninen arkkitehtuuri',
    archPeople: 'Ihmiset',
    archPeopleBody: 'Soittajat ja myyjät',
    tabGoalsHint: 'Missä pelastettu tuote on nyt, ja miten se aikoo kilpailla LeadDeskin kanssa.',
    tabVariables: 'Muuttujat',
    tabVariablesHint: 'Tämän palvelimen pelastetun Ringo Market -sovelluksen ympäristömuuttujat ja salaisuudet.',
    varsTitle: 'ringomarket-salvaged',
    varsEmpty: 'Muuttujia ei ole vielä lisätty.',
    varsDownload: 'Lataa .txt',
    varsReveal: 'Näytä',
    varsHide: 'Piilota',
    varsCopy: 'Kopioi',
    varsCopied: 'Kopioitu',
    varsKey: 'Nimi',
    varsValue: 'Arvo',
    varsScope: 'Käytössä',
    varsLocked: 'Muuttujat näytetään vain, kun koontinäytöllä on pääsykoodi.',
    footer: 'EB Systechin projektialusta projekteille.',
    chart: 'Ringo Market DB, puhelut 14 päivää',
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
      ringomarket: 'Tietokanta, jota kirjoitetaan nyt. Kampanjat, liidit, puhelut ja kaupat elävillä markkinoilla.',
      soittamo: 'Poistettu käytöstä. Puhelut päättyivät 24.8.2026. Liidit, kaupat ja myyjät ovat yhä tallessa.',
      staging: 'Harjoituskopio Ringo Market DB -tietokannasta. Oikeita puheluita, liidejä ja kauppoja ei juuri ole.',
    },
  },
}

let lang = localStorage.getItem('ringo_lang') === 'fi' ? 'fi' : 'en'
let lastSummary = null
let started = false
let stream = null
let refreshTimer = 0

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
  node.replaceChildren()
  const brand = document.createElement('span')
  brand.className = 'brand-mark'
  brand.textContent = 'Ringo'
  node.append(document.createTextNode('Project: '), brand, document.createTextNode(' Market'))
}

function renderLegend() {
  const root = document.querySelector('#legend')
  if (!root) return
  root.replaceChildren()
  const row = el('div', null, 'legend-row')
  for (const key of ['live', 'quiet', 'empty']) {
    const item = el('div', null, 'legend-item')
    item.append(statusMark(key, t(key)), el('p', t(`${key}Rule`), 'legend-rule'))
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
  typescript: '<svg viewBox="0 0 32 32"><rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 12.5h9M13.5 12.5V22M18.5 17.2h4.6a2.2 2.2 0 0 1 0 4.4H18.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  react: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="2.1" fill="currentColor"/><ellipse cx="16" cy="16" rx="11" ry="4.2" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(60 16 16)" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="16" cy="16" rx="11" ry="4.2" transform="rotate(120 16 16)" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  node: '<svg viewBox="0 0 32 32"><path d="M16 3.6 27.2 10v12L16 28.4 4.8 22V10Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M11.2 17.4 16 12.8l4.8 4.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  postgres: '<svg viewBox="0 0 32 32"><path d="M8.2 18.4c.2-5.4 3.8-9.6 9.2-9.6 2.6 0 4.4.8 5.6 2 1-1.1 2.3-1.5 3.4-.6.7.6.8 1.6.2 2.4-1.1.1-2 .8-2.5 1.7 1.3 1.1 2 2.6 2 4.3 0 3.8-2.8 6.4-7.2 6.4h-.8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2 22.2c.3 2.1-.3 3.8-1.6 5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M11.4 16.6c1.5 1.2 2.2 2.6 2 4.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="20.6" cy="13.8" r="0.9" fill="currentColor"/></svg>',
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
  clip: '<svg viewBox="0 0 16 16"><path d="M5.5 3.4v9.2L13 8z" fill="currentColor"/></svg>',
  attach: '<svg viewBox="0 0 16 16"><path d="M6.4 8.7 10.2 4.9a2 2 0 0 1 2.8 2.8L7.8 12.9a3.1 3.1 0 0 1-4.4-4.4l4.9-4.9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  close: '<svg viewBox="0 0 16 16"><path d="M4.6 4.6 11.4 11.4M11.4 4.6 4.6 11.4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
}

function svgEl(name) {
  const span = document.createElement('span')
  span.className = `logo ${name}`
  span.innerHTML = marks[name]
  return span
}

const frontendUrl = 'https://app.ringomarket.com/'

function externalLink(href) {
  const link = document.createElement('a')
  link.className = 'ext'
  link.href = href
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.textContent = href
  return link
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
  button.setAttribute('aria-label', t(next))
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
    nowLabel: 'Where we are',
    leadDeskLabel: 'Competing with LeadDesk',
    predictive: 'Predictive calling',
    due: 'Salvaged product is live for browsing. Carrier dialing stays dark until Telnyx keys and a signed-off market flag are added.',
    states: { done: 'In place', next: 'Next', wait: 'Waiting', later: 'Later', due: 'Open' },
    nowLead:
      '29.10.2026. Ringo Market runs as a salvaged Next.js app on this server, pointed at the live Neon database. Admins, team leaders, agents and clients each have a real dashboard. One admin login can View as any of those accounts.',
    nowLines: [
      'App: https://ringomarket-salvaged.62.83.41.82.sslip.io — Coolify, branch main, healthy.',
      'Source: private botdev2/ringomarket_salvaged (from aaronmkael/ringomarket). Latest work includes caller themes, Settings above Report, TL wallboard + report builder, campaign call modes, and admin View as.',
      'Login for testing: admin sauli@ringomarket.com (password in server secrets). Use bottom-right View as to open any Admin, Team Leader or Agent.',
      'What works now: browse Admin / TL / Agent / Client UIs on real data. What does not: new outbound dialing, SMS/email send, Google OAuth, AI assistant — Telnyx and most product env keys are unset on purpose.',
      'This project desk still watches the three Postgres backends (Ringo Market DB live, soittamo retired, Staging empty).',
    ],
    leadDeskLead:
      'Owner decision 29.10.2026: Ringo Market becomes a LeadDesk competitor — sell contact-centre software (and win call centres on the marketplace), not only a commission marketplace.',
    leadDeskSections: [
      {
        title: 'Already shipped toward that path',
        lines: [
          'TL wallboard and report builder (/tl/wallboard, /tl/reports).',
          'Campaign call modes: manual / progressive / predictive (Soittotilat). Fake predictive mockup removed.',
          'Caller themes: eight palettes under Settings → Appearance; Wiki documents themes, Settings and call modes.',
          'Admin View as: one account opens any Admin, Team Leader or Agent live dashboard.',
        ],
      },
      {
        title: 'Still open (Operation LeadDesk phases)',
        lines: [
          'Phase 0 — faster deploys, staging with carrier on test numbers only, backups, green CI.',
          'Phase 1 — public API, signed webhooks, Zapier/Make-friendly CRM hooks.',
          'Phase 2 — TV wallboard link, scheduled reports, QA alerts and scorecards on top of existing AI call scores.',
          'Phase 3 — richer retries, list segments, branched script editor.',
          'Phases 4–7 — inbound/IVR, omnichannel, SIP flexibility, WFM, production SLA — only after 0–3.',
        ],
      },
    ],
    lead: 'Predictive calling rings more lines than there are free callers. Most lines are not answered by a person. The extra lines are there so that, when a person does answer, a caller is already free. If the person answers and no caller is free, that call is left waiting. We call that an abandoned call.',
    pacingTitle: 'The pacing formula',
    pacingCaption: 'How Ringo Market DB chooses the lines.',
    pacingPlain: 'Lines to ring are the free callers times the extra lines, while the share of answered calls left waiting stays at or under the saved limit. Extra lines are one divided by how often a person answers, held between the lowest and the highest this round allows. How often a person answers is the calls joined to a caller plus the calls left waiting, divided by the lines tried. A machine, or a line nobody answered, stays in the lines tried and is not counted as a person. The share left waiting is the calls left waiting divided by every person who answered. Above the saved limit, ring one line per free caller.',
    whenUnder: 'when S ≤ S*',
    whenOver: 'when S > S*',
    defAnswer: 'How often someone answers',
    defAnswerPlain: 'Calls joined to a caller, plus calls left waiting, divided by lines tried.',
    defExtra: 'Extra lines',
    defExtraPlain: 'One divided by how often someone answers, kept between the lowest and the highest allowed for this round.',
    defShare: 'Share left waiting',
    defSharePlain: 'Calls left waiting, divided by every person who answered. The saved limit on a Ringo Market DB round is often 3%.',
    legend: 'L lines to ring · N free callers · R extra lines · A how often someone answers · T lines tried · C calls joined to a caller · B calls left waiting · r min lowest allowed · r max highest allowed · S share left waiting · S* saved limit',
    updateLog: 'Update log',
    updateLead: 'Development on the salvaged app, late October 2026.',
    updateLines: [
      '27–28.10 — Salvage live on Coolify from botdev2/ringomarket_salvaged; Neon database hooked for real users and campaigns.',
      '29.10 — Caller themes + Settings above Report; Wiki updated; LeadDesk competitor decision recorded.',
      '29.10 — TL Predictive mockup removed; Wallboard and Build a report promoted under Daily → Reports with UI polish.',
      '29.10 — Admin View as FAB (Admin / Team Leader / Agent, searchable real accounts). Sauli admin account seeded.',
      'Carrier still dark: no TELNYX_* / CARRIER_TELNYX_MARKETS on salvage. Dialing and new recordings wait on keys + explicit OK.',
    ],
  },
  fi: {
    title: 'Tavoitteet ja tiekartta',
    nowLabel: 'Missä ollaan',
    leadDeskLabel: 'Kilpailu LeadDeskin kanssa',
    predictive: 'Ennakoiva soitto',
    due: 'Pelastettu tuote on selattavissa. Operaattorisoitto pysyy kiinni, kunnes Telnyx-avaimet ja allekirjoitettu markkinalippu lisätään.',
    states: { done: 'Käytössä', next: 'Seuraavaksi', wait: 'Odottaa', later: 'Myöhemmin', due: 'Auki' },
    nowLead:
      '29.10.2026. Ringo Market pyörii pelastettuna Next.js-sovelluksena tällä palvelimella, live Neon -tietokantaan kytkettynä. Adminilla, tiiminvetäjällä, agentilla ja asiakkaalla on oikea kojelauta. Yhdellä admin-tunnuksella voi avata minkä tahansa niistä (View as).',
    nowLines: [
      'Sovellus: https://ringomarket-salvaged.62.83.41.82.sslip.io — Coolify, haara main, kunnossa.',
      'Lähde: yksityinen botdev2/ringomarket_salvaged (aaronmkael/ringomarketista). Uusin työ: soittajan teemat, Asetukset Raportoi-yläpuolella, TL-seinätaulu + raporttirakentaja, kampanjan soittotilat ja admin View as.',
      'Testikirjautuminen: admin sauli@ringomarket.com (salasana palvelimen salaisuuksissa). Oikeasta alakulmasta View as avaa minkä tahansa Admin / TL / Agent -tilin.',
      'Toimii nyt: Admin / TL / Agent / Client -käyttöliittymät oikealla datalla. Ei toimi: uudet lähtevät soitot, SMS/sähköposti, Google-kirjautuminen, AI-assistentti — Telnyx ja useimmat tuoteavaimet on jätetty pois tarkoituksella.',
      'Tämä projektipöytä seuraa edelleen kolmea Postgres-taustaa (Ringo Market DB live, soittamo poistettu, Staging tyhjä).',
    ],
    leadDeskLead:
      'Omistajan päätös 29.10.2026: Ringo Marketista tulee LeadDesk-kilpailija — myydään contact center -ohjelmistoa (ja voitetaan call centereitä myös marketplacella), ei vain komissiomarkkinapaikkaa.',
    leadDeskSections: [
      {
        title: 'Jo toimitettu tällä polulla',
        lines: [
          'TL-seinätaulu ja raporttirakentaja (/tl/wallboard, /tl/reports).',
          'Kampanjan soittotilat: manuaalinen / progressive / predictive. Feikki predictive-mockup poistettu.',
          'Soittajan teemat: kahdeksan palettia Asetukset → Ulkoasu; Wiki kuvaa teemat, Asetukset ja soittotilat.',
          'Admin View as: yksi tili avaa minkä tahansa Admin-, TL- tai Agent-kojelaudan live-datalla.',
        ],
      },
      {
        title: 'Vielä auki (Operation LeadDesk -vaiheet)',
        lines: [
          'Vaihe 0 — nopeammat deployt, staging testinumeroilla, varmuuskopiot, vihreä CI.',
          'Vaihe 1 — julkinen API, allekirjoitetut webhookit, Zapier/Make-ystävälliset CRM-kytkennät.',
          'Vaihe 2 — TV-linkki seinätauluun, ajastetut raportit, QA-hälytykset ja pistekortit olemassa olevan AI-pisteytyksen päälle.',
          'Vaihe 3 — rikkaammat uudelleensoitot, listasegmentit, haarautuva skriptieditori.',
          'Vaiheet 4–7 — saapuvat/IVR, monikanava, SIP, WFM, tuotannon SLA — vasta 0–3 jälkeen.',
        ],
      },
    ],
    lead: 'Ennakoiva soitto soittaa useampia linjoja kuin vapaita soittajia on. Suurin osa linjoista ei päädy ihmiselle. Ylimääräiset linjat ovat sitä varten, että ihmisen vastatessa soittaja on jo vapaa. Jos ihminen vastaa eikä soittajaa ole vapaana, puhelu jää odottamaan. Sitä kutsutaan hylätyksi puheluksi.',
    pacingTitle: 'Tahdistuksen kaava',
    pacingCaption: 'Näin Ringo Market DB valitsee linjat.',
    pacingPlain: 'Soitettavat linjat ovat vapaat soittajat kerrottuna ylimääräisillä linjoilla, niin kauan kuin odottamaan jääneiden osuus vastanneista pysyy tallennetussa rajassa tai sen alla. Ylimääräiset linjat ovat yksi jaettuna sillä, kuinka usein ihminen vastaa, ja ne pysyvät tämän soittojakson alimman ja ylimmän sallitun välissä. Kuinka usein ihminen vastaa saadaan, kun soittajalle kytketyt ja odottamaan jääneet lasketaan yhteen ja jaetaan yritetyillä linjoilla. Kone tai linja, johon kukaan ei vastannut, jää yritettyjen joukkoon eikä sitä lasketa ihmiseksi. Odottamaan jääneiden osuus on odottamaan jääneet jaettuna kaikilla vastanneilla. Kun osuus nousee yli tallennetun rajan, soi vain yksi linja vapaata soittajaa kohden.',
    whenUnder: 'kun S ≤ S*',
    whenOver: 'kun S > S*',
    defAnswer: 'Kuinka usein joku vastaa',
    defAnswerPlain: 'Soittajalle kytketyt plus odottamaan jääneet, jaettuna yritetyillä linjoilla.',
    defExtra: 'Ylimääräiset linjat',
    defExtraPlain: 'Yksi jaettuna sillä, kuinka usein joku vastaa, tämän jakson alimman ja ylimmän sallitun välissä.',
    defShare: 'Odottamaan jääneiden osuus',
    defSharePlain: 'Odottamaan jääneet jaettuna kaikilla vastanneilla. Ringo Market DB:n tallennettu raja on usein 3 %.',
    legend: 'L soitetavat linjat · N vapaat soittajat · R ylimääräiset linjat · A kuinka usein joku vastaa · T yritetyt linjat · C soittajalle kytketyt · B odottamaan jääneet · r min alin sallittu · r max ylin sallittu · S odottamaan jääneiden osuus · S* tallennettu raja',
    updateLog: 'Päivitysloki',
    updateLead: 'Kehitys pelastetussa sovelluksessa, lokakuun loppu 2026.',
    updateLines: [
      '27.–28.10 — Salvage live Coolifyssa botdev2/ringomarket_salvagedista; Neon kytketty oikeisiin käyttäjiin ja kampanjoihin.',
      '29.10 — Soittajan teemat + Asetukset Raportoi-yläpuolelle; Wiki päivitetty; LeadDesk-kilpailijapäätös kirjattu.',
      '29.10 — TL Predictive-mockup pois; Seinätaulu ja Raportin rakennus Daily → Raportit -osioon, UI hiottu.',
      '29.10 — Admin View as -nappi (Admin / TL / Agent, haettavat oikeat tilit). Saulin admin-tili luotu.',
      'Operaattori yhä pimeä: ei TELNYX_* / CARRIER_TELNYX_MARKETS salvagessa. Soitto ja uudet tallenteet odottavat avaimia + eksplisiittistä OK:ta.',
    ],
  },
}

let planIndex = 0
let planCount = 0
let planShow = () => {}
let planGen = 0
let planOrigin = 0
let planPaused = false
let planHeld = false
let planFrozen = false
let planFreezeAt = 0
let planPausedFor = 0
const planMs = 120000

function frac(top, bottom) {
  const node = el('span', null, 'frac')
  node.append(el('span', top, 'num'), el('span', bottom, 'den'))
  return node
}

function variable(name, subLabel, star) {
  const node = el('span', null, 'sym')
  node.append(document.createTextNode(name))
  if (subLabel) {
    const sub = document.createElement('sub')
    sub.textContent = subLabel
    node.append(sub)
  }
  if (star) {
    const sup = document.createElement('sup')
    sup.textContent = '*'
    node.append(sup)
  }
  return node
}

function mathLine(parts, condition) {
  const line = el('div', null, 'math-line')
  for (const part of parts) line.append(part instanceof Node ? part : el('span', part, 'op'))
  if (condition) line.append(el('span', condition, 'when'))
  return line
}

function clampOfAnswer() {
  const node = el('span', null, 'clamp')
  node.append(
    el('span', 'clamp', 'fn'),
    el('span', '(', 'op'),
    frac('1', 'A'),
    el('span', ', ', 'op'),
    variable('r', 'min'),
    el('span', ', ', 'op'),
    variable('r', 'max'),
    el('span', ')', 'op'),
  )
  return node
}

function renderPacing(parent, text) {
  const box = el('section', null, 'pacing')
  box.append(el('h3', text.pacingTitle), el('p', text.pacingCaption, 'caption'))
  const sheet = el('div', null, 'math-sheet')
  sheet.append(
    mathLine([variable('L'), ' = ', variable('N'), ' × ', variable('R')], text.whenUnder),
    mathLine([variable('L'), ' = ', variable('N')], text.whenOver),
  )
  box.append(sheet, el('p', text.pacingPlain, 'plain'))
  const defs = el('div', null, 'defs')
  const parts = [
    [text.defAnswer, () => mathLine([variable('A'), ' = ', frac('C + B', 'T')]), text.defAnswerPlain],
    [text.defExtra, () => mathLine([variable('R'), ' = ', clampOfAnswer()]), text.defExtraPlain],
    [text.defShare, () => mathLine([variable('S'), ' = ', frac('B', 'B + C')]), text.defSharePlain],
  ]
  for (const [title, line, plain] of parts) {
    const card = el('article', null, 'def')
    card.append(el('h3', title), line(), el('p', plain))
    defs.append(card)
  }
  box.append(defs, el('p', text.legend, 'legend'))
  parent.append(box)
}

function planGoals(text) {
  return [
    {
      state: 'done',
      name: text.nowLabel,
      paragraphs: [text.nowLead],
      lines: text.nowLines,
      link: {
        href: 'https://ringomarket-salvaged.62.83.41.82.sslip.io/login',
        label: 'https://ringomarket-salvaged.62.83.41.82.sslip.io/login',
      },
    },
    {
      state: 'next',
      name: text.leadDeskLabel,
      paragraphs: [text.leadDeskLead],
      sections: text.leadDeskSections,
    },
    {
      state: 'done',
      name: text.updateLog,
      paragraphs: [text.updateLead],
      lines: text.updateLines,
    },
    {
      state: 'due',
      name: text.predictive,
      paragraphs: [text.lead],
      pacing: true,
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

function syncPlanFreeze() {
  const should = planPaused || planHeld
  if (should && !planFrozen) {
    planFrozen = true
    planFreezeAt = performance.now()
  } else if (!should && planFrozen) {
    planPausedFor += performance.now() - planFreezeAt
    planFrozen = false
  }
}

function resetPlanClock() {
  planOrigin = performance.now()
  planPausedFor = 0
  if (planFrozen) planFreezeAt = planOrigin
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
    const frozen = planFrozen ? planFreezeAt : now
    const elapsed = Math.max(0, frozen - planOrigin - planPausedFor)
    if (!planFrozen && elapsed >= planMs) {
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
    if (goal.pacing) renderPacing(panel, text)
    if (goal.link) {
      const link = document.createElement('a')
      link.href = goal.link.href
      link.target = '_blank'
      link.rel = 'noopener'
      link.textContent = goal.link.label
      panel.append(link)
    }
    if (goal.lines) {
      const list = el('ul', null, 'plan-lines')
      for (const line of goal.lines) {
        const item = document.createElement('li')
        const mark = svgEl(goal.state === 'due' || goal.state === 'next' ? 'track' : 'done')
        mark.classList.add('tiny')
        item.append(mark, el('span', line))
        list.append(item)
      }
      panel.append(list)
    }
    for (const section of goal.sections || []) {
      const block = el('div', null, 'plan-section')
      if (section.title) block.append(el('h3', section.title))
      if (section.body) block.append(el('p', section.body))
      if (section.lines) {
        const list = el('ul', null, 'plan-lines')
        for (const line of section.lines) {
          const item = document.createElement('li')
          const mark = svgEl(goal.state === 'due' || goal.state === 'next' ? 'track' : 'done')
          mark.classList.add('tiny')
          item.append(mark, el('span', line))
          list.append(item)
        }
        block.append(list)
      }
      panel.append(block)
    }
    panels.append(panel)
  })

  const meter = el('div', null, 'plan-meter')
  const timer = el('div', null, 'plan-timer')
  const fill = document.createElement('i')
  fill.id = 'plan-fill'
  timer.append(fill)
  const count = el('span', `${planMs / 1000}s`, 'plan-count')
  count.id = 'plan-count'
  meter.append(timer, count)
  meter.setAttribute('aria-hidden', 'true')

  const due = el('p', text.due, 'plan-due')
  if (goals.length > 1) root.append(bar, due, tabs, meter, panels)
  else root.append(bar, due, panels)

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
    planPaused = true
    syncPlanFreeze()
  }
  root.onpointerleave = () => {
    planPaused = false
    syncPlanFreeze()
  }

  if (goals.length > 1) armPlanClock()
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
  toggle.setAttribute('aria-label', t('clips'))
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
  clock.textContent = dueClockLabel[lang] || dueClockLabel.en
  left.textContent = lang === 'fi' ? 'salvage käynnissä' : 'salvage online'
  when.textContent = t('readyOn')
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
    item.setAttribute('aria-label', person.name)
    item.append(el('span', person.mark, `avatar tone-${index}`), el('span', person.name, 'member-name'))
    list.append(item)
  })
}

const workspaceViews = [
  { id: 'pieces', nodes: ['#stack'] },
  { id: 'books', nodes: ['#cards', '#legend'] },
  { id: 'goals', nodes: ['#plan'] },
  { id: 'activity', nodes: ['.split'] },
  { id: 'results', nodes: ['#breakdowns'] },
  { id: 'people', nodes: ['#organizations'] },
  { id: 'variables', nodes: ['#variables'] },
]

async function renderVariables() {
  const root = document.querySelector('#variables')
  root.replaceChildren()
  root.className = 'window'
  const bar = el('div', null, 'window-bar')
  bar.append(el('strong', t('varsTitle')))
  const download = el('a', t('varsDownload'), 'vars-download')
  download.href = '/api/variables.txt'
  download.setAttribute('download', 'ringomarket-salvaged-variables.txt')
  bar.append(download)
  const body = el('div', null, 'vars-body')
  root.append(bar, body)
  const response = await fetch('/api/variables')
  if (response.status === 403) {
    body.append(el('p', t('varsLocked'), 'vars-empty'))
    return
  }
  if (!response.ok) return
  const data = await response.json()
  const groups = (data.groups || []).filter((group) => (group.items || []).length)
  if (!groups.length) {
    body.append(el('p', t('varsEmpty'), 'vars-empty'))
    return
  }
  for (const group of groups) {
    if (groups.length > 1) body.append(el('h3', group.name, 'vars-group'))
    const table = document.createElement('table')
    const head = document.createElement('tr')
    for (const label of [t('varsKey'), t('varsValue'), t('varsScope')]) head.append(el('th', label))
    table.append(head)
    for (const item of group.items) {
      const line = document.createElement('tr')
      const value = el('code', '••••••••', 'vars-value')
      let shown = false
      const reveal = el('button', t('varsReveal'), 'ghost vars-btn')
      reveal.type = 'button'
      reveal.addEventListener('click', () => {
        shown = !shown
        value.textContent = shown ? item.value : '••••••••'
        value.classList.toggle('shown', shown)
        reveal.textContent = shown ? t('varsHide') : t('varsReveal')
      })
      const copy = el('button', t('varsCopy'), 'ghost vars-btn')
      copy.type = 'button'
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(item.value)
        } catch {
          return
        }
        copy.textContent = t('varsCopied')
        setTimeout(() => { copy.textContent = t('varsCopy') }, 1200)
      })
      const cell = el('td', null, 'vars-cell')
      cell.dataset.label = t('varsValue')
      cell.append(value, reveal, copy)
      const keyCell = el('td', item.key)
      const scopeCell = el('td', item.scope || '')
      scopeCell.dataset.label = t('varsScope')
      line.append(keyCell, cell, scopeCell)
      table.append(line)
    }
    const wrap = el('div', null, 'table-scroll')
    wrap.append(table)
    body.append(wrap)
  }
}

let workspaceId = localStorage.getItem('ringo_workspace') || 'books'

function selectWorkspace(id) {
  if (!workspaceViews.some((view) => view.id === id)) id = 'books'
  workspaceId = id
  localStorage.setItem('ringo_workspace', id)
  document.querySelectorAll('#workspace button').forEach((button) => {
    button.setAttribute('aria-selected', button.dataset.view === id ? 'true' : 'false')
  })
  for (const view of workspaceViews) {
    const on = view.id === id
    for (const selector of view.nodes) {
      const node = document.querySelector(selector)
      if (node) node.hidden = !on
    }
  }
  fill('#workspace-hint', t(`tab${id.charAt(0).toUpperCase()}${id.slice(1)}Hint`))
  const selected = document.querySelector(`#workspace button[data-view="${id}"]`)
  if (selected) {
    const strip = selected.parentElement
    const start = selected.offsetLeft
    const end = start + selected.offsetWidth
    if (start < strip.scrollLeft || end > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: Math.max(0, start - 12), behavior: 'smooth' })
    }
  }
  if (id === 'variables') renderVariables()
  planHeld = id !== 'goals'
  syncPlanFreeze()
}

function renderWorkspace() {
  const nav = document.querySelector('#workspace')
  nav.replaceChildren()
  for (const view of workspaceViews) {
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.view = view.id
    button.setAttribute('role', 'tab')
    button.textContent = t(`tab${view.id.charAt(0).toUpperCase()}${view.id.slice(1)}`)
    button.addEventListener('click', () => selectWorkspace(view.id))
    nav.append(button)
  }
  selectWorkspace(workspaceId)
}

function applyStatic() {
  document.documentElement.lang = lang === 'fi' ? 'fi' : 'en'
  document.title = t('title')
  fill('#login-kicker', t('kicker'))
  wordmark('#login-title')
  fill('#login-help', t('help'))
  fill('#login-submit', t('open'))
  fill('#share', t('share'))
  fill('#logout', t('logout'))
  wordmark('#title')
  fill('#due-label', t('dueLabel'))
  fill('#budget-label', t('budget'))
  fill('#budget-amount', t('budgetAmount'))
  fill('#budget-used-label', t('budgetUsed'))
  fill('#budget-used', t('budgetUsedValue'))
  fill('#budget-span-label', t('budgetSpan'))
  fill('#budget-span', t('budgetSpanValue'))
  paintDue()
  renderMembers()
  renderLegend()
  fill('#chart-title', t('chart'))
  fill('#feed-title', t('feed'))
  fill('#feed-help', t('feedHelp'))
  fill('#footer', t('footer'))
  langSwitch(document.querySelector('#login-lang'))
  langSwitch(document.querySelector('#lang'))
  applyTheme()
  themeSwitch(document.querySelector('#login-theme'))
  themeSwitch(document.querySelector('#theme'))
  document.querySelector('#login-logo').replaceChildren(svgEl('ringo'))
  renderPlan()
  renderWorkspace()
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
  front.append(el('p', t('frontendRole'), 'role'), nodeHeading('frontend', t('frontendKind'), t('frontendTitle'), [{ icon: 'typescript', name: 'TypeScript' }, { icon: 'react', name: 'React' }]), el('p', t('frontendBody')), externalLink(frontendUrl))
  const mid = el('article', null, 'node middle')
  mid.append(el('p', t('middleRole'), 'role'), nodeHeading('backend', t('middleKind'), t('middleTitle'), [{ icon: 'node', name: 'Node.js' }]), el('p', t('middleBody')), statusMark('later', t('later')))
  const clusters = el('article', null, 'node clusters')
  clusters.append(el('p', t('clusterRole'), 'role'), nodeHeading('database', t('clusterKind'), t('clusterTitle'), [{ icon: 'postgres', name: 'PostgresDB' }]), el('p', t('clusterBody')))
  const list = el('ul', null, 'cluster-list')
  for (const [key, source] of Object.entries(sources)) {
    const item = document.createElement('li')
    const name = el('span', null, 'named')
    name.append(el('span', labels[key] || key))
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
  root.append(bar, grid, architecture(sources))
}

function techRow(items) {
  const row = el('p', null, 'tech')
  for (const item of items) {
    const chip = el('span', null, 'tech-chip')
    const mark = svgEl(item.icon)
    mark.classList.add('tiny')
    chip.append(mark, el('span', item.name))
    row.append(chip)
  }
  return row
}

function nodeHeading(icon, kind, desc, tech) {
  const title = el('div', null, 'named')
  const label = el('div', null, 'node-label')
  label.append(el('h2', kind))
  if (tech) label.append(techRow(tech))
  label.append(el('p', desc, 'node-desc'))
  title.append(svgEl(icon), label)
  return title
}

function archBox(title, lines, tech, href) {
  const box = el('div', null, 'arch-box')
  box.append(el('strong', title))
  if (tech) box.append(techRow(tech))
  for (const line of lines) box.append(el('p', line))
  if (href) box.append(externalLink(href))
  return box
}

function archLink() {
  const link = el('div', null, 'arch-link')
  const back = svgEl('arrow')
  back.classList.add('back')
  link.append(back, svgEl('arrow'))
  return link
}

function architecture(sources) {
  const wrap = el('div', null, 'arch')
  wrap.append(el('p', t('archTitle'), 'arch-title'))
  const row = el('div', null, 'arch-row')
  const data = el('div', null, 'arch-box')
  data.append(techRow([{ icon: 'postgres', name: 'PostgresDB' }]))
  const list = el('ul', null, 'arch-dbs')
  for (const key of Object.keys(sources)) list.append(el('li', labels[key] || key))
  data.append(list)
  row.append(
    archBox(t('archPeople'), [t('archPeopleBody')]),
    archLink(),
    archBox('Frontend', [t('frontendTitle')], [{ icon: 'typescript', name: 'TypeScript' }, { icon: 'react', name: 'React' }], frontendUrl),
    archLink(),
    archBox(t('middleTitle'), [], [{ icon: 'node', name: 'Node.js' }]),
    archLink(),
    data,
  )
  wrap.append(row)
  return wrap
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
    heading.append(el('h2', labels[key] || key))
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

function showLogin() {
  login.hidden = false
  shell.hidden = true
  closeClips()
}

async function logout() {
  await fetch('/api/logout', { method: 'POST' })
  if (stream) {
    stream.close()
    stream = null
  }
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = 0
  }
  started = false
  showLogin()
}

async function refresh() {
  const response = await fetch('/api/summary')
  if (response.status === 401) {
    showLogin()
    return
  }
  login.hidden = true
  shell.hidden = false
  render(await response.json())
  if (started) return
  started = true
  stream = new EventSource('/api/stream')
  stream.onmessage = (message) => {
    const payload = JSON.parse(message.data)
    if (payload.type === 'events') refresh()
  }
  refreshTimer = setInterval(refresh, 30000)
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

let shareTimer = 0

async function shareAccess() {
  const button = document.querySelector('#share')
  const response = await fetch('/api/share')
  if (!response.ok) return
  const payload = await response.json()
  const code = lang === 'fi' ? 'Tunnus' : 'Access code'
  try {
    await navigator.clipboard.writeText(`${payload.link}\n${code}: ${payload.token}`)
  } catch {
    return
  }
  button.textContent = t('shareDone')
  clearTimeout(shareTimer)
  shareTimer = setTimeout(() => {
    button.textContent = t('share')
  }, 1600)
}

document.querySelector('#share').addEventListener('click', shareAccess)
document.querySelector('#logout').addEventListener('click', logout)

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
