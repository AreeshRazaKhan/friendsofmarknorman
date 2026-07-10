// Legal entity used everywhere A2P 10DLC / TCR / TCPA requires the registered
// business name, plus the canonical Oregon committee + PAC filing values that
// every other surface (disclosure line, FAQ, footer, Privacy Policy, Terms of
// Service) must match. Single source of truth — update once here when the
// client confirms the real filing data, and every consumer follows.
export const LEGAL = {
  entity: 'Friends of Mark Norman',
  // TODO: replace with the real PAC number from the client's filing.
  pacId: '24927',
  // TODO: replace with the real Oregon committee ID from the client's filing.
  committeeId: 'XXX',
  state: 'Oregon',
  email: 'mark@markfororegon.com',
  // No separate privacy@ inbox is provisioned yet — privacy/access/deletion
  // requests route to the candidate's mailbox until that's set up.
  privacyEmail: 'mark@markfororegon.com',
  phone: '+1 971-278-6520',
  phoneTel: '+19712786520',
  address: 'PO Box 122, Beaverton, OR 97075',
  effectiveDate: 'May 5, 2026',
  programName: 'Friends of Mark Norman SMS Program',
}

export const CAMPAIGN = {
  candidate: 'Mark Norman',
  office: 'Oregon House District 27',
  district: 'HD-27',
  party: 'Republican',
  cycle: '2026',
  tagline: 'Service · Solutions · Accountability',
  domain: 'markfororegon.com',
  email: 'mark@markfororegon.com',
  phone: '+1 971-278-6520',
  mailing: 'PO Box 122 · Beaverton, OR 97075',
  donateUrl:
    'https://secure.winred.com/friends-of-mark-norman/donate-today?sc=winred-directory&money_bomb=false&recurring=false',
  disclosure: `Paid for by ${LEGAL.entity} PAC #${LEGAL.pacId}`,
}

// Build a tier-specific donate URL. Falls back to the base donateUrl
// when no amount is provided. Handles either `?`- or `&`-prefixed
// appends so the helper is robust if the base URL ever changes.
export const buildDonateUrl = (amount) => {
  const base = CAMPAIGN.donateUrl
  if (!amount) return base
  return `${base}${base.includes('?') ? '&' : '?'}amount=${amount}`
}

export const ELEVATOR_PITCH =
  'Mark Norman is running for Oregon House District 27, bringing decades of service in the Navy, veterinary medicine, and small business to the state. He is focused on bringing practical decisions, responsible government, and everyday affordability for the people of Oregon.'

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/ask-mark', label: 'Ask Mark' },
  { href: '/contact', label: 'Contact' },
]

export const SOCIAL_LINKS = [
  {
    code: 'FB',
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61589031000348',
  },
  {
    code: 'IG',
    name: 'Instagram',
    href: 'https://www.instagram.com/markfororhd27/',
  },
  {
    code: 'X',
    name: 'X',
    href: 'https://x.com/MarkForHD27',
  },
  {
    code: 'TT',
    name: 'TikTok',
    href: 'https://www.tiktok.com/@gmnorman99',
  },
]

export const PILLARS = [
  {
    number: '01',
    name: 'Affordability',
    headline: 'Costs should be <em>manageable.</em>',
    summary:
      'Right now, too many households are adjusting their lives around rising expenses. The priority is easing pressure.',
  },
  {
    number: '02',
    name: 'Education',
    headline: 'Kids need <em>strong schooling.</em>',
    summary:
      'Students need strong fundamentals and a system that prepares them for real opportunities with parents fully in the loop.',
  },
  {
    number: '03',
    name: 'Accountability',
    headline: 'The public deserves <em>transparency.</em>',
    summary:
      'Public resources need careful oversight. People should be able to see where money goes and what it produces.',
  },
]

