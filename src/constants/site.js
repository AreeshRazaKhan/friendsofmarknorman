export const CAMPAIGN = {
  candidate: 'Mark Norman',
  office: 'Oregon House District 27',
  district: 'HD-27',
  party: 'Republican',
  cycle: '2026',
  tagline: 'Service · Solutions · Accountability',
  domain: 'MarkNormanForOregon.com',
  email: 'info@marknormanfororegon.com',
  phone: '(503) 555-0127',
  mailing: 'PO Box 0000 · Beaverton, OR 97000',
  pacId: '24927',
  committee: 'CI-0189',
  disclosure: 'Paid for by Friends of Mark Norman PAC #24927',
}

// Legal entity used everywhere A2P 10DLC / TCR / TCPA requires the registered
// business name. Must match the CP 575 / state filing exactly. Do not use a
// DBA or candidate-only name in any of these compliance touch-points.
export const LEGAL = {
  entity: 'Friends of Mark Norman',
  pacId: '24927',
  committeeId: 'CI-0189',
  state: 'Oregon',
  email: 'info@marknormanfororegon.com',
  privacyEmail: 'privacy@marknormanfororegon.com',
  phone: '(503) 555-0127',
  phoneTel: '+15035550127',
  address: 'PO Box 0000, Beaverton, OR 97000',
  effectiveDate: 'May 5, 2026',
  programName: 'Friends of Mark Norman SMS Program',
}

export const ELEVATOR_PITCH =
  'I\'m Mark Norman — running for Oregon House District 27 because families here deserve practical leadership focused on affordability, accountability, and common sense. Navy veteran. Veterinarian. Small-business owner. Nearly 30 years of solving problems and making responsible decisions. Not a career politician — just someone who believes Oregon can do better, and is willing to step forward to help.'

export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/ask-mark', label: 'Ask Mark' },
  { href: '/contact', label: 'Contact' },
]

export const PILLARS = [
  {
    number: '01',
    name: 'Affordability',
    headline: 'Lower the cost of living. <em>Today.</em>',
    summary:
      'Stop piling new taxes, fees, and mandates on working families and small businesses.',
  },
  {
    number: '02',
    name: 'Education',
    headline: 'Strong standards. <em>Real results.</em>',
    summary:
      'Reading, math, science, career prep — and parents respected as partners in their kids\' education.',
  },
  {
    number: '03',
    name: 'Accountability',
    headline: 'Spend it like <em>your money.</em>',
    summary:
      'Independent audits. Real oversight. A government that listens to the people paying the bills.',
  },
]

