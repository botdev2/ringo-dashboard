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
    liveCampaigns: '{n} campaigns live now',
    oneCampaign: '1 campaign live now',
    noCallsYet: 'No calls yet',
    callUnit: 'calls',
    light: 'Light',
    dark: 'Dark',
    detail: '{leads} leads · {sales} sales',
    saleRatio: '1 sale per {per} calls · {pct}%',
    zeroSales: '0 sales in {calls} calls',
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
    liveCampaigns: '{n} kampanjaa käynnissä',
    oneCampaign: '1 kampanja käynnissä',
    noCallsYet: 'Ei vielä puheluita',
    callUnit: 'puhelua',
    light: 'Vaalea',
    dark: 'Tumma',
    detail: '{leads} liidiä · {sales} kauppaa',
    saleRatio: '1 kauppa / {per} puhelua · {pct} %',
    zeroSales: '0 kauppaa / {calls} puhelua',
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
}

function svgEl(name) {
  const span = document.createElement('span')
  span.className = `logo ${name}`
  span.innerHTML = marks[name]
  return span
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
    tracking: 'Tracking to add',
    states: { done: 'In place', next: 'Next', wait: 'Waiting', later: 'Later' },
    objectives: [
      ['done', 'Show RIngomarket, soittamo, and Staging together, with the latest call on each.'],
      ['done', 'Name the seller, call centre, and operator behind the calls, leads, and sales.'],
      ['done', 'Record new rows as they arrive, and keep phone numbers and personal details off this page.'],
      ['wait', 'Connect the Ringo frontend and the backend middleman. The stack is drawn. The links come when those URLs are set.'],
      ['next', 'Show predictive calling: overdial, abandon rate against its target, and the single-line breaker.'],
    ],
    steps: [
      ['done', 'Picture', 'The three books, sellers, 14-day outcomes, and the live feed.'],
      ['next', 'Stack connections', 'The real frontend on the left, the backend in the middle, and the database clusters on the right.'],
      ['next', 'Predictive calling', 'Read dialer sessions on RIngomarket, and the older predictive sessions on soittamo.'],
      ['later', 'Tracking', 'Answer rate, machines, connect wait, seller conversion, and agent idle time.'],
    ],
    lead: 'Predictive calling dials more lines than there are free agents. Most lines are not answered by a person. The extra lines are there so that, when a person does answer, an agent is already free. If the person answers and no agent is free, the call is an abandon.',
    where: 'RIngomarket stores each pacing run on dialer_sessions: legs dialed, connects, abandons, the overdial ratio, and a rolling abandon rate against a target. If that rate rises too far, the governor and the rate breaker force one line per agent until single_line_until. soittamo kept the older predictive_dial_sessions: dials, answers, humans, machines, abandons, and a sliding window.',
    formulas: [
      ['Answer rate', '(connects + abandons) ÷ legs', 'Share of attempts that reached a person. Unanswered lines and machines stay in the denominator, so this rate is what the pacing uses.'],
      ['Overdial ratio', 'min(maximum, max(minimum, 1 ÷ answer rate))', 'Lines to dial = idle agents × overdial ratio. If one attempt in five reaches a person, the ratio is about 5. The session will not go under its minimum or over its maximum.'],
      ['Abandon rate', 'abandons ÷ (abandons + connects)', 'People who answered and were not joined to an agent, divided by every person who answered. This is the rolling abandon rate. It is compared with the target stored on the same session. Many markets keep this near 3% of answered calls. The session target is the limit this dialer uses.'],
      ['soittamo window', 'abandons in the window ÷ dials in the window', 'abandon_count_window ÷ dial_count_window. This counts abandons per dial, so it reads lower than the answer-based rate. The answer-based rate is the one that should trip the breaker.'],
      ['Single-line breaker', 'if abandon rate > target, overdial ratio = 1', 'One line per idle agent, until single_line_until. No extra calls until the rate cools or someone re-arms the governor.'],
      ['Human share', 'humans ÷ (humans + machines)', 'Answering-machine detection on the leg. A machine should not take an agent. soittamo stored both totals. RIngomarket stores the detection result on each dialer leg.'],
    ],
    tracks: [
      'Connect wait, from connect latency and the info-message delay on an abandon',
      'Abandon log by campaign and country, and whether the info message played',
      'Breaker trips, the reason, and the time left on a single line',
      'Seller conversion: sales ÷ calls',
      'Agent idle time while waiting for a person',
      'Occupancy: talk time ÷ (talk time + idle time)',
    ],
  },
  fi: {
    title: 'Tavoitteet ja tiekartta',
    now: 'Nykyiset tavoitteet',
    road: 'Tiekartta',
    predictive: 'Ennakoiva soitto',
    tracking: 'Seuranta, joka lisätään',
    states: { done: 'Käytössä', next: 'Seuraavaksi', wait: 'Odottaa', later: 'Myöhemmin' },
    objectives: [
      ['done', 'Näytä RIngomarket, soittamo ja Staging yhdessä, ja jokaisen viimeisin puhelu.'],
      ['done', 'Nimeä myyjä, puhelukeskus ja operaattori puheluiden, liidien ja kauppojen takana.'],
      ['done', 'Tallenna uudet rivit sitä mukaa kun ne syntyvät, ilman puhelinnumeroita ja henkilötietoja.'],
      ['wait', 'Yhdistä Ringon käyttöliittymä ja taustapalvelu. Pino on piirretty. Linkit tulevat, kun osoitteet annetaan.'],
      ['next', 'Näytä ennakoiva soitto: ylisoitto, hylkäysaste tavoitteeseen nähden ja yhden linjan katkaisija.'],
    ],
    steps: [
      ['done', 'Kuva', 'Kolme kirjaa, myyjät, 14 päivän tulokset ja live-syöte.'],
      ['next', 'Pinon yhteydet', 'Oikea käyttöliittymä vasemmalle, taustapalvelu keskelle ja tietokantaklusterit oikealle.'],
      ['next', 'Ennakoiva soitto', 'Luetaan RIngomarketin dialer-istunnot ja soittamon vanhemmat predictive-istunnot.'],
      ['later', 'Seuranta', 'Vastausaste, koneet, kytkennän odotus, myyjän konversio ja soittajan joutenolo.'],
    ],
    lead: 'Ennakoiva soitto soittaa useampia linjoja kuin vapaita soittajia on. Suurin osa linjoista ei päädy ihmiselle. Ylimääräiset linjat ovat sitä varten, että ihmisen vastatessa soittaja on jo vapaa. Jos ihminen vastaa eikä soittajaa ole vapaana, puhelu on hylkäys.',
    where: 'RIngomarket tallentaa jokaisen tahdistusjakson tauluun dialer_sessions: soittoyritykset, kytkennät, hylkäykset, ylisoittosuhteen ja liukuvan hylkäysasteen suhteessa tavoitteeseen. Jos aste nousee liian korkeaksi, rajoitin ja nopeuskatkaisija pakottavat yhden linjan soittajaa kohden hetkeen single_line_until asti. soittamo käytti vanhempaa taulua predictive_dial_sessions: soitot, vastaukset, ihmiset, koneet, hylkäykset ja liukuvan ikkunan.',
    formulas: [
      ['Vastausaste', '(kytkennät + hylkäykset) ÷ yritykset', 'Osuus yrityksistä, jotka tavoittivat ihmisen. Vastaamattomat linjat ja koneet jäävät jakajaan. Tätä astetta tahdistus käyttää.'],
      ['Ylisoittosuhde', 'min(maksimi, max(minimi, 1 ÷ vastausaste))', 'Soitot = vapaat soittajat × ylisoittosuhde. Jos joka viides yritys tavoittaa ihmisen, suhde on noin 5. Istunto ei laske alle miniminsä eikä nouse yli maksiminsa.'],
      ['Hylkäysaste', 'hylkäykset ÷ (hylkäykset + kytkennät)', 'Ihmiset, jotka vastasivat eikä heitä kytketty soittajalle, jaettuna kaikilla vastanneilla. Tämä on liukuva hylkäysaste. Sitä verrataan samalle istunnolle tallennettuun tavoitteeseen. Monilla markkinoilla katto on noin 3 % vastanneista. Istunnon tavoite on tämän soittimen raja.'],
      ['soittamon ikkuna', 'ikkunan hylkäykset ÷ ikkunan soitot', 'abandon_count_window ÷ dial_count_window. Tämä on hylkäyksiä per soitto, joten luku on pienempi kuin vastauksiin perustuva aste. Katkaisijan pitäisi käyttää vastauksiin perustuvaa astetta.'],
      ['Yhden linjan katkaisija', 'jos hylkäysaste > tavoite, ylisoittosuhde = 1', 'Yksi linja vapaata soittajaa kohden, kunnes single_line_until. Ei ylimääräisiä soittoja, ennen kuin aste jäähtyy tai rajoitin viritetään uudelleen.'],
      ['Ihmisten osuus', 'ihmiset ÷ (ihmiset + koneet)', 'Linjan puhelinvastaajatunnistus. Koneen ei pidä viedä soittajaa. soittamo tallensi molemmat summat. RIngomarket tallentaa tunnistuksen tuloksen jokaiseen yritykseen.'],
    ],
    tracks: [
      'Kytkennän odotus: connect latency ja hylkäyksen infoviestin viive',
      'Hylkäysloki kampanjoittain ja maittain, ja soitettiinko infoviesti',
      'Katkaisijan laukeamiset, syy ja jäljellä oleva yhden linjan aika',
      'Myyjän konversio: kaupat ÷ puhelut',
      'Soittajan joutenolo ihmistä odottaessa',
      'Kuormitus: puheaika ÷ (puheaika + joutenolo)',
    ],
  },
}