export const ISSUES = [
  {
    slug: 'affordability',
    icon: '$',
    title: 'Affordability',
    eyebrow: 'Issue 01',
    summary:
      'Households across District 27 are carrying more weight than they should. Housing, utilities, and daily-living costs keep rising. The goal: make it easier to live and work here.',
    bullets: [
      'Ensure state spending is controlled and transparent.',
      'Oppose unnecessary tax and fee increases.',
      'Lift obstacles to housing affordability.',
      'Revisit policies that raise everyday expenses.',
      'Help small businesses stay viable and provide jobs.',
    ],
    personal:
      'After nearly 30 years as a veterinarian and small-business owner, I have watched ordinary families struggle with everyday expenses. I\'ve seen firsthand how inflation, energy costs, insurance, and taxes hit working people hardest.',
  },
  {
    slug: 'education',
    icon: 'A',
    title: 'Education',
    eyebrow: 'Issue 02',
    summary:
      'Schools should help students build strong skills and real confidence for the future. Parents should know how their schools are doing and have a voice in the process.',
    bullets: [
      'Set and maintain high standards of academic achievement.',
      'Prioritize reading, math, science, and career readiness.',
      'Keep parents informed and involved.',
      'Increase opportunities for students to enter technical fields.',
      'Direct funding toward student achievement.',
    ],
    personal:
      'As a parent and a longtime employer, I see how much strong schools matter — for kids preparing for adulthood and for the businesses and communities counting on them.',
  },
  {
    slug: 'accountability',
    icon: '✓',
    title: 'Accountability',
    eyebrow: 'Issue 03',
    summary:
      'Trust is built when decisions are transparent and results are visible. That applies to budgets, programs, and public safety — and Oregonians deserve that.',
    bullets: [
      'Improve independent review of spending.',
      'Improve transparency across agencies.',
      'Support recruitment in law enforcement.',
      'Focus on safe, stable communities.',
      'Evaluate programs based on results, not size.',
    ],
    personal:
      'In military, veterinary, and nonprofit leadership, accountability has always mattered. Whether managing budgets or caring for patients, results were expected — government should be no different.',
  },
]

export const ABOUT_META = [
  { label: 'Service', value: 'U.S. Navy', detail: '22 years active and reserve' },
  { label: 'Practice', value: 'Veterinary medicine', detail: '30 years · still operating in Washington County' },
  { label: 'Family', value: '4 dogs', detail: 'Doug the sheepadoodle leads the pack' },
  { label: 'Based', value: 'Washington County', detail: '25 years in Oregon' },
]

export const ABOUT_STATS = [
  { number: '22', descriptor: 'Year U.S. Navy Veteran' },
  { number: '30', descriptor: 'Years in Practice' },
  { number: '25', descriptor: 'Years in District' },
  { number: '4', descriptor: 'Dogs (Doug Leads)' },
]

export const ABOUT_STORY = [
  'This campaign did not start with a political plan. It started with conversations. For years, Mark observed and listened to people talking about managing budgets and everyday challenges. Housing costs. Utility bills. Insurance.',
  'As a veterinarian, Mark has worked with families during stressful and emotional moments. As a small-business owner, he has dealt with payroll, regulations, unexpected expenses, and the reality that problems do not solve themselves. During his Navy service, he learned that preparation, sound judgment, and accountability matter, especially when decisions have real consequences.',
  'Those experiences taught Mark a simple approach to leadership:',
]

export const ABOUT_CREED =
  'Listen carefully. Study the challenge. Ask hard questions. Understand the objective. Develop a plan.'

export const ABOUT_STORY_CLOSE =
  'Mark decided to run because too many decisions coming out of Salem seemed disconnected from the way working families and local businesses actually live and operate. He believes Oregon needs representatives who understand everyday pressures and are prepared to do the work required to address them.'

export const FAQS = [
  {
    q: 'Who is Mark Norman?',
    a: 'Mark is a Navy veteran, longtime veterinarian, and small-business owner running for Oregon House District 27. He\'s spent nearly 30 years in Washington County. He\'s a husband, a father, owner of four dogs (two of them rescues), and a man who built a career observing and solving real problems.',
  },
  {
    q: 'Why is he running?',
    a: 'Too many people feel ignored by the decisions being made in Salem, especially around costs, schools, and public safety. Mark is running to bring practical thinking, accountability, and real-world experience into those decisions.',
  },
  {
    q: 'What district is HD-27?',
    a: 'It includes parts of unincorporated Portland, Beaverton, and surrounding areas in Washington County.',
  },
  {
    q: 'What are his top priorities?',
    a: 'Lowering the cost of living, strengthening education outcomes, and bringing back accountability in how public resources are managed.',
  },
  {
    q: 'Has he held office before?',
    a: 'No. This is a citizen campaign. It is built on real experience outside politics.',
  },
  {
    q: 'How can I help?',
    a: 'Donate, volunteer, host a small event, or simply stay informed and share information with others. Every action of yours helps build momentum.',
  },
  {
    q: 'How are donations used?',
    a: 'Every dollar supports direct outreach conversations with voters across the district through field work, events, and communication.',
  },
  {
    q: 'Who runs the campaign?',
    a: `${LEGAL.entity} PAC (#${LEGAL.pacId}), a registered committee in Oregon.`,
  },
]