export const ISSUES = [
  {
    slug: 'affordability',
    icon: '$',
    title: 'Affordability',
    eyebrow: 'Issue 01',
    summary:
      'Oregon families are being squeezed by rising taxes, fees, utility costs, housing prices, and inflation. Government should focus on making life more affordable — not piling on the bill.',
    bullets: [
      'Responsible budgeting and real transparency in state spending.',
      'Oppose unnecessary tax and fee increases on working families.',
      'Regulatory reform that lowers housing construction costs and increases supply.',
      'Review energy and climate policies that drive consumer costs higher.',
      'Encourage small-business growth and family-wage jobs.',
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
      'Every child deserves a quality education focused on academic excellence — literacy, math, science, and real preparation for adulthood. Parents are partners, and schools must be accountable for results.',
    bullets: [
      'Restore strong academic standards and measurable outcomes.',
      'Refocus on reading, math, science, and career preparation.',
      'Transparency and meaningful parental involvement in schools.',
      'Support vocational training, skilled trades, and CTE pathways.',
      'Direct education funding to classrooms and student achievement.',
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
      'Oregonians deserve a government that is transparent, fiscally responsible, and focused on core priorities — public safety, infrastructure, and services that work. Trust is earned by listening and spending taxpayer dollars carefully.',
    bullets: [
      'Independent audits and stronger oversight of state spending.',
      'Real transparency in state agencies and programs.',
      'Support law enforcement recruitment and retention.',
      'Prioritize community safety and reduce crime.',
      'Measure outcomes — not the size of the bureaucracy.',
    ],
    personal:
      'In military, veterinary, and nonprofit leadership, accountability has always mattered. Whether managing budgets or caring for patients, results were expected — government should be no different.',
  },
]

export const ABOUT_META = [
  { label: 'Service', value: 'U.S. Navy', detail: '22 years active and reserve' },
  { label: 'Practice', value: 'Veterinary medicine', detail: '28 years · still operating in Washington County' },
  { label: 'Family', value: '4 dogs', detail: 'Doug the sheepadoodle leads the pack' },
  { label: 'Based', value: 'Washington County', detail: '30 years in Oregon' },
]

export const ABOUT_STATS = [
  { number: '22', descriptor: 'Years U.S. Navy' },
  { number: '28', descriptor: 'Years in practice' },
  { number: '30', descriptor: 'Years in district' },
  { number: '4', descriptor: 'Dogs (Doug leads)' },
]

export const ABOUT_STORY = [
  'The decision to run came gradually. Then one conversation stayed with me — a hardworking middle-class family doing everything right, but feeling further behind every year. Rising utility bills. Insurance. Fuel. Housing.',
  'They no longer believed anyone in Salem understood the impact those decisions were having on everyday lives. I had spent my whole adult life in service — Navy, veterinary medicine, nonprofit work — stepping forward when there was a problem to solve.',
  'So I asked myself whether I was willing to keep watching, or willing to help. I chose to help.',
]

export const FAQS = [
  {
    q: 'Who is Mark Norman?',
    a: 'A Navy veteran, longtime veterinarian, and small-business owner running for Oregon House District 27. Nearly 30 years in Washington County. Christian. Husband. Father. Owner of four dogs — two of them rescues.',
  },
  {
    q: 'Why is he running?',
    a: 'Because Oregon families deserve practical leadership focused on affordability, accountability, and common sense — and because the state needs more citizen legislators with real-world experience outside politics.',
  },
  {
    q: 'What district is HD-27?',
    a: 'Parts of unincorporated Portland, unincorporated Beaverton, and unincorporated Washington County.',
  },
  {
    q: 'What are his top three priorities?',
    a: 'Affordability and the cost of living. Education and academic excellence. Accountability and public safety. Detail on each is in the platform section above.',
  },
  {
    q: 'Has he held office before?',
    a: 'No. Mark is a citizen candidate — Navy veteran, veterinarian, and small-business owner — running because he believes Oregon needs leaders with real-world experience outside politics.',
  },
  {
    q: 'How can I help?',
    a: 'Donate, volunteer, host a meet-and-greet, put up a yard sign, or simply share this site with a neighbor. Sign up below and the campaign team will reach out.',
  },
  {
    q: 'How are donations used?',
    a: 'Every contribution funds direct voter contact in HD-27 — door-knocking, mailers, digital outreach, and events. The campaign reports all activity to the Oregon Secretary of State.',
  },
  {
    q: 'Who runs the campaign?',
    a: 'Friends of Mark Norman PAC (#24927), a registered campaign committee in the State of Oregon (CI-0189).',
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
    title: 'A neighbor, before a candidate.',
    body: 'Mark moved to Washington County nearly 30 years ago for the same reasons most Oregonians did — beauty, opportunity, strong communities, and the independent spirit. He built a life here. Built a business here. Raised dogs here.',
  },
  {
    number: '02',
    eyebrow: 'Service',
    title: 'Twenty-two years in the Navy.',
    body: 'Active and reserve. Combined service taught him the discipline of solving problems under pressure, the responsibility of managing budgets that aren\'t yours, and the basic posture of accountability — measure results, not effort.',
  },
  {
    number: '03',
    eyebrow: 'Practice',
    title: 'Twenty-eight years in veterinary medicine.',
    body: 'Owner-operator of a small business in Washington County. Thousands of conversations across the exam-room counter with families balancing rising costs, careful decisions, and the ordinary worry of doing right by the people you love.',
  },
  {
    number: '04',
    eyebrow: 'Why',
    title: 'Stepping forward, not stepping up.',
    body: 'Politics wasn\'t the plan. After conversations with neighbors who felt unheard, Mark realized the choice was simple: keep watching, or help. He chose to help. That is the entire premise of this campaign.',
  },
]

export const CONTACT_METHODS = [
  {
    label: 'General',
    value: 'info@marknormanfororegon.com',
    href: 'mailto:info@marknormanfororegon.com',
    detail: 'For volunteers, supporters, and questions.',
  },
  {
    label: 'Press',
    value: 'press@marknormanfororegon.com',
    href: 'mailto:press@marknormanfororegon.com',
    detail: 'Media requests and statements.',
  },
  {
    label: 'Phone',
    value: '(503) 555-0127',
    href: 'tel:+15035550127',
    detail: 'Mon – Fri · 9 AM – 5 PM PT.',
  },
  {
    label: 'Mail',
    value: 'PO Box 0000 · Beaverton, OR 97000',
    href: null,
    detail: 'For checks and physical mail.',
  },
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
    body: 'Call neighbors from home or HQ. Scripts, training, and good company provided.',
    commitment: '1 – 3 hours · evenings',
  },
  {
    title: 'Door Knocking',
    body: 'Walk a precinct with a teammate. The single most effective thing a campaign can do.',
    commitment: '2 – 4 hours · weekends',
  },
  {
    title: 'Host a Meet & Greet',
    body: 'Open your home or yard for an hour with Mark and a small group of neighbors.',
    commitment: '1 evening · once',
  },
  {
    title: 'Host a Fundraiser',
    body: 'Bring friends together for a focused giving event — high-impact, easy with our help.',
    commitment: '1 evening · once',
  },
  {
    title: 'Digital/Social Media',
    body: 'Help us reach voters online. Content, posts, ads, and sharing — at home, on your time.',
    commitment: 'Flexible · weekly',
  },
  {
    title: 'Volunteer Coordination',
    body: 'Help the back-office: roster, scheduling, lit drops, event prep, light writing.',
    commitment: 'Flexible · weekly',
  },
  {
    title: 'Event Planning',
    body: 'Logistics for town halls, coffees, fundraisers, and field events.',
    commitment: 'Project-based',
  },
  {
    title: 'Media',
    body: 'Photo, video, design, copy. Tell us what you can do — we need it.',
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
  'None',
  'Some Volunteering',
  'Regular Volunteer',
  'Campaign Staff',
  'Campaign Management',
  'Elected/Appointed Office',
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

export const EVENTS = [
  {
    slug: 'beaverton-meet-and-greet-may',
    title: 'Beaverton meet-and-greet',
    eyebrow: 'Town hall',
    date: '2026-05-22',
    time: '6:30 PM – 8:00 PM PT',
    location: 'Beaverton Library — Cathy Stanley Room',
    address: '12375 SW 5th St, Beaverton, OR 97005',
    summary:
      'A neighborhood conversation with Mark — affordability, schools, and what voters want from House District 27. Coffee, cookies, no podium.',
    description:
      'Open to anyone who lives in or near House District 27. Mark will spend a few minutes on why he\'s running, then turn the floor over for questions. Bring a friend, a neighbor, or a skeptical relative. Childcare available with 24h notice.',
    rsvpRequired: true,
  },
  {
    slug: 'aloha-coffee-with-mark-june',
    title: 'Coffee with Mark — Aloha',
    eyebrow: 'Coffee',
    date: '2026-06-07',
    time: '9:00 AM – 10:30 AM PT',
    location: 'Insomnia Coffee — Aloha',
    address: '5389 SW 185th Ave, Aloha, OR 97078',
    summary:
      'Drop in for coffee with the candidate. No agenda — just a conversation about what HD-27 families need from Salem.',
    description:
      'A casual stop on the campaign trail. Mark will be there for ninety minutes; come for ten or for the whole thing. Bring questions, complaints, or both.',
    rsvpRequired: false,
  },
  {
    slug: 'small-business-roundtable-june',
    title: 'Small-business roundtable',
    eyebrow: 'Roundtable',
    date: '2026-06-19',
    time: '5:30 PM – 7:00 PM PT',
    location: 'Washington County Chamber of Commerce',
    address: '12655 SW Center St, Beaverton, OR 97005',
    summary:
      'A working roundtable for small-business owners across HD-27 — costs, regulation, hiring, and what would actually help.',
    description:
      'A working session, not a stump speech. Bring a problem you want fixed and the kind of policy that would fix it. Hosted with the local Chamber.',
    rsvpRequired: true,
  },
  {
    slug: 'door-knocking-launch-july',
    title: 'Door-knocking kickoff',
    eyebrow: 'Field',
    date: '2026-07-12',
    time: '10:00 AM – 1:00 PM PT',
    location: 'Campaign HQ — meet at the front door',
    address: '12200 SW Allen Blvd, Beaverton, OR 97005',
    summary:
      'Our first big door-knocking weekend. Training, lists, partners, lunch, water bottles. All you bring is comfortable shoes.',
    description:
      'No experience required. We\'ll pair you with a teammate, give you a tight script and a small turf, and send you off with a clipboard. Plan for a two-hour walk plus debrief.',
    rsvpRequired: true,
  },
]