function renderPlan() {
  const text = plan[lang]
  const root = document.querySelector('#plan')
  root.className = 'window'
  root.replaceChildren()
  const bar = el('div', null, 'window-bar')
  const dots = el('span', null, 'dots')
  dots.append(document.createElement('i'), document.createElement('i'), document.createElement('i'))
  bar.append(dots, el('strong', text.title))
  const body = el('div', null, 'plan-body')

  const split = el('div', null, 'plan-split')
  const now = el('div')
  now.append(el('h2', text.now))
  const objectives = el('ul', null, 'plan-list')
  for (const [state, line] of text.objectives) {
    const item = document.createElement('li')
    const pillClass = state === 'done' ? 'live' : state === 'next' ? 'quiet' : 'empty'
    item.append(el('span', text.states[state], `pill ${pillClass}`), el('p', line))
    objectives.append(item)
  }
  now.append(objectives)

  const road = el('div')
  road.append(el('h2', text.road))
  const steps = el('ol', null, 'steps')
  text.steps.forEach((step, index) => {
    const [state, name, detail] = step
    const item = document.createElement('li')
    item.append(el('span', String(index + 1), 'step-no'))
    const block = el('div')
    const head = el('div', null, 'meta')
    head.append(el('b', name), el('span', text.states[state], `pill ${state === 'done' ? 'live' : state === 'later' ? 'empty' : 'quiet'}`))
    block.append(head, el('p', detail))
    item.append(block)
    steps.append(item)
  })
  road.append(steps)
  split.append(now, road)

  const predict = el('div')
  predict.append(el('h2', text.predictive), el('p', text.lead), el('p', text.where))
  const formulas = el('div', null, 'formulas')
  for (const [name, formula, note] of text.formulas) {
    const card = el('article', null, 'formula')
    card.append(el('h3', name))
    const code = document.createElement('code')
    code.textContent = formula
    card.append(code, el('p', note))
    formulas.append(card)
  }
  predict.append(formulas)

  const tracking = el('div')
  tracking.append(el('h2', text.tracking))
  const chips = el('div', null, 'chips')
  for (const line of text.tracks) chips.append(el('span', line))
  tracking.append(chips)

  body.append(split, predict, tracking)
  root.append(bar, body)
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
  applyTheme()
  themeSwitch(document.querySelector('#login-theme'))
  themeSwitch(document.querySelector('#theme'))
  document.querySelector('#login-logo').replaceChildren(svgEl('ringo'))
  document.querySelector('#logo').replaceChildren(svgEl('ringo'))
  renderPlan()
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
  for (const row of rows) {
    const line = document.createElement('tr')
    const name = row.verified === false ? t('unverified', { name: row.name }) : row.name
    line.append(el('td', name))
    if (withStatus) line.append(el('td', statusWord(row.status)))
    for (const key of ['campaigns', 'leads', 'calls', 'sales']) {
      line.append(el('td', Number(row[key] || 0).toLocaleString(locale()), 'num'))
    }
    const per = callsPerSale(row.calls, row.sales)
    line.append(el('td', per ? per.toLocaleString(locale()) : '—', 'num'))
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
  const frontTitle = el('div', null, 'named')
  frontTitle.append(svgEl('frontend'), el('h2', t('frontendTitle')))
  front.append(el('p', t('frontendRole'), 'role'), frontTitle, el('p', t('frontendBody')), el('p', t('later'), 'wait'))
  const mid = el('article', null, 'node middle')
  const midTitle = el('div', null, 'named')
  midTitle.append(svgEl('backend'), el('h2', t('middleTitle')))
  mid.append(el('p', t('middleRole'), 'role'), midTitle, el('p', t('middleBody')), el('p', t('later'), 'wait'))
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
    const card = el('article', null, `${state} source-${key}`)
    const meta = el('div', null, 'meta')
    meta.append(el('span', source.ok ? t(state) : t('empty'), `pill ${state}`))
    if (source.version) meta.append(el('span', t('postgres', { version: String(source.version).split(' ')[0] }), 'version'))
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
