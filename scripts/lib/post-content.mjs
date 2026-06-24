// Shared content + design tokens for the rich social-post generators
// (squares 1080x1080 and stories 1080x1920).

export const INVERT = 'assets/mark-norman-logo-cabin-invert.png'
export const TRANSP = 'assets/mark-norman-logo-cabin-transparent.png'
export const PORTRAITS = ['assets/mark-hero-portrait.jpg', 'assets/mark-about-portrait.png', 'assets/mark-events-portrait.png', 'assets/mark-ask-portrait.png', 'assets/mark-contact-portrait.png', 'assets/mark-volunteer-portrait.png']

export const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />`
export const TOKENS = `:root{--navy:#0B2844;--navy-2:#102F4F;--navy-3:#0F3C66;--red:#B62025;--red-2:#921A1F;--red-3:#D63D42;--paper:#F5F2EC;--paper-2:#EDE8DD;--bone:#D4CCB7;--stone:#5F594D;--stone-d:#3E3A33;--paper-78:rgba(245,242,236,.82);--ff:'Cabin',sans-serif;--ff-mono:'JetBrains Mono',monospace}`

export const scaler = (sel) => `<style>html,body{height:100%;overflow:hidden}${sel}{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(var(--s,1))}</style>
<script>(function(){var c=document.querySelector('${sel}');if(!c)return;var f=function(){c.style.setProperty('--s',Math.min(innerWidth/c.offsetWidth,innerHeight/c.offsetHeight,1))};addEventListener('resize',f);f()})()</script>`

export const pad = (n) => String(n).padStart(2, '0')
export const pick = (a, i) => a[i % a.length]

export const PAL = {
  navy: { bg: 'var(--navy)', text: 'var(--paper)', red: 'var(--red-3)', body: 'var(--paper-78)', logo: INVERT, hl: 'rgba(214,61,66,.24)' },
  paper: { bg: 'var(--paper)', text: 'var(--navy)', red: 'var(--red)', body: 'var(--stone-d)', logo: TRANSP, hl: 'rgba(182,32,37,.20)' },
  paper2: { bg: 'var(--paper-2)', text: 'var(--navy)', red: 'var(--red)', body: 'var(--stone-d)', logo: TRANSP, hl: 'rgba(182,32,37,.20)' },
}

// thematic icons (navy line + red accent, drawn in a 0..100 box)
export const ICONS = {
  capitol: '<rect x="22" y="74" width="56" height="8" fill="currentColor"/><path d="M50 18 L78 40 H22 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><g stroke="currentColor" stroke-width="6"><line x1="31" y1="44" x2="31" y2="72"/><line x1="44" y1="44" x2="44" y2="72"/><line x1="56" y1="44" x2="56" y2="72"/><line x1="69" y1="44" x2="69" y2="72"/></g><circle cx="50" cy="29" r="5" fill="#B62025"/>',
  shield: '<path d="M50 10 L84 23 V49 C84 72 68 86 50 92 C32 86 16 72 16 49 V23 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M36 50 l10 11 l20 -24" fill="none" stroke="#B62025" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
  store: '<path d="M20 44 L26 26 H74 L80 44 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M24 44 V80 H76 V44" fill="none" stroke="currentColor" stroke-width="6"/><rect x="42" y="56" width="16" height="24" fill="#B62025"/>',
  book: '<path d="M50 26 C40 20 24 20 18 24 V76 C24 72 40 72 50 78 C60 72 76 72 82 76 V24 C76 20 60 20 50 26 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><line x1="50" y1="26" x2="50" y2="78" stroke="#B62025" stroke-width="6"/>',
  paw: '<circle cx="32" cy="42" r="9" fill="currentColor"/><circle cx="50" cy="34" r="9" fill="currentColor"/><circle cx="68" cy="42" r="9" fill="currentColor"/><path d="M50 52 C38 52 30 62 30 71 C30 81 40 83 50 79 C60 83 70 81 70 71 C70 62 62 52 50 52 Z" fill="#B62025"/>',
  server: '<rect x="22" y="24" width="56" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><rect x="22" y="54" width="56" height="22" rx="4" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="34" cy="35" r="4" fill="#B62025"/><circle cx="34" cy="65" r="4" fill="#B62025"/>',
  pin: '<path d="M50 14 C34 14 22 26 22 42 C22 64 50 88 50 88 C50 88 78 64 78 42 C78 26 66 14 50 14 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><circle cx="50" cy="42" r="11" fill="#B62025"/>',
  bolt: '<path d="M56 10 L26 56 H48 L44 90 L74 44 H52 Z" fill="#B62025" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
  heartplus: '<path d="M50 84 C20 64 14 44 24 32 C32 22 44 26 50 36 C56 26 68 22 76 32 C86 44 80 64 50 84 Z" fill="none" stroke="currentColor" stroke-width="6" stroke-linejoin="round"/><path d="M50 42 V64 M39 53 H61" stroke="#B62025" stroke-width="7" stroke-linecap="round"/>',
  star: '<path d="M50 12 L62 42 L94 44 L69 64 L78 94 L50 76 L22 94 L31 64 L6 44 L38 42 Z" fill="#B62025" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>',
  scales: '<line x1="50" y1="18" x2="50" y2="80" stroke="currentColor" stroke-width="6"/><line x1="26" y1="30" x2="74" y2="30" stroke="currentColor" stroke-width="6"/><path d="M26 30 L16 52 H36 Z" fill="none" stroke="#B62025" stroke-width="5" stroke-linejoin="round"/><path d="M74 30 L64 52 H84 Z" fill="none" stroke="#B62025" stroke-width="5" stroke-linejoin="round"/><rect x="36" y="80" width="28" height="6" fill="currentColor"/>',
  check: '<circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" stroke-width="6"/><path d="M34 51 l11 12 l22 -26" fill="none" stroke="#B62025" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
  flag: '<line x1="30" y1="16" x2="30" y2="86" stroke="currentColor" stroke-width="6"/><path d="M30 20 H72 L62 34 L72 48 H30 Z" fill="#B62025" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/>',
}

export const TOPICS = [
  { eb: '[ socialism 101 ]', head: 'Why Mark opposes <em>democratic socialism</em>', body: 'Mark does not believe Oregon’s future should depend on larger government, higher taxes, and more centralized control.', icon: 'capitol' },
  { eb: '[ a different path ]', head: 'Oregon needs <em>a different path</em>', body: 'Built on opportunity, accountability, public safety, educational excellence, economic growth, and individual freedom.', icon: 'flag' },
  { eb: '[ public policy ]', head: 'Government should serve people, <em>not grow larger</em>', body: 'Government has important responsibilities, but it should not become the center of economic and family life.', icon: 'capitol' },
  { eb: '[ public safety ]', head: 'Compassion and safety <em>belong together</em>', body: 'Fully fund public safety, support strong training and community policing, and expand behavioral health partnerships.', icon: 'shield' },
  { eb: '[ small business ]', head: 'Small businesses need <em>room to grow</em>', body: 'Small businesses should be treated as partners in economic growth, not endless sources of revenue.', icon: 'store' },
  { eb: '[ education ]', head: 'Strong basics. <em>Parents in the loop.</em>', body: 'Teachers empowered to teach, parents respected as partners, and students prepared for adult life.', icon: 'book' },
  { eb: '[ animal welfare ]', head: 'Humane, practical, <em>science-based</em>', body: 'Reduce cruelty and neglect while respecting families, farmers, ranchers, and responsible pet owners.', icon: 'paw' },
  { eb: '[ data centers ]', head: 'Innovation, not at the cost of <em>local communities</em>', body: 'Support innovation while requiring accountability, reliable energy planning, and protection for local communities.', icon: 'server' },
  { eb: '[ local issues ]', head: 'Oregon problems need <em>Oregon solutions</em>', body: 'People do not need to agree on every national issue to work together on local problems.', icon: 'pin' },
  { eb: '[ transportation & energy ]', head: 'Built on reality, <em>not ideology</em>', body: 'Invest in infrastructure people actually use and energy systems that reliably work.', icon: 'bolt' },
  { eb: '[ healthcare ]', head: 'Healthcare that’s <em>patient-centered</em>', body: 'Decisions should stay between patients and professionals, not centralized through government control.', icon: 'heartplus' },
  { eb: '[ veteran support ]', head: 'Veterans deserve <em>real support</em>', body: 'They fulfilled their commitment to this country. Government and society should fulfill their commitment to them.', icon: 'star' },
  { eb: '[ mark’s position ]', head: 'Mark’s position is <em>clear</em>', body: 'Mark trusts House District 27 voters to study the issues, compare the visions, and decide.', icon: 'scales' },
  { eb: '[ two philosophies ]', head: 'Two philosophies <em>of government</em>', body: 'One depends on larger government and centralized control. Mark’s depends on opportunity and accountability.', icon: 'scales' },
  { eb: '[ house district 27 ]', head: 'A different path for <em>House District 27</em>', body: 'This election is about two different views of government, and which path will best serve Oregon.', icon: 'pin' },
  { eb: '[ practical leadership ]', head: 'Practical leadership <em>for Oregon</em>', body: 'Mark believes Oregon needs service, solutions, and accountability, not a larger-government agenda.', icon: 'check' },
  { eb: '[ opportunity ]', head: 'Opportunity over <em>centralized control</em>', body: 'America’s success was built on individual liberty, free enterprise, strong families, and local communities.', icon: 'flag' },
  { eb: '[ energy ]', head: 'Reliable energy <em>that works</em>', body: 'An all-of-the-above strategy: hydroelectric, natural gas, renewables, and next-generation nuclear power.', icon: 'bolt' },
  { eb: '[ schools ]', head: 'Strong schools, <em>safe classrooms</em>', body: 'A focus on reading, writing, math, science, civics, discipline, critical thinking, and career readiness.', icon: 'book' },
  { eb: '[ working families ]', head: 'Lower costs for <em>working families</em>', body: 'Lower costs, a better climate for small business, and a government that respects taxpayers.', icon: 'store' },
  { eb: '[ meet mark ]', head: 'A Navy veteran & <em>veterinarian</em>', body: 'Thirty years of service to Oregon communities, as a retired Navy veteran and longtime veterinarian.', icon: 'star' },
  { eb: '[ accountability ]', head: 'Reform with <em>accountability</em>', body: 'Public programs should be accountable, effective, and measured by results, not by spending and size.', icon: 'check' },
  { eb: '[ service · solutions ]', head: 'Service. Solutions. <em>Accountability.</em>', body: 'Government should serve people and be measured by results, not by how large it grows.', icon: 'star' },
  { eb: '[ for oregon ]', head: 'A fair chance for <em>every Oregon family</em>', body: 'Mark shares the goal of affordable healthcare, strong schools, and safe neighborhoods for every family.', icon: 'pin' },
]
export const QUOTES = [
  { q: 'Oregonians should not have to choose between compassion and safety. <em>We need both.</em>', icon: 'shield' },
  { q: 'Small businesses should be partners in economic growth, <em>not endless sources of revenue.</em>', icon: 'store' },
  { q: 'People do not need to agree on every national issue to <em>work together on local problems.</em>', icon: 'pin' },
  { q: 'Government should serve people, <em>not simply grow larger.</em>', icon: 'capitol' },
  { q: 'Healthcare decisions should stay between patients and <em>healthcare professionals.</em>', icon: 'heartplus' },
]
export const BANNER_HEADS = [
  { h: 'A different <em>path.</em>', eb: '[ for oregon ]' },
  { h: 'Mark’s position <em>is clear.</em>', eb: '[ where mark stands ]' },
  { h: 'Service. <em>Solutions.</em>', eb: '[ the choice ]' },
  { h: 'Oregon needs <em>Oregon solutions.</em>', eb: '[ local issues ]' },
  { h: 'Reality, <em>not ideology.</em>', eb: '[ practical leadership ]' },
  { h: 'A fair chance for <em>every family.</em>', eb: '[ for oregon ]' },
]
export const STAT_SETS = [
  { nums: [['+', '30'], ['', '9'], ['', '27']], descs: ['years of service', 'issue priorities', 'house district'] },
  { nums: [['', '9'], ['+', '30'], ['', '27']], descs: ['issue priorities', 'years serving', 'district 27'] },
  { nums: [['', '27'], ['', '9'], ['+', '30']], descs: ['house district', 'issue priorities', 'years'] },
]
export const LIST_SETS = [
  { eb: '[ mark’s practical approach ]', head: 'A practical <em>approach</em>', items: ['Responsible spending and local flexibility.', 'Small-business growth and parent transparency.', 'Public safety with real accountability.'], icon: 'check' },
  { eb: '[ where mark stands ]', head: 'What Mark <em>supports</em>', items: ['Healthcare choice and reliable energy.', 'Veteran support that delivers real help.', 'Programs measured by results, not size.'], icon: 'scales' },
  { eb: '[ for oregon ]', head: 'Strong, <em>and accountable</em>', items: ['Strong schools focused on the basics.', 'Lower costs for working families.', 'Government that respects taxpayers.'], icon: 'book' },
]
export const STAMPS = [['Navy Veteran', 'Veterinarian · 30 yrs'], ['Service · Solutions', 'Oregon HD-27'], ['Practical', 'Accountable']]

export const logoTag = (src, h) => `<div class="logo"><div class="logo-slot"><img src="${src}" alt="Mark Norman for Oregon — House District 27" style="height:${h}px;width:auto;display:block" /></div></div>`
export const stamp = (icon, css) => `<div class="stamp" aria-hidden="true" style="${css}"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${ICONS[icon]}</svg></div>`

// ---- varied icon treatments (each a DIFFERENT look so icon posts don't repeat)
const svg = (icon) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">${ICONS[icon]}</svg>`
const onDark = (on) => (on === 'navy' ? 'var(--paper)' : 'var(--navy)')
export const ICONFX = {
  // bare oversized icon, no container
  bare: (icon, css, on) => `<div aria-hidden="true" style="position:absolute;z-index:4;color:${onDark(on)};${css}">${svg(icon)}</div>`,
  // thin outline ring around the icon
  ring: (icon, css, on) => `<div aria-hidden="true" style="position:absolute;z-index:4;color:${onDark(on)};border:5px solid ${onDark(on)};border-radius:50%;display:grid;place-items:center;${css}"><div style="width:54%;height:54%">${svg(icon)}</div></div>`,
  // solid contrasting rounded tile + small red hard shadow
  tile: (icon, css, on) => `<div aria-hidden="true" style="position:absolute;z-index:4;background:${on === 'navy' ? 'var(--paper)' : 'var(--navy)'};color:${on === 'navy' ? 'var(--navy)' : 'var(--paper)'};border-radius:20px;display:grid;place-items:center;box-shadow:10px 10px 0 var(--red);${css}"><div style="width:52%;height:52%">${svg(icon)}</div></div>`,
  // classic paper circle badge with red shadow disc (used sparingly)
  badge: (icon, css, on) => `<div aria-hidden="true" style="position:absolute;z-index:4;background:var(--paper);color:var(--navy);border:5px solid var(--navy);border-radius:50%;display:grid;place-items:center;box-shadow:12px 12px 0 var(--red);${css}"><div style="width:54%;height:54%">${svg(icon)}</div></div>`,
  // tilted red-outline "rubber stamp" rectangle
  stamp: (icon, css, on) => `<div aria-hidden="true" style="position:absolute;z-index:4;color:${onDark(on)};border:4px solid var(--red);border-radius:10px;display:grid;place-items:center;transform:rotate(-8deg);${css}"><div style="width:60%;height:60%">${svg(icon)}</div></div>`,
  // giant faint ghost icon as a background element
  ghost: (icon, css, on) => `<div aria-hidden="true" style="position:absolute;z-index:0;color:${onDark(on)};opacity:.07;${css}">${svg(icon)}</div>`,
}