export const DONATION_TIERS = [
  { amount: 50, label: '$50' },
  { amount: 100, label: '$100' },
]

export const ABOUT_BLOCKS = [
  {
    number: '01',
    eyebrow: 'Roots',
    title: 'Small-town roots. Oregon home.',
    body: 'Mark was born in Iowa City and raised in Keokuk, Iowa. As a boy he explored the neighborhood with his older sister — she on her bicycle, Mark trailing on his tricycle — learning early to stay curious, understand the boundaries, and never fear what he did not yet know. He eventually made his way to Washington County, drawn by Oregon\'s natural beauty, independent spirit, and opportunity for small-business owners. He built his career here, established his veterinary practice here, and made Oregon home.',
  },
  {
    number: '02',
    eyebrow: 'Service',
    title: 'Twenty-two years of Navy service.',
    body: 'Mark entered the United States Naval Academy in 1976 and was commissioned as an officer, serving with the Pacific Fleet during the Cold War. As his responsibilities grew, he qualified as a Tactical Action Officer — understanding complex situations and acting on behalf of the commanding officer when immediate decisions were necessary. There was no time for political theater or passing responsibility to someone else. You studied. You prepared. You understood the challenge. And when the moment came, you made a decision. Across twenty-two combined years of active and reserve service, Mark learned that leadership must be calm, informed, and accountable.',
  },
  {
    number: '03',
    eyebrow: 'Practice',
    title: 'Twenty-eight years in veterinary medicine.',
    body: 'After leaving active Navy service, Mark pursued another form of service. He earned his Doctor of Veterinary Medicine from Iowa State University and spent twenty-eight years owning and operating a veterinary practice in Washington County, and continues to work part-time as a relief veterinarian. Veterinary medicine is not only about treating animals — it is about helping people. Families arrive worried and uncertain, needing someone who will listen carefully, explain the situation truthfully, and help them make the best decision. Those conversations taught Mark that trust cannot be demanded; it must be earned through honesty, competence, and compassion — and gave him firsthand experience with the challenges facing Oregon\'s small businesses.',
  },
  {
    number: '04',
    eyebrow: 'Why',
    title: 'Stepping forward with a practical plan.',
    body: 'Mark did not spend years planning to run for office. He stepped forward because too many Oregonians feel their concerns are being ignored — families working harder to keep up with everyday expenses, small-business owners carrying growing costs and uncertainty, parents worried about schools, safety, and the opportunities their children will inherit. Mark believes Oregon can do better, but only when its leaders pay attention to how their decisions affect real people. He is running to bring practical judgment, responsible government, and real-world experience to Salem. Not more political performance. Better preparation. Better decisions. Greater accountability.',
  },
]

export const ABOUT_PERSON = [
  'Mark\'s dogs remain convinced that he has everything figured out. Mark is less certain.',
  'He remembers the mistakes he has made, the moments when he spoke instead of listening, and the occasions when the answer was directly in front of him. That awareness has made him a better listener and a more thoughtful leader.',
  'Mark does not believe elected officials should pretend to have every answer. He believes they should listen carefully, read the fine print, ask difficult questions, and be honest when something is not working.',
  'His dogs may continue to overestimate him. Oregonians can expect him to remain accountable.',
]

export const ABOUT_PILLARS = [
  {
    number: '01',
    name: 'Prepared Leadership',
    body: 'Mark approaches public policy the same way he approached responsibility in the Navy: understand the situation, examine the available information, and prepare before acting.',
  },
  {
    number: '02',
    name: 'Real-World Experience',
    body: 'His perspective comes from military service, veterinary medicine, small-business ownership, and decades of conversations with Washington County families.',
  },
  {
    number: '03',
    name: 'Accountability Without Excuses',
    body: 'Mark believes elected officials should explain their decisions clearly, accept responsibility for the results, and change course when something is not working.',
  },
]

export const ABOUT_QUOTE = {
  text: 'Pay attention. Study the horizon. Ask questions. Understand the objective. Then develop a plan.',
  attribution: 'Mark Norman',
}

export const CONTACT_METHODS = [
  {
    label: 'General',
    value: 'mark@markfororegon.com',
    href: 'mailto:mark@markfororegon.com',
    detail: 'For volunteers, supporters, and questions.',
  },
  {
    label: 'Phone',
    value: '+1 971-278-6520',
    href: 'tel:+19712786520',
    detail: 'Mon – Fri · 9 AM – 5 PM PT.',
  },
  {
    label: 'Mail',
    value: 'PO Box 122 · Beaverton, OR 97075',
    href: 'https://maps.app.goo.gl/dJCbf1zmxuAYEwP89',
    detail: 'For checks and physical mail.',
  },
]

