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
  { eb: '[ socialism 101 ]', head: 'The socialist agenda is <em>not harmless</em>', body: 'More government. Higher taxes. Less freedom. Voters deserve to know what is at stake.', icon: 'capitol' },
  { eb: '[ a different path ]', head: 'Reject more <em>government control</em>', body: 'Oregon needs accountability, public safety, strong schools, economic growth, and individual freedom.', icon: 'flag' },
  { eb: '[ save oregon ]', head: 'SAVE <em>OREGON</em>', body: 'From more taxes and bureaucracy.', icon: 'capitol' },
  { eb: '[ real life ]', head: 'Leadership shaped by <em>real life</em>', body: 'Veteran. Veterinarian. Small-business owner. Mark understands the pressures Oregon families face.', icon: 'star' },
  { eb: '[ small business ]', head: 'Stop squeezing <em>local employers</em>', body: 'Small businesses need fewer burdens, faster permits, lower pressure, and room to grow.', icon: 'store' },
  { eb: '[ centralization ]', head: 'Oregon cannot centralize its way into <em>prosperity.</em>', body: '', icon: 'capitol' },
  { eb: '[ stronger communities ]', head: 'Stronger communities. <em>Accountable government.</em>', body: 'Strong schools. Lower costs. Government that respects taxpayers.', icon: 'check' },
  { eb: '[ small business ]', head: 'Small businesses are not <em>government revenue machines</em>', body: 'Oregon should make it easier to build, hire, serve, and grow, not punish the people creating jobs.', icon: 'store' },
  { eb: '[ less bureaucracy ]', head: 'More bureaucracy will not fix <em>bureaucracy.</em>', body: '', icon: 'capitol' },
  { eb: '[ public safety ]', head: 'Safe communities are <em>not optional.</em>', body: 'Mark Norman, demanding Oregon’s rights.', icon: 'shield' },
  { eb: '[ healthcare ]', head: 'Healthcare that’s <em>patient-centered</em>', body: 'Decisions should stay between patients and professionals, not centralized through government control.', icon: 'heartplus' },
  { eb: '[ veteran support ]', head: 'Veterans deserve <em>real help.</em> Not empty promises.', body: 'Service does not end when the uniform comes off. Veterans deserve more than empty promises, dignity, and accountability.', icon: 'star' },
  { eb: '[ the choice ]', head: 'VOTE FOR <em>MARK</em>', body: '', icon: 'check' },
  { eb: '[ free download ]', head: 'Download: a warning about <em>democratic socialism in HD-27</em>', body: '', icon: 'book' },
  { eb: '[ the choice ]', head: 'This election is about <em>direction</em>', body: 'Know what is at stake.', icon: 'scales' },
  { eb: '[ local control ]', head: 'More government power means <em>less local choice.</em>', body: '', icon: 'pin' },
  { eb: '[ opportunity ]', head: 'Opportunity over <em>centralized control</em>', body: 'America’s success was built on individual liberty, free enterprise, strong families, and local communities.', icon: 'flag' },
  { eb: '[ energy ]', head: 'Reliable energy <em>that works</em>', body: 'An all-of-the-above strategy: hydroelectric, natural gas, renewables, and next-generation nuclear power.', icon: 'bolt' },
  { eb: '[ schools ]', head: 'Teach the basics. <em>Restore trust.</em>', body: 'Reading, math, science, discipline, parent transparency, and career readiness should come first.', icon: 'book' },
  { eb: '[ no empty promises ]', head: 'No <em>empty promises.</em>', body: 'Mark for Oregon.', icon: 'check' },
  { eb: '[ real service ]', head: 'Real service. <em>Real perspective.</em>', body: 'Mark brings decades of service, veterinary experience, and small-business leadership to Oregon’s real problems.', icon: 'star' },
  { eb: '[ accountability ]', head: 'Spending more is not the same as <em>solving more</em>', body: 'Public programs should be judged by results, not by how much money they consume.', icon: 'check' },
  { eb: '[ service · solutions ]', head: 'Service. Solutions. <em>Accountability.</em>', body: 'Government should serve people and be measured by results, not by how large it grows.', icon: 'star' },
  { eb: '[ for oregon ]', head: 'A fair chance for <em>every Oregon family</em>', body: 'Mark shares the goal of affordable healthcare, strong schools, and safe neighborhoods for every family.', icon: 'pin' },
]
export const QUOTES = [
  { q: 'Oregonians should not have to choose between compassion and safety. <em>We need both.</em>', icon: 'shield' },
  { q: 'Small businesses should not pay the price for <em>bigger government.</em>', icon: 'store' },
  { q: 'Trust in government is falling. <em>More control is not the answer.</em>', icon: 'capitol' },
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
  { eb: '[ where mark stands ]', head: 'Results over <em>empty promises</em>', items: ['Healthcare choice.', 'Veteran support.', 'Public programs measured by results.'], icon: 'check' },
  { eb: '[ for oregon ]', head: 'Stronger communities. <em>Accountable government.</em>', items: ['Strong schools.', 'Lower costs.', 'Government that respects taxpayers.'], icon: 'check' },
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

// ---- per-post square content (1080x1080). One entry per generated post, in the
// SAME order as COMPS × [navy, paper] in generate-social-squares.mjs. Each post is
// authored independently (no rotation), so editing one entry never affects another.
// Fields used depend on the composition: most read {eb, head, body, icon};
// quote posts read {q}; statRow/statStack read {nums, descs}; list/listChecks read
// {items}; banner/bannerStripe read {head} as the giant line.
export const SQUARES = [
  // 01 · edLeft · navy
  { eb: '[ socialism 101 ]', head: 'The socialist agenda is <em>not harmless</em>', body: 'More government. Higher taxes. Less freedom. Voters deserve to know what is at stake.', icon: 'capitol' },
  // 02 · edLeft · paper
  { eb: '[ small business ]', head: 'Small businesses are not <em>government revenue machines</em>', body: 'Oregon should make it easier to build, hire, serve, and grow, not punish the people creating jobs.', icon: 'store' },
  // 03 · edCenter · navy
  { eb: '[ the choice ]', head: 'This election is about <em>direction</em>', body: 'Know what is at stake.', icon: 'scales' },
  // 04 · edCenter · paper
  { eb: '[ accountability ]', head: 'Spending more is not the same as <em>solving more</em>', body: 'Public programs should be judged by results, not by how much money they consume.', icon: 'check' },
  // 05 · bigNum · navy
  { eb: '[ small business ]', head: 'Stop squeezing <em>local employers</em>', body: 'Small businesses need fewer burdens, faster permits, lower pressure, and room to grow.', icon: 'store' },
  // 06 · bigNum · paper
  { eb: '[ veteran support ]', head: 'Veterans deserve <em>real help.</em> Not empty promises.', body: 'Service does not end when the uniform comes off. Veterans deserve more than empty promises, dignity, and accountability.', icon: 'star' },
  // 07 · splitH · navy
  { eb: '[ schools ]', head: 'Teach the basics. <em>Restore trust.</em>', body: 'Reading, math, science, discipline, parent transparency, and career readiness should come first.', icon: 'book' },
  // 08 · splitH · paper
  { eb: '[ a different path ]', head: 'Reject more <em>government control</em>', body: 'Oregon needs accountability, public safety, strong schools, economic growth, and individual freedom.', icon: 'flag' },
  // 09 · splitV · navy
  { eb: '[ less bureaucracy ]', head: 'More bureaucracy will not fix <em>bureaucracy.</em>', body: '', icon: 'capitol' },
  // 10 · splitV · paper
  { eb: '[ local control ]', head: 'More government power means <em>less local choice.</em>', body: '', icon: 'pin' },
  // 11 · iconHero · navy
  { eb: '[ service · solutions ]', head: 'Service. Solutions. <em>Accountability.</em>', body: '', icon: 'star' },
  // 12 · iconHero · paper
  { eb: '[ centralization ]', head: 'Oregon cannot centralize its way into <em>prosperity.</em>', body: '', icon: 'capitol' },
  // 13 · portraitR · navy
  { eb: '[ the choice ]', head: 'VOTE FOR <em>MARK</em>', body: '', icon: 'check' },
  // 14 · portraitR · paper
  { eb: '[ no empty promises ]', head: 'No <em>empty promises.</em>', body: 'Mark for Oregon.', icon: 'check' },
  // 15 · portraitBand · navy
  { eb: '[ save oregon ]', head: 'SAVE <em>OREGON</em>', body: 'From more taxes and bureaucracy.', icon: 'capitol' },
  // 16 · portraitBand · paper
  { eb: '[ public safety ]', head: 'Safe communities are <em>not optional.</em>', body: 'Mark Norman, demanding Oregon’s rights.', icon: 'shield' },
  // 17 · quote · navy
  { q: 'Small businesses should not pay the price for <em>bigger government.</em>', icon: 'store' },
  // 18 · quote · paper
  { q: 'Trust in government is falling. <em>More control is not the answer.</em>', icon: 'capitol' },
  // 19 · statRow · navy
  { eb: '[ animal welfare ]', head: 'Protect animals <em>without overreach</em>', body: '', icon: 'paw', nums: [['+', '30'], ['', '9'], ['', '27']], descs: ['years in service', 'issue priorities', 'house district'] },
  // 20 · statRow · paper
  { eb: '[ free download ]', head: 'A warning about <em>democratic socialism in HD-27</em>', body: '', icon: 'book', nums: [['', '9'], ['+', '30'], ['', '27']], descs: ['issue priorities', 'years serving', 'district 27'] },
  // 21 · statHero · navy
  { eb: '[ real service ]', head: 'Real service. <em>Real perspective.</em>', body: 'Mark brings decades of service, veterinary experience, and small-business leadership to Oregon’s real problems.', icon: 'star' },
  // 22 · statHero · paper
  { eb: '[ real life ]', head: 'Leadership shaped by <em>real life</em>', body: 'Veteran. Veterinarian. Small-business owner. Mark understands the pressures Oregon families face.', icon: 'star' },
  // 23 · list · navy
  { eb: '[ where mark stands ]', head: 'Results over <em>empty promises</em>', items: ['Healthcare choice.', 'Veteran support.', 'Public programs measured by results.'], icon: 'check' },
  // 24 · list · paper
  { eb: '[ for oregon ]', head: 'Stronger communities. <em>Accountable government.</em>', items: ['Strong schools.', 'Lower costs.', 'Government that respects taxpayers.'], icon: 'check' },
  // 25 · banner · navy
  { eb: '[ taxpayers ]', head: 'Respect <em>taxpayers.</em>', icon: 'check' },
  // 26 · banner · paper
  { eb: '[ the message ]', head: 'Mark’s message is <em>clear.</em>', icon: 'flag' },
  // 27 · card · navy
  { eb: '[ the dsa agenda ]', head: 'The DSA agenda is <em>not harmless.</em>', body: 'DSA calls itself the largest socialist organization in the country. Voters deserve to know what that means for HD-27.', icon: 'capitol' },
  // 28 · card · paper
  { eb: '[ the choice ]', head: 'Reject the socialist agenda. <em>Choose practical leadership.</em>', body: 'Opportunity, accountability, public safety, strong schools, economic growth, individual freedom, and results.', icon: 'check' },
  // 29 · diagonal · navy
  { eb: '[ small business ]', head: 'Stop punishing <em>local employers</em>', body: 'Small businesses need fewer burdens, faster permits, and room to grow.', icon: 'store' },
  // 30 · diagonal · paper
  { eb: '[ schools ]', head: 'Teach the basics. <em>Keep classrooms safe.</em>', body: 'Reading, math, science, discipline, parent transparency, and career readiness must come first.', icon: 'book' },
  // 31 · edRight · navy
  { eb: '[ results ]', head: 'Oregon needs results, <em>not control</em>', body: 'Accountability, public safety, strong schools, lower costs, and individual freedom.', icon: 'check' },
  // 32 · edRight · paper
  { eb: '[ veterans ]', head: 'Real support for <em>those who served</em>', body: 'Veterans deserve care, dignity, opportunity, and systems that actually work.', icon: 'star' },
  // 33 · edBottom · navy
  { eb: '[ town hall ]', head: 'Let’s talk about what matters <em>in HD-27</em>', body: '[ DATE ] · [ TIME ] · [ LOCATION ] — Join Mark for a conversation on rising costs, schools, public safety, and government accountability.', icon: 'capitol' },
  // 34 · edBottom · paper
  { eb: '[ meet mark ]', head: 'Coffee and <em>conversation with Mark</em>', body: '[ DATE ] · [ TIME ] · [ LOCATION ] — Come meet Mark, hear his vision for Oregon, and talk about the future of House District 27.', icon: 'star' },
  // 35 · stripeField · navy
  { eb: '[ schools ]', head: 'Parents, teachers, and <em>community voices</em>', body: '[ DATE ] · [ TIME ] · [ LOCATION ] — Join Mark for a conversation about strong schools, safe classrooms, parent involvement, and student success.', icon: 'book' },
  // 36 · stripeField · paper
  { eb: '[ practical leadership ]', head: 'Less ideology. <em>More results.</em>', body: 'Mark supports service, solutions, accountability, and leadership connected to real life.', icon: 'check' },
  // 37 · ruled · navy
  { eb: '[ reject socialism ]', head: 'Reject the <em>socialist agenda</em>', body: 'House District 27 does not need higher taxes, expanded bureaucracy, public ownership, and centralized control.', icon: 'flag' },
  // 38 · ruled · paper
  { eb: '[ affordability ]', head: 'Stop making life <em>more expensive</em>', body: 'Oregon families need lower pressure, fewer unnecessary costs, and a government that respects household budgets.', icon: 'store' },
  // 39 · halfBlock · navy
  { eb: '[ working families ]', head: 'Socialism makes <em>families pay more</em>', body: 'Higher taxes, more fees, and bigger government do not make life easier for working families.', icon: 'store' },
  // 40 · halfBlock · paper
  { eb: '[ public ownership ]', head: 'Public ownership means <em>public risk</em>', body: 'Government control over major infrastructure can mean higher costs, fewer choices, and less accountability.', icon: 'bolt' },
  // 41 · starField · navy
  { eb: '[ freedom ]', head: 'Freedom builds. <em>Socialism controls.</em>', body: 'House District 27 deserves opportunity, not a larger-government agenda that limits choice.', icon: 'flag' },
  // 42 · starField · paper
  { eb: '[ affordability ]', head: 'Make Oregon <em>livable again</em>', body: 'Families need lower pressure, responsible spending, and fewer policies that drive up daily costs.', icon: 'store' },
  // 43 · listChecks · navy
  { eb: '[ what mark stands for ]', head: 'What Mark <em>stands for</em>', items: ['Affordability for working families', 'Public safety and accountability', 'Strong schools and local opportunity'], icon: 'check' },
  // 44 · listChecks · paper
  { eb: '[ what mark supports ]', head: 'Mark supports what <em>socialism threatens</em>', items: ['Individual freedom and local choice', 'Small-business growth and private enterprise', 'Programs measured by results, not control'], icon: 'check' },
  // 45 · statStack · navy
  { eb: '[ meet mark ]', head: 'Not a politician. <em>A fighter for common sense.</em>', body: '', icon: 'star', nums: [['', '22'], ['', '30'], ['', '27']], descs: ['years of service', 'years in practice', 'house district'] },
  // 46 · statStack · paper
  { eb: '[ meet mark ]', head: 'A veteran. A veterinarian. <em>A voice for Oregon.</em>', body: '', icon: 'star', nums: [['', '22'], ['', '25'], ['', '30']], descs: ['years u.s. navy veteran', 'years in district', 'years in practice'] },
  // 47 · bannerStripe · navy
  { eb: '[ oregon families ]', head: 'Oregon families are <em>paying the price</em>', icon: 'store' },
  // 48 · bannerStripe · paper
  { eb: '[ oregon families ]', head: 'Put Oregon <em>families first</em>', icon: 'store' },
  // 49 · twoCol · navy
  { eb: '[ individual freedom ]', head: 'More government means <em>less control for you</em>', body: 'When government grows, families, taxpayers, and small businesses lose more say over their own future.', icon: 'flag' },
  // 50 · twoCol · paper
  { eb: '[ data centers ]', head: 'Growth needs <em>ground rules</em>', body: 'Power demand, water use, utility costs, land pressure, and tax fairness must be answered before communities pay the price.', icon: 'server' },
]

// ---- per-post story content (1080x1920). One entry per generated story, in the
// SAME order as story COMPS × [navy, paper]. Authored independently (no rotation).
// quote → {q}; banner → {head}; list → {items}; statStack → {nums,descs} OR {body}
// (falls back to a body paragraph when no stats are supplied); others → {head, body}.
export const STORIES = [
  // 01 · edLeft · navy
  { eb: '[ bureaucracy ]', head: 'Oregon’s problems won’t be solved by <em>more bureaucracy.</em>', body: 'Agree? Tap to read Mark’s warning about socialism in Oregon.', icon: 'capitol' },
  // 02 · edLeft · paper
  { eb: '[ the choice ]', head: 'Which direction should <em>Oregon take?</em>', body: 'More government — or more accountability?', icon: 'scales' },
  // 03 · splitH · navy
  { eb: '[ ask mark ]', head: 'Ask Mark <em>Norman.</em>', body: 'Have a question about Mark’s position on socialism, taxes, public safety, schools, small business, or healthcare? Ask Mark here.', icon: 'star' },
  // 04 · splitH · paper
  { eb: '[ the choice ]', head: 'What Mark rejects. <em>What Mark supports.</em>', body: 'Rejects: larger government, higher taxes, expanded bureaucracy, centralized control. Supports: service, solutions, accountability.', icon: 'scales' },
  // 05 · bigNum · navy
  { eb: '[ centralization ]', head: 'Bigger government is not compassion. <em>It is control.</em>', body: 'Download Mark’s guide.', icon: 'capitol' },
  // 06 · bigNum · paper
  { eb: '[ public safety ]', head: 'Should public safety be <em>fully funded?</em>', body: 'Mark supports fully funded public safety with accountability.', icon: 'shield' },
  // 07 · iconHero · navy
  { eb: '[ affordability ]', head: 'How much are rising costs affecting <em>Oregon families?</em>', body: '', icon: 'store' },
  // 08 · iconHero · paper
  { eb: '[ the choice ]', head: 'HD-27 cannot afford a <em>socialist direction.</em>', body: '', icon: 'flag' },
  // 09 · portrait · navy
  { eb: '[ meet mark ]', head: 'Running for <em>House District 27.</em>', body: 'Grounded leadership and practical solutions. Follow for campaign updates.', icon: 'star' },
  // 10 · portrait · paper
  { eb: '[ ask mark ]', head: 'Mark Norman is <em>listening.</em>', body: 'Ask Mark your question.', icon: 'star' },
  // 11 · quote · navy
  { q: 'Oregon cannot tax, regulate, bureaucratize, and centralize its way into <em>prosperity.</em>' },
  // 12 · quote · paper
  { q: 'I believe Oregon needs accountability, <em>not more excuses.</em>' },
  // 13 · statStack · navy (list-style copy → body fallback)
  { eb: '[ join the campaign ]', head: 'There’s room <em>to help.</em>', body: 'Walk a neighborhood. Make calls. Host a coffee. Attend an event. Share campaign updates. Campaigns are built by people who show up.', icon: 'star' },
  // 14 · statStack · paper (list-style copy → body fallback)
  { eb: '[ a different path ]', head: 'House District 27 <em>deserves better.</em>', body: 'Less bureaucracy. More accountability. Safer communities. Stronger schools. Lower pressure on families. Practical leadership.', icon: 'flag' },
  // 15 · banner · navy
  { eb: '[ affordability ]', head: 'Higher taxes are <em>not a plan</em>', icon: 'store' },
  // 16 · banner · paper
  { eb: '[ public safety ]', head: 'Compassion without accountability is <em>not public safety</em>', icon: 'shield' },
  // 17 · list · navy
  { eb: '[ where mark stands ]', head: 'Mark’s <em>direction.</em>', items: ['Opportunity', 'Accountability', 'Public safety', 'Strong schools', 'Economic growth', 'Individual freedom'], icon: 'flag' },
  // 18 · list · paper
  { eb: '[ two philosophies ]', head: 'Socialism means <em>more government control.</em>', items: ['More taxes.', 'More bureaucracy.', 'More centralized power.', 'Less freedom for families and small businesses.'], icon: 'capitol' },
  // 19 · stripeField · navy
  { eb: '[ schools ]', head: 'Schools should prepare students for <em>real life.</em>', body: 'Reading. Math. Science. Civics. Discipline. Career readiness. Parent transparency. That is where the focus should be.', icon: 'book' },
  // 20 · stripeField · paper
  { eb: '[ ask mark ]', head: 'Mark is <em>listening.</em>', body: 'Costs, schools, safety, and small-business pressure. What issue matters most to you?', icon: 'heartplus' },
]
