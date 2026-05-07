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
  'Mark Norman is running for Oregon House District 27, bringing decades of service in the Navy, veterinary medicine, and small business to the state. He is focused on bringing practical decisions, responsible government, and everyday affordability for the people of Oregon.'

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
      'Households across District 27 are carrying more weight than they should. The cost of housing, utilities, and daily living is on the rise. The goal should be clear: make it easier to live and work here.',
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
  'This campaign didn\'t start with a political plan. It all started with conversations. For years, Mark observed and listened to people talking about managing budgets and everyday challenges. Housing costs. Utility bills. Insurance. Small businesses trying to stay ahead while families stretched every paycheck further than before.',
  'Many decisions coming out of Salem didn\'t seem grounded in how people actually live. That mattered to him because most of his life has been spent in positions where responsibility is real. The Navy teaches discipline and accountability. Veterinary medicine teaches calm decision-making and trust. Running a business teaches that problems don\'t fix themselves.',
  'That\'s when he realized the leadership system wasn\'t working for everyday people, and decided to step forward and lead.',
]

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
    a: 'Friends of Mark Norman PAC (#24927), a registered committee in Oregon.',
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
    title: 'A local life built over time.',
    body: 'Mark came to Washington County almost 30 years ago and established his life here through his career, his community involvement, and a long history of relationships with the people around him. Eventually, Oregon became home.',
  },
  {
    number: '02',
    eyebrow: 'Service',
    title: 'Twenty-two years in the Navy.',
    body: 'Gained a solid understanding of what it means to be steadfast, to be clear, and to make decisions with accountability — through more than 20 years in the Navy. Great leadership starts with listening attentively and remaining calm during challenging moments.',
  },
  {
    number: '03',
    eyebrow: 'Practice',
    title: 'Twenty-eight years in veterinary medicine.',
    body: 'Veterinary medicine is about more than animals. It\'s about trust. Families approach you with concerns, stress, and a need for truthful answers. Those conversations had a lasting impact on Mark\'s outlook on responsibility and service.',
  },
  {
    number: '04',
    eyebrow: 'Why',
    title: 'Stepping forward with a plan.',
    body: 'Mark didn\'t spend years planning to run for office. It was inspired by the realization that more people were becoming frustrated, unheard, and concerned about where Oregon was going — and that it was time to help rather than just talk about it.',
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