// Oregon House District 27 ZIP code list. Used to flag in-district vs
// out-of-district records on form submissions so the CRM workflow can
// route them appropriately. The starter list below covers the Beaverton
// and Cedar Hills core of the district; edge ZIPs with partial overlap
// (e.g. 97003, 97123, 97221, 97223) are intentionally excluded until
// confirmed against the most recent legislative boundary map.
// TODO: confirm canonical HD-27 ZIP list with the campaign team.
export const HD27_ZIPS = [
  '97005', // Beaverton (central)
  '97006', // Beaverton / Aloha
  '97007', // Beaverton / Aloha
  '97008', // Beaverton
  '97078', // Beaverton
  '97225', // Cedar Hills / West Slope
  '97229', // Cedar Mill / Cedar Hills
]

export const VOLUNTEER_HELP_OPTIONS = [
  'Host a Fundraiser',
  'Phone Banking',
  'Volunteer Coordination',
  'Digital/Social Media',
  'Door Knocking',
  'Host a Meet & Greet',
  'Event Planning',
  'Media',
]

export const VOLUNTEER_ROLES = [
  {
    title: 'Phone Banking',
    body: 'Talk with voters from home or campaign events using simple training and scripts.',
    commitment: '1 – 3 hours · evenings',
  },
  {
    title: 'Door Knocking',
    body: 'Walk neighborhoods with another volunteer and have real conversations with voters.',
    commitment: '2 – 4 hours · weekends',
  },
  {
    title: 'Host a Meet & Greet',
    body: 'Invite a few friends and neighbors over for a casual conversation with Mark.',
    commitment: '1 evening · once',
  },
  {
    title: 'Host a Fundraiser',
    body: 'Help bring supporters together for a focused campaign event in your community.',
    commitment: '1 evening · once',
  },
  {
    title: 'Digital/Social Media',
    body: 'Help share campaign updates online and connect with voters across the district.',
    commitment: 'Flexible · weekly',
  },
  {
    title: 'Volunteer Coordination',
    body: 'Assist with scheduling, organizing volunteers, and preparing campaign materials.',
    commitment: 'Flexible · weekly',
  },
  {
    title: 'Event Planning',
    body: 'Support logistics for community events, town halls, and campaign gatherings.',
    commitment: 'Project-based',
  },
  {
    title: 'Media',
    body: 'Photo, video, design, writing, or creative support for the campaign team.',
    commitment: 'Project-based',
  },
]

export const AVAILABILITY_OPTIONS = [
  '1-2 hours/week',
  '3-5 hours/week',
  '5-10 hours/week',
  '10-20 hours/week',
  'Full-time',
  'Remote Help Only',
]

export const CAMPAIGN_EXPERIENCE_LEVELS = [
  'Yes, local (school board, county commissioner, etc.)',
  'Yes, state level (House, Senate, State Assembly, etc.)',
  'Yes, statewide (AG, Governor, etc.)',
  'Yes, federal (Congressional)',
  'Yes, federal (Presidential)',
  'No',
]

export const OREGON_REGIONS = [
  'Portland Metro',
  'Willamette Valley',
  'Oregon Coast',
  'Central Oregon',
  'Eastern Oregon',
  'Southern Oregon',
]

export const OREGON_COUNTIES = [
  'Baker',
  'Benton',
  'Clackamas',
  'Clatsop',
  'Columbia',
  'Coos',
  'Crook',
  'Curry',
  'Deschutes',
  'Douglas',
  'Gilliam',
  'Grant',
  'Harney',
  'Hood River',
  'Jackson',
  'Jefferson',
  'Josephine',
  'Klamath',
  'Lake',
  'Lane',
  'Lincoln',
  'Linn',
  'Malheur',
  'Marion',
  'Morrow',
  'Multnomah',
  'Polk',
  'Sherman',
  'Tillamook',
  'Umatilla',
  'Union',
  'Wallowa',
  'Wasco',
  'Washington',
  'Wheeler',
  'Yamhill',
]

// Events are fetched from GHL custom objects at runtime via fetchGHLEvents()
// in src/lib/ghl.js. Do not add a static EVENTS array here — see
// .claude/rules/ghl-events-integration.md for the integration contract.
