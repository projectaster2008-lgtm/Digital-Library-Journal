import { ArchiveEntry, BlueprintPhase } from '../types';

export interface CapitalAllocation {
  category: string;
  amount: number;
  description: string;
  iconName: string;
  notes: string;
}

export interface CareerYear {
  year: string;
  age: string;
  role: string;
  monthlySalaryPhp: number;
  monthlySavingsPhp: number;
  runningTotalPhp: number;
}

export interface BusinessSimulation {
  name: string;
  allocationPhp: number;
  bestCase: string;
  realisticCase: string;
  worstCase: string;
  rule: string;
}

export interface RiskItem {
  risk: string;
  mitigation: string;
  severity: 'High' | 'Medium' | 'Critical';
}

export interface TesdaCourseItem {
  year: string;
  course: string;
  code: string;
  hours: number;
  timing: string;
  purpose: string;
  aiRisk: string;
  roleInStack: string;
}

export interface RemoteWorkProjectItem {
  rank: number;
  project: string;
  whyItMatters: string;
  category: string;
}

export const tesdaLineup: TesdaCourseItem[] = [
  {
    year: 'Y1',
    course: 'EIM NC II — Electrical Installation and Maintenance',
    code: 'EIM-NC2',
    hours: 196,
    timing: 'Summer break',
    purpose: 'Power/electrical foundation. Verified in demand domestically and overseas (Saudi Arabia 2026 in-demand list).',
    aiRisk: '~15% (Very Low)',
    roleInStack: 'Install capability — physical foundation for trade work & Phase 6 facilities.',
  },
  {
    year: 'Y2',
    course: 'EPAS NC II — Electronic Products Assembly and Servicing',
    code: 'EPAS-NC2',
    hours: 260,
    timing: 'Summer break',
    purpose: 'Electronics assembly and diagnostic depth. Addresses documented shortage (56,605 workers in CALABARZON).',
    aiRisk: 'Low-Medium',
    roleInStack: 'Assemble & repair capability — board diagnostics, CCTV, device maintenance.',
  },
  {
    year: 'Y3',
    course: 'Technical Drafting NC II',
    code: 'DRAFT-NC2',
    hours: 148,
    timing: 'Summer break (148–206h range)',
    purpose: 'CAD literacy. Sketch wiring layouts, farm structures, restaurant floor plans for Phase 6 instead of hiring out.',
    aiRisk: 'Medium',
    roleInStack: 'Design capability — connective multiplier uniting electrical & building plans.',
  },
  {
    year: 'Y4 / post-grad',
    course: 'CSS NC II — Computer Systems Servicing',
    code: 'CSS-NC2',
    hours: 280,
    timing: 'Post-graduation (zero-slack)',
    purpose: 'Bridge to BSIT and IT infrastructure. Placed post-grad so zero academic deadlines compete with 280h.',
    aiRisk: 'Highest (~40%)',
    roleInStack: 'Digital bridge — paired with completed BSIT degree, never standalone.',
  },
];

export const remoteWorkPortfolio: RemoteWorkProjectItem[] = [
  {
    rank: 1,
    project: 'Excel double-entry accounting tracker (ABM + AI-built)',
    whyItMatters: 'The strongest, rarest asset on the list. Real ledger/journal logic, auto-generating financial statements.',
    category: 'Flagship Asset',
  },
  {
    rank: 2,
    project: 'Cafe landing page mockup',
    whyItMatters: 'Proves frontend range. A commoditized category on its own — pairs with a maintenance/booking flow to stand out.',
    category: 'Web Interface',
  },
  {
    rank: 3,
    project: 'Notion template / setup',
    whyItMatters: 'An underserved niche; solopreneurs need this and rarely find someone who does it well.',
    category: 'Productivity Systems',
  },
  {
    rank: 4,
    project: 'Light novel website(s)',
    whyItMatters: 'Best proof of raw coding skill and follow-through. A proof piece, not a sellable service on its own.',
    category: 'Full Application',
  },
  {
    rank: 5,
    project: 'Canva design work / lakbay sanaysay (100+ pages)',
    whyItMatters: 'A strong discipline story, weaker commercial signal on its own. Supporting piece.',
    category: 'Design & Publishing',
  },
  {
    rank: 6,
    project: 'Edited film / video project',
    whyItMatters: 'Bonus only, unless video editing becomes its own service line later.',
    category: 'Media Production',
  },
];

export const remotePayTiers = [
  { stage: 'Generic VA (no specialization)', pay: '₱8,000 – ₱15,000', note: 'Commoditized competition' },
  { stage: 'Specialized VA, first client (month 1–2)', pay: '₱10,000 – ₱15,000', note: 'Priced low on purpose, buying the first review' },
  { stage: 'Specialized VA, after 1 proven client (month 3+)', pay: '₱18,000 – ₱25,000', note: 'Standard retainer rate' },
  { stage: 'Realistic ceiling as full-time student', pay: '₱35,000 – ₱40,000', note: 'Needs 20–25 hrs/wk; conflicts with exams' },
];

export const timelineGlance = [
  { phase: '1 — The Foundation', years: 'Completed', age: '17–18', focus: 'SHS ABM Honors · Cash flow mindset' },
  { phase: '2 — The Freedom Gap', years: 'Jun–Jul 2026', age: '18', focus: 'Daily coding, calisthenics, 7h sleep floor' },
  { phase: '3 — The Foundation Build', years: '2026–2030', age: '18–22', focus: 'BSIT Degree, 4 TESDA trades, remote pipeline' },
  { phase: '4 — The Legal Entry', years: '2030', age: '22', focus: 'Direct Saudi IT visa, degree attested, SCE registered' },
  { phase: '5 — The Career Ascent', years: '2030–2035', age: '22–27/28', focus: '5-year IT ladder, ₱10.07M total capital target' },
  { phase: '6 — The Sovereign Legacy', years: '2035 onward', age: '27/28+', focus: 'Return to PH: Real estate, resto, farm' },
  { phase: '7 — Tech–Business Fusion', years: 'Ongoing', age: 'Born from Ph.6', focus: 'Internal tools turned to commercial B2B SaaS' },
];

export const blueprintPhases: BlueprintPhase[] = [
  {
    phaseNumber: 1,
    title: 'The Foundation',
    subtitle: 'Senior High School Honors (ABM Strand)',
    timeframe: 'Completed (2025–2026)',
    targetAge: 'Age 17–18',
    status: 'COMPLETED',
    what: 'Graduate senior high school with honors from the ABM (Accountancy, Business, and Management) strand.',
    why: 'To build a financial and structural mindset early, so a career is never viewed only as a wage — but as a mechanism for generating capital.',
    lessonLearned: 'Health and calisthenics were sacrificed to overworking during Grade 12. Correction: physical restoration is now a mandatory, non-negotiable input, not an optional extra.',
    keyMetrics: [
      { label: 'ABM Average', value: '94 (With Honors)' },
      { label: 'Accounting & Marketing', value: '98 Grade' },
      { label: 'Work Schedule', value: '7 AM–11 AM Merchandising + 12–5 PM Class' },
    ],
  },
  {
    phaseNumber: 2,
    title: 'The Freedom Gap',
    subtitle: 'Pre-College Self-Study & Routine-Building',
    timeframe: 'June–July 2026',
    targetAge: 'Age 18',
    status: 'IN_PROGRESS',
    what: 'Use the final month before college for daily self-study and routine-building — no formal academic pressure yet, maximum discipline while it’s still optional.',
    why: 'Not to finish a certificate. To overcome inertia, install a daily-practice habit before external deadlines force it, and walk into BSIT already thinking like a builder instead of a beginner.',
    howSteps: [
      'Tech prep: freeCodeCamp Responsive Web Design (HTML/CSS/JS), 2–3 focused hours daily.',
      'Health rebuild: 20–30 minutes of daily calisthenics, and a protected 7-hour sleep floor.',
      'The blank-canvas discipline: rebuild finished projects from memory before starting new ones.',
    ],
    correctionsMade: 'Original plan included a daily Japanese-language block for Japan route. Japan was replaced with Saudi Arabia direct IT entry. Freed hours folded into coding practice & physical rebuilding.',
    keyMetrics: [
      { label: 'Coding Practice', value: '2–3 Hours Daily' },
      { label: 'Calisthenics', value: '20–30 Mins Daily' },
      { label: 'Sleep Floor', value: 'Protected 7 Hours' },
    ],
  },
  {
    phaseNumber: 3,
    title: 'The Foundation Build',
    subtitle: 'College BSIT + 4-Course TESDA Lineup + Remote Income',
    timeframe: '2026–2030',
    targetAge: 'Age 18–22',
    status: 'UPCOMING',
    what: 'Complete the 4-year BSIT degree as the primary asset. Acquire EIM NC II, EPAS NC II, Technical Drafting NC II, and CSS NC II (884 total hours) as Philippines-based capability credentials, running a 6-project closed remote work pipeline.',
    why: 'Under Saudi legal system, only BSIT legally qualifies for the IT Specialist visa category. The physical trio (EIM, EPAS, Drafting) compounds during college into a design-build-repair stack, while CSS bridges to BSIT post-grad. Remote work provides ₱15k–₱25k/mo student income.',
    howSteps: [
      'TESDA Lineup: Y1 EIM (196h summer), Y2 EPAS (260h summer), Y3 Drafting (148–206h summer), Y4/post-grad CSS (280h post-grad).',
      'Remote Work Pipeline: Lead pitches with ABM double-entry Excel tracker; cap at 10–12 hrs/wk (₱15k–25k/mo target).',
      'Self-pace AWS Cloud Practitioner & CompTIA Security+ during downtime to differentiate degree.',
      'Business self-study: read financial statements of real Philippine companies (e.g. Jollibee Foods Corp).',
      'Degree attestation: initiate DFA and Saudi Embassy authentication during 4th year before graduation rush.',
      'Protect 6-hour sleep floor even during working-student evening schedule (3–9 PM class alongside morning merchandising).',
    ],
    keyMetrics: [
      { label: 'Primary Degree', value: '4-Year BSIT' },
      { label: 'TESDA Stack', value: '4 Trades (884 Hours)' },
      { label: 'Remote Target', value: '₱15,000–₱25,000 / mo' },
      { label: 'Target Certs', value: 'AWS Cloud + CompTIA Sec+' },
    ],
  },
  {
    phaseNumber: 4,
    title: 'The Legal Entry',
    subtitle: 'Saudi Arabia Direct IT Specialist Deployment',
    timeframe: '2030',
    targetAge: 'Age 22',
    status: 'UPCOMING',
    what: 'Enter Saudi Arabia directly as an IT professional — not as an electrician technician hoping to pivot later.',
    why: 'Under Saudi labor law, Iqama is tied to a single legal profession, and SCE registration is required. Working outside listed profession is a violation (Tastur) carrying deportation/blacklisting. Direct IT entry is 100% legal, and 0% expat wage tax means 100% of gross salary lands in the bank.',
    howSteps: [
      'Finish 4-year BSIT degree completely as the clean entry ticket.',
      'Formally attest degree with Saudi Embassy / DFA during final year.',
      'Leverage uncle’s supervisor position correctly: apply formally to an entry-level IT support or systems role.',
      'Enter on IT Specialist visa category with matching Iqama, contract, and job title.',
      'Trade skills (EIM, EPAS, Drafting, CSS) become internal super-power: direct cost-savers across Phase 6 setups.',
    ],
    keyMetrics: [
      { label: 'Visa Category', value: 'IT Specialist / Support' },
      { label: 'Legal Status', value: '100% SCE Clean & Attested' },
      { label: 'Tax Advantage', value: '0% Expat Income Tax on Wages' },
      { label: 'Savings Advantage', value: '+₱2.98M vs Electrician Path' },
    ],
  },
  {
    phaseNumber: 5,
    title: 'The Career Ascent',
    subtitle: '5-Year Disciplined IT Specialization',
    timeframe: '2030–2035',
    targetAge: 'Age 22–27/28',
    status: 'UPCOMING',
    what: 'Five years of disciplined IT work in Saudi Arabia, rising through certifications and experience toward cybersecurity or cloud infrastructure specialization.',
    why: 'To accumulate ₱10,076,050 in net capital without speculative debt, establishing sovereign financial security.',
    keyMetrics: [
      { label: 'Starting Salary', value: '₱94,250 / mo (Age 22)' },
      { label: 'Year 5 Salary', value: '₱275,500 / mo (Age 26)' },
      { label: 'Base Savings', value: '₱8,691,300' },
      { label: 'Bonuses & Gratuity', value: '₱1,384,750' },
      { label: 'Total Bank Balance', value: '₱10,076,050' },
    ],
  },
  {
    phaseNumber: 6,
    title: 'The Sovereign Legacy',
    subtitle: 'Return to Philippines & Generational Asset Deployment',
    timeframe: '2035 onward',
    targetAge: 'Age 28+',
    status: 'UPCOMING',
    what: 'Deploy Saudi capital into permanent generational assets — real estate, a restaurant, and a farm — while retiring the pressure on parents and building complete freedom.',
    why: 'To transition from active overseas labor into self-sustaining cash-flowing enterprises with an unbreakable safety floor.',
    keyMetrics: [
      { label: 'Real Estate Down', value: '₱1,500,000' },
      { label: 'Restaurant Capital', value: '₱1,200,000 (Opened Last)' },
      { label: 'Farm Initial', value: '₱800,000' },
      { label: 'Untouchable Buffer', value: '₱1,000,000' },
      { label: 'Reserve Capital', value: '₱5,576,050' },
    ],
  },
  {
    phaseNumber: 7,
    title: 'The Tech–Business Fusion',
    subtitle: 'Internal Systems to Commercial B2B SaaS',
    timeframe: 'Ongoing, born out of Phase 6',
    targetAge: 'Age 28–35+',
    status: 'ONGOING',
    what: 'Build the automation tools that run own Phase 6 businesses — then package and license them to other operators and OFW families facing the exact same problems.',
    why: 'Validated before sold. Solves lived problems first (rental tracking for OFWs, restaurant POS/inventory, farm livestock monitoring). ABM operator directing AI & modern tech.',
    keyMetrics: [
      { label: 'Core Products', value: 'OFW Rental Manager, Resto POS, Farm Ops' },
      { label: 'Identity', value: 'Tech-Literate Business Operator' },
      { label: 'Advantage', value: 'Zero-Guessing Market Validation' },
    ],
  },
];

export const saudiCareerSchedule: CareerYear[] = [
  { year: 'Year 1', age: 'Age 22', role: 'Entry IT Support', monthlySalaryPhp: 94250, monthlySavingsPhp: 73225, runningTotalPhp: 878700 },
  { year: 'Year 2', age: 'Age 23', role: 'IT Support, proven', monthlySalaryPhp: 116000, monthlySavingsPhp: 92800, runningTotalPhp: 1992300 },
  { year: 'Year 3', age: 'Age 24', role: 'Mid-Junior + certs', monthlySalaryPhp: 159500, monthlySavingsPhp: 133400, runningTotalPhp: 3593100 },
  { year: 'Year 4', age: 'Age 25', role: 'Solid Mid-Level', monthlySalaryPhp: 217500, monthlySavingsPhp: 185600, runningTotalPhp: 5820300 },
  { year: 'Year 5', age: 'Age 26', role: 'Cyber / Cloud Specialist', monthlySalaryPhp: 275500, monthlySavingsPhp: 239250, runningTotalPhp: 8691300 },
];

export const saudiExtras = [
  { item: 'Annual Flight Allowance (5 Years)', amountPhp: 145000 },
  { item: 'Bi-annual Performance Bonuses', amountPhp: 551000 },
  { item: 'End-of-Service Gratuity (Saudi Labor Law — ½ month/yr)', amountPhp: 688750 },
];

export const capitalAllocations: CapitalAllocation[] = [
  {
    category: 'Real Estate Down Payment',
    amount: 1500000,
    description: '₱3.0M condo in secondary CBD, ₱1.5M down + ₱1.5M bank loan at 7% over 15 yrs (₱13,500/mo amortization).',
    iconName: 'Building',
    notes: 'Buy near confirmed transit / BPO hubs. 5.4%–6.6% expected yield.',
  },
  {
    category: 'Casual Filipino Restaurant',
    amount: 1200000,
    description: '25–30 seat casual Filipino restaurant, family-managed with direct personal oversight.',
    iconName: 'Utensils',
    notes: 'MUST OPEN LAST after returning to Philippines. Highest variance; estimated breakeven Month 18–24.',
  },
  {
    category: 'Farm / Small Livestock',
    amount: 800000,
    description: 'Native poultry plus small livestock managed by trusted in-laws in peaceful rural area with verified water & vet access.',
    iconName: 'Trees',
    notes: 'Stability anchor generating ~₱80k–280k/yr net. Diversify with crops against disease risk.',
  },
  {
    category: 'Untouchable Emergency Buffer',
    amount: 1000000,
    description: 'Hard floor cash reserve held in high-yield time deposits / short-term treasuries.',
    iconName: 'Shield',
    notes: 'Never deployed into operations. Protects against medical, macro, or family emergencies.',
  },
  {
    category: 'Opportunity & Reserve Capital',
    amount: 5576050,
    description: 'Liquid investment capital ready for expansion, second property, index funds, or absorbing variance.',
    iconName: 'PiggyBank',
    notes: 'Absorbs any business failure without imperiling baseline solvency.',
  },
];

export const portfolioScenarios = [
  {
    scenario: 'Scenario A: Everything Works',
    probability: '~20%',
    netMonthlyPhp: '₱130,500 / mo',
    statusBadge: 'Best Case',
    whatHappens: 'Phase 6 fully self-sustaining by Age 30–31. Rental cash flows, restaurant nets ₱115k/mo, farm cycles stably.',
  },
  {
    scenario: 'Scenario B: Realistic Mix',
    probability: '~55%',
    netMonthlyPhp: '₱39,500 / mo',
    statusBadge: 'Realistic',
    whatHappens: 'Slower, but building steadily — full operation by Age 33–35. Far above national median household income.',
  },
  {
    scenario: 'Scenario C: Restaurant Fails',
    probability: '~20%',
    netMonthlyPhp: '₱2,500 / mo',
    statusBadge: 'Managed Loss',
    whatHappens: 'Restaurant closes (~₱1.2M lost). Untouched ₱5.58M reserve absorbs loss cleanly. Redirect capital into second rental property.',
  },
  {
    scenario: 'Scenario D: Everything Fails',
    probability: '~5%',
    netMonthlyPhp: 'Negative (Temporary)',
    statusBadge: 'The Hard Floor',
    whatHappens: 'Even in total enterprise failure: ₱1M emergency buffer, ₱3M+ real-estate hard asset, BSIT degree, cloud certs, and 5-yr Saudi track record remain. You are not destroyed. You rebuild.',
  },
];

export const blueprintRisks: RiskItem[] = [
  {
    risk: 'Working-Student Burnout (All-nighters becoming weekly habits)',
    mitigation: 'Start projects the day they are assigned (20 mins planning removes panic). Protect weekends as sacred build-time. Strict 6-hour sleep floor.',
    severity: 'High',
  },
  {
    risk: 'Saudi Visa & Labor Law Risk (Kafala / Iqama profession mismatch / Tastur)',
    mitigation: 'Direct IT Specialist visa entry from day one with attested BSIT degree and SCE registration. Uncle referral targeted at documented tech roles.',
    severity: 'Critical',
  },
  {
    risk: 'Restaurant Failure (~60% failure rate within 3 years nationally)',
    mitigation: 'Open LAST, only after permanent return to Philippines with physical presence. Never manage remotely. Consider franchise model for proven systems.',
    severity: 'High',
  },
  {
    risk: 'Farm Disease Outbreak (African Swine Fever / Avian Flu)',
    mitigation: 'Livestock insurance where available; diversify with cash crops alongside livestock; begin small and scale after proven cycles.',
    severity: 'Medium',
  },
  {
    risk: 'Real-Estate Vacancy in Oversupplied Segment',
    mitigation: 'Purchase in secondary CBDs near confirmed mass transit or BPO demand. Research vacancy by barangay rather than general city hype.',
    severity: 'Medium',
  },
  {
    risk: 'The "Dangerous Leader" Trap (Carrying everything alone)',
    mitigation: 'Lead when genuinely needed; deliberately leave room for others to grow; understand that being capable is not the same as being everyone’s default solution.',
    severity: 'High',
  },
  {
    risk: 'Latin Honors / Perfectionism Pressure',
    mitigation: 'Aim for consistency across all four years, not flawless first year. Practical building skill trumps honors ribbons in hiring rooms.',
    severity: 'Medium',
  },
  {
    risk: 'Family-Run Business Strain (Mixing money & relationships)',
    mitigation: 'Install trusted non-family manager for daily operations where possible. Maintain personal oversight; conduct honest role alignment before capital changes hands.',
    severity: 'High',
  },
  {
    risk: 'TESDA Plan Assumptions Unverified (Availability, true cost, scheduling)',
    mitigation: 'Call or visit the nearest accredited TESDA center before Y1 summer; confirm actual schedule, seat availability, TWSP/free-slot status, and true cost. Treat 148–206h Drafting as real range.',
    severity: 'Medium',
  },
  {
    risk: 'Two Competing Saudi-Entry Narratives (IT-first vs EIM overseas demand)',
    mitigation: 'EIM stays a domestic capability layer & optional later lever, never a replacement for the attested BSIT degree entry. Revisit only if IT-first entry confirmed to have actually failed, not preemptively.',
    severity: 'High',
  },
];

export const lettersToClint = [
  {
    target: 'To Clint at 22, holding the diploma',
    stage: 'Graduation & Departure Threshold',
    content: `You did it. Four years, a working-student schedule, a degree, two NC IIs, and probably a few nights you don’t want to talk about. Before you get on that plane — remember why the entry has to be clean. Not because the electrician money isn’t real, but because you already decided, back at 18, that the legal, patient road beats the fast, risky one. Trust the version of you that did that research. Get the degree attested. Let your uncle find you a real title. Walk in the front door.`,
    verse: 'Proverbs 21:5 — “The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.”',
  },
  {
    target: 'To Clint at 27–28, stepping off the plane',
    stage: 'The Return & Capital Deployment Threshold',
    content: `You’re carrying more than most Filipino families accumulate in a lifetime — and you earned every peso of it working a job in a language and a country that wasn’t originally home. Do not rush Phase 6. The 18-year-old who wrote this begged you: research the location before the restaurant lease, test the water before the livestock, buy the real estate before anything else because it’s the safest ground to stand on. Slow is not the enemy here. Wrong is. Take the research phase as seriously as you took the five years that funded it.`,
    verse: 'Luke 14:28 — “For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?”',
  },
  {
    target: 'To Clint at 30 and beyond',
    stage: 'The Generational Legacy & Quiet Peace',
    content: `If you’re reading this with a piano in the room and land somewhere quiet, some version of the picture you were dreaming about at 18 came true. Whatever mix of real estate, restaurant, farm, and the tools you built on top of them actually worked out — remember that the point was never only the money. It was your parents never carrying a debt they couldn’t manage. It was being the kind of provider whose family never has to wonder if he’s coming through. It was standing in front of God able to say the talents entrusted to you were not buried out of fear.`,
    verse: 'Matthew 25:21 — “Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.”',
  },
];

export const sovereignBlueprintMasterEntry: ArchiveEntry = {
  id: 'the-sovereign-architect-master',
  slug: 'the-sovereign-architect-master',
  title: 'The Sovereign Architect: A Blueprint for a Life Well-Built',
  type: 'blueprint',
  date: '2026-07-15',
  year: 2026,
  month: 'July',
  day: 15,
  author: 'Clint Aldwin Maurin',
  collection: 'The Sovereign Architect',
  memoNumber: 'Architectural Blueprint v1.0',
  scriptures: [
    'Luke 14:28',
    'Proverbs 16:3',
    'Proverbs 21:5',
    'Colossians 3:23',
    'Proverbs 13:11',
    'Ecclesiastes 3:1',
    '1 Timothy 6:9-10',
    'James 4:13-15',
    'Matthew 25:21',
    'Proverbs 3:5-6',
  ],
  scriptureVerseText: '“For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?” — Luke 14:28 (KJV)',
  topics: ['life blueprint', 'stewardship', 'diligence', 'sovereign legacy', 'stoicism & faith', 'risk management', 'career & calling', 'discipline'],
  mood: 'Hopeful',
  excerpt: '🔒 Encrypted Architectural Blueprint • Master passcode required to decrypt and view.',
  openingThought: 'This document is protected. Passcode verification required.',
  content: `# THE SOVEREIGN ARCHITECT
## A Blueprint for a Life Well-Built
*A Letter to My Future Self — written by Clint, for Clint*

> “For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?”
> — **Luke 14:28 (KJV)**

*First written: June–July 2026 | One month before the first day of BSIT — Age 18*

---

### How This Document Is Organized
This is not a business plan for investors. It is a personal architecture — a record of how you thought, what you decided, why you decided it, and what you promised yourself before the noise of an actual life started drowning it out. Read it in order the first time. After that, jump straight to whichever Phase you're standing in.

- **Part I — Foundations**: The Scripture and the philosophy underneath everything else.
- **Part II — Where This Began**: The honest origin story, so you never forget who you were before.
- **Part III — The Seven Phases**: The actual plan — detailed, numbered, and corrected where it needed correcting.
- **Part IV — Investing Wisdom**: The difference between building and gambling.
- **Part V — The Risk Shield**: Every honest way this could go wrong, and what you do about it.
- **Part VI — The Letter**: A message to you, at three different ages, from the version of you writing this today.
- **Appendix**: Quick-reference numbers and conversion tables.

---

### Part I — Foundations
#### A Word Before You Begin
If you are reading this, some time has passed. Maybe you are 22 and holding a diploma. Maybe you are 27, stepping off a plane with a heavier bank account and a lighter heart. Maybe things went sideways and you are reading this at a kitchen table trying to remember why you started. All three of you are welcome here.

This document exists because a conversation kept going somewhere real. What started as “what's the best programming language” became a full architecture for a life — tested, questioned, corrected, and rebuilt stronger for having been questioned. That correction matters. A plan that cannot survive being challenged was never a plan; it was a wish wearing a plan's clothes. This one was stress-tested, and it held.

#### The Cornerstone — Why Scripture Grounds This
Faith is the foundation of this blueprint, not a decoration on top of it.
1. **On Committing the Plan** (Proverbs 16:3): *“Commit thy works unto the LORD, and thy thoughts shall be established.”* Plans held loosely and offered honestly to God outlast plans gripped in anxious self-reliance.
2. **On Diligence Over Haste** (Proverbs 21:5): *“The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.”* Every correction in this Blueprint happened because diligence was chosen over haste.
3. **On Counting the Cost** (Luke 14:28): Nothing is built well without first understanding its weight.
4. **On Work Itself** (Colossians 3:23): *“And whatsoever ye do, do it heartily, as to the Lord, and not unto men.”*
5. **On Wealth Built Slowly** (Proverbs 13:11): *“Wealth gotten by vanity shall be diminished: but he that gathereth by labour shall increase.”*
6. **On the Seasons of a Life** (Ecclesiastes 3:1): *“To every thing there is a season, and a time to every purpose under the heaven.”*

#### Stoic Foundations — Wisdom for the Grind
Scripture is the ground. Stoic philosophy is scaffolding — practical tools for the daily grind:
- **The Dichotomy of Control (Epictetus)**: *“Some things are in our power, and others are not.”* Control your research, discipline, honesty, and character. Hold outcomes with an open hand.
- **On Suffering in Advance (Seneca & Marcus Aurelius)**: We suffer far more often in imagination than reality. Name the fear, plan against it, then set it down.
- **A Filipino Proverb Worth Keeping**: *“Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan.”* Never forget the boy who went from Grade 11 average to Grade 12 honors while working mornings.

---

### Part II — Where This Began
In Grade 11, you were an average student watching from the outside. Then you decided. In Grade 12, carrying a full workload, you worked merchandising from 7 AM to 11 AM, then class from 12 to 5 PM. You organized productions and finished with honors (ABM 94 average; Accounting & Marketing 98).
- **You learn by building, not watching**: Blank-canvas projects and error fighting are your learning engine.
- **You are evolving past the "dangerous leader" trap**: Trusting your own standard built Grade 12; learning to delegate and build systems will build your future businesses.
- **ABM is the other half of tech**: Financial statements, marketing, and leadership allow a technician to become an operator.
- **Honoring parents**: A fire that starts for parents must grow into something also for you to burn for four years.

---

### Part III — The Seven Strategic Phases
This is the actual architecture. Seven phases, each with a clear what, why, and how — and, where the original plan was wrong, an honest correction. A plan that never gets corrected was never being tested. This one was.

#### Phase 1 — The Foundation COMPLETED ✓
- **What**: Graduate senior high school with honors from the ABM (Accountancy, Business, and Management) strand.
- **Why**: To build a financial and structural mindset early, so a career is never viewed only as a wage — but as a mechanism for generating capital.
- **The Connection**: This is the root of Phase 6. Most IT specialists fail at business because they only understand technology. You will enter the market already understanding cash flow, asset management, and how a balance sheet actually behaves.
- *Lesson learned*: Health and calisthenics were sacrificed to overworking during Grade 12. Correction — physical restoration is now a mandatory, non-negotiable input, not an optional extra.

#### Phase 2 — The Freedom Gap (June–July 2026, Age 18)
- **What**: Use the final month before college for daily self-study and routine-building — no formal academic pressure yet, maximum discipline while it’s still optional.
- **Revision note**: The original version of this phase included a daily Japanese-language block, in service of the original Japan route. Japan was later replaced with Saudi Arabia (see Phase 4). The language block is dropped. Freed hours are folded into coding practice and physical rebuilding instead.
- **HOW**:
  - *Tech prep*: freeCodeCamp Responsive Web Design (HTML/CSS/JS), 2–3 focused hours daily — not to finish the certificate, but to enter college already comfortable building on a blank file, not just a guided one.
  - *Health rebuild*: 20–30 minutes of daily calisthenics, and a protected 7-hour sleep floor. This is the direct correction from Phase 1’s lesson learned.
  - *The blank-canvas discipline*: You already noticed the gap between tutorial-following and from-scratch building — and you’re already closing it by rebuilding finished projects from memory before starting new ones. Keep doing exactly this.
- **Why**: Not to finish a certificate. To overcome inertia, install a daily-practice habit before external deadlines force it, and walk into BSIT already thinking like a builder instead of a beginner.

#### Phase 3 — The Foundation Build (College, 2026–2030, Age 18–22)
- **What**: Complete the 4-year BSIT degree as the primary asset. Acquire CSS NC II and EIM NC II as secondary, Philippines-based capability credentials — not as a Saudi entry strategy (that idea is corrected in Phase 4).
- **The Hierarchy — Revised**:
  - *BSIT Degree*: The career, the legal Saudi visa category, and the income ceiling.
  - *CSS NC II*: Local college freelance income + a lifelong practical home skill.
  - *EIM NC II*: Local college freelance income + practical home skill + a real cost-saver across every Phase 6 business.
- **Add to This Phase**:
  - *Certifications*: AWS Cloud Practitioner and CompTIA Security+, self-paced during downtime — these are what differentiate your BSIT degree from every other fresh graduate applying to the same Saudi job posting.
  - *Business self-study, in parallel*: Learning to actually read a balance sheet, income statement, and cash flow statement using real, public Philippine companies (Jollibee Foods Corp is a natural first practice case — it’s literally the industry Phase 6’s restaurant will enter).
  - *Small automation projects*: The seeds of Phase 7 — simple personal tools built as coding practice that also happen to be useful (a savings tracker, a simple financial-ratio calculator, a small property-monitoring mock-up).
  - *Degree attestation research*: Start learning the DFA / Saudi Embassy authentication process in your final year, so it is not a bottleneck standing between graduation and departure.

##### The TESDA + BSIT Lineup (Revised — Added September 2026)
*The Lineup (Total: 884 hours)*:
1. **Y1**: EIM NC II — Electrical Installation and Maintenance (196h, Summer break)
2. **Y2**: EPAS NC II — Electronic Products Assembly and Servicing (260h, Summer break)
3. **Y3**: Technical Drafting NC II (148h [148–206h range], Summer break)
4. **Y4 / post-grad**: CSS NC II — Computer Systems Servicing (280h, Post-graduation)

*The Core Logic*:
The physical trio — EIM, EPAS, Technical Drafting — finishes during college and compounds into one design-build-repair stack instead of three unrelated trade skills. EIM lets you install. EPAS lets you assemble and repair. Drafting lets you design what you're building before you touch either one. The digital bridge — CSS — finishes after graduation on purpose: full attention, zero academic deadlines competing for its 280 hours.

*What Each Piece is For*:
- **EIM**: Power/electrical foundation. In-demand in the Philippines and Saudi Arabia. Estimated at low AI-automation risk (~15%).
- **EPAS**: Electronics assembly & diagnostic depth. Matches 2026 semiconductor shortage (56,605 workers in CALABARZON).
- **Drafting**: Connective, multiplying skill. CAD literacy for wiring layouts, farm structures, restaurant floor plans instead of paying someone else.
- **CSS**: Bridge to BSIT and infrastructure, paired directly with completed degree.

##### The Remote Work Pipeline — Closed Portfolio (Added September 2026)
This is the income engine running underneath:
1. **Rank 1**: Excel double-entry accounting tracker (ABM + AI-built) — Strongest, rarest asset. Real ledger logic, auto-generating financial statements.
2. **Rank 2**: Cafe landing page mockup — Proves frontend range. Pairs with booking/maintenance flow.
3. **Rank 3**: Notion template / setup — Underserved solopreneur niche.
4. **Rank 4**: Light novel website(s) — Best proof of raw coding skill and follow-through.
5. **Rank 5**: Canva design work / lakbay sanaysay (100+ pages) — Strong discipline story.
6. **Rank 6**: Edited film / video project — Bonus piece.

- *Packaging*: Six projects packaged into a real portfolio website, not a generic PDF. Scope stays tight: home intro, six project sections, contact.
- *The Pitch*: “I built a working double-entry accounting system in Excel — auto-generating financial statements, changes in equity, and visual dashboards — because I needed to track my own money and existing tools weren’t enough.”
- *Scarcity Test*: Accountants usually can’t code, developers usually don’t understand double-entry ledgers. AI devalues slow manual bookkeeping, not underlying domain understanding.
- *Realistic Pay (Part-time, 10–15 hrs/wk)*:
  - Generic VA: ₱8,000–15,000
  - Specialized VA (first client): ₱10,000–15,000 (buying first review)
  - Specialized VA (after 1 client): ₱18,000–25,000
  - Realistic ceiling: ₱35,000–40,000 (needs 20–25 hrs/wk, conflicts with exams)
  - Honest target first two semesters: ₱15,000–₱25,000/month. Hour cap: 10–12 hrs/week, non-negotiable.
- *The Infinite Preparation Trap*: List is closed at six projects. Any new idea goes into a future-projects note.
- *The Working-Student Reality*: 3–9 PM evening classes + 7–11 AM morning merchandising. 6-hour sleep floor. Protect weekends as sacred build-time.
- *Leadership and Honors*: Lead when genuinely needed; let others grow in the gaps. Aim for consistency, not perfection. A 2.50-average graduate who can actually build things beats a Latin-Honors graduate with no real skill in almost every hiring room.

#### Phase 4 — The Legal Entry: Saudi Arabia (Age ≈22, 2030)
- **Revision Note**: Under Saudi labor law, your Iqama is tied to a single legal profession, and SCE registration is required to legally hold an engineering or IT-specialist title. Working outside your Iqama’s listed profession is a real violation (*Tastur*) carrying deportation and blacklisting risk. Enter directly as an IT professional.
- **Where EIM, EPAS, Drafting, and CSS Sit**: They move to a domestic personal capability layer and become direct cost-savers across every Phase 6 business.
- **Why the Tax Picture is Real**:
  - Saudi Arabia imposes **no personal income tax on wages** for expatriates. Gross is spendable, investable capital.
  - Only deduction is GOSI (typically applies to Saudi nationals).
  - Contrast with Philippines equivalent salary, which loses 15–30% to withholding tax.

#### Phase 5 — The Career Ascent (Age 22–28, Saudi Arabia)
- 5 years of disciplined, legally clean IT work in Saudi Arabia:
  - Y1 (Age 22): Entry IT Support — ₱94,250/mo salary (₱73,225/mo savings, ₱878,700 running)
  - Y2 (Age 23): IT Support, proven — ₱116,000/mo salary (₱92,800/mo savings, ₱1,992,300 running)
  - Y3 (Age 24): Mid-Junior + certs — ₱159,500/mo salary (₱133,400/mo savings, ₱3,593,100 running)
  - Y4 (Age 25): Solid Mid-Level — ₱217,500/mo salary (₱185,600/mo savings, ₱5,820,300 running)
  - Y5 (Age 26): Cyber / Cloud Specialist — ₱275,500/mo salary (₱239,250/mo savings, ₱8,691,300 running)
- Base Savings: **₱8,691,300**
- Extras: Annual flight allowance (₱145,000) + Bi-annual bonuses (₱551,000) + End-of-service gratuity (₱688,750) = **₱1,384,750**
- **Total in the bank at Age 27–28: ₱10,076,050**

#### Phase 6 — The Sovereign Legacy (Age ≈28+, Return to the Philippines)
Deploy Saudi capital into permanent generational assets:
- Real estate down payment: ₱1,500,000 (₱3.0M condo in secondary CBD)
- Restaurant startup capital: ₱1,200,000 (*opened LAST with physical presence; 60% fail within 3 years nationally*)
- Farm / livestock initial capital: ₱800,000 (native poultry + small livestock in peaceful rural area with water/vet access)
- Emergency buffer (never touched): ₱1,000,000
- Reserve / opportunity capital: ₱5,576,050
- *Weighted Scenarios*:
  - Scenario A (20%): Everything works — ₱130,500/mo net
  - Scenario B (55%): Realistic mix — ₱39,500/mo net
  - Scenario C (20%): Restaurant fails — ₱2,500/mo net (untouched ₱5.58M absorbs it)
  - Scenario D (5%): Everything fails — The Hard Floor. Skills, ₱1M buffer, ₱3M+ real estate, degree, certs, and 5-yr Saudi record remain. You are not destroyed. You rebuild.

#### Phase 7 — The Tech–Business Fusion (Ongoing, born out of Phase 6)
- Build tools that run own businesses, then package and sell as commercial SaaS (OFW rental manager, restaurant POS, farm ops).
- Validated before sold: solving own lived problems first.
- *The AI-Era Reframe*: AI closes the execution gap. The scarce skill is knowing what is worth building and why. ABM thinking wearing a hoodie.

---

### Part IV — Investing Wisdom
- **Trading Is Not Investing**: 74–89% of retail day traders and 84% of crypto traders lose money. Long-term compounding in productive assets and index funds outlasts emotional speculation (1 Timothy 6:9–10).
- **Financial-Statement Literacy**: Read balance sheets, debt ratios, and profit margins. Apply the same analytical rigor inward to your own physical ventures.

---

### Part V — The Risk Management Shield
10 Named Risks & Mitigations:
1. **Working-student burnout**: Day 1 project starts, weekends protected, 6-hour sleep hard floor.
2. **Saudi legal / visa risk (Tastur)**: Direct IT visa, degree attested, SCE registration.
3. **Restaurant failure (~60% nationally)**: Open last with physical presence in the Philippines.
4. **Farm disease (ASF / avian flu)**: Livestock insurance, crop diversification alongside animals.
5. **Real-estate vacancy**: Secondary CBDs near transit/BPO hubs; study vacancy by barangay.
6. **The “dangerous leader” pattern**: Lead when needed, let others grow in the gaps.
7. **Honors pressure**: Consistency over perfection; a builder with a 2.50 GPA beats an honors student with no portfolio in tech.
8. **Family-run business strain**: Non-family manager for daily ops, honest role clarity.
9. **TESDA plan assumptions unverified**: Check accredited center before Y1 summer; verify actual schedule, seats, and out-of-pocket costs.
10. **Two competing Saudi-entry narratives**: EIM stays a domestic capability lever only, not a replacement for the attested BSIT degree entry.

- **The Humility Clause (James 4:13–15)**: *“If the Lord will, we shall live, and do this, or that.”* Hold plans firmly enough to work toward them daily, loosely enough that if God’s providence rewrites a chapter, you bend instead of break.

---

### Part VI — Letters to My Future Self
- **To Clint at 22, holding the diploma**: Remember why the entry has to be clean. Not because the electrician money isn’t real, but because you already decided, back at 18, that the legal, patient road beats the fast, risky one. Trust the version of you that did that research. Get the degree attested. Let your uncle find you a real title. Walk in the front door.
  > *“The thoughts of the diligent tend only to plenteousness; but of every one that is hasty only to want.”* — Proverbs 21:5 (KJV)
- **To Clint at 27–28, stepping off the plane**: You’re carrying more than most Filipino families accumulate in a lifetime — and you earned every peso of it. Do not rush Phase 6. The 18-year-old who wrote this begged you: research before capital. Buy the real estate first. Slow is not the enemy here. Wrong is.
  > *“For which of you, intending to build a tower, sitteth not down first, and counteth the cost, whether he have sufficient to finish it?”* — Luke 14:28 (KJV)
- **To Clint at 30 and beyond**: If you’re reading this with a piano in the room and land somewhere quiet, some version of the dream came true. Remember the point was never just money. It was your parents never carrying debt, being an unwavering provider, and hearing the Master say:
  > *“Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord.”* — Matthew 25:21 (KJV)

---

> “Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.”
> — **Proverbs 3:5–6 (KJV)**

---

### Appendix — Quick Reference
- **SHS-to-College Grade Conversion (Philippine SUC Scale)**:
  - 1.00: 97–100% (Excellent)
  - 1.25: 94–96% (Your SHS Average lands here — 94 ABM average)
  - 1.50: 91–93% (Superior)
  - 1.75: 88–90% (Very Good)
  - 2.00: 85–87% (Good)
  - 3.00: 75% (Minimum Passing)
  - 5.00: Below 75% (Failed)
- **Latin Honors Cutoffs**: Summa Cum Laude (1.00–1.20), Magna Cum Laude (1.21–1.45), Cum Laude (1.46–1.75).
- **Phase Timeline at a Glance**:
  - Phase 1: The Foundation (Completed — SHS ABM Honors)
  - Phase 2: The Freedom Gap (Jun–Jul 2026, Age 18 — Pre-college habit engine)
  - Phase 3: The Foundation Build (2026–2030, Age 18–22 — BSIT + 4 TESDA + Remote Pipeline)
  - Phase 4: The Legal Entry (2030, Age 22 — Direct Saudi IT Visa + 0% Expat Wage Tax)
  - Phase 5: The Career Ascent (2030–2035, Age 22–27/28 — ₱10.07M total capital target)
  - Phase 6: The Sovereign Legacy (2035 onward, Age 27/28+ — Condo, Farm, Resto, ₱1M Buffer)
  - Phase 7: Tech–Business Fusion (Ongoing — Lived problem B2B SaaS)
- **Update Log — September 2026**:
  - Added the four-course TESDA lineup (EIM, EPAS, Drafting, CSS = 884 hours) and stress test.
  - Added the six-project Remote Work Pipeline as a closed portfolio with scarcity test and pay tiers.
  - Extended Phase 4’s trade skill framing to personal capability & Phase 6 facility cost-reduction.
  - Integrated 0% expat wage tax in Saudi Arabia ahead of Phase 5 savings projections.

*This document was built from a real conversation, corrected where it needed correcting, and grounded in what actually matters. Update it as life happens — a blueprint that never changes was never actually being used.*

*Build the tower. Count the cost, like you already did. And when it’s standing — remember whose hands were on it with you the whole time.*
*— Clint, Age 18, one month before it all began.*`,
  lesson: 'A life well-built is not an accident of luck or anxious haste, but a structure founded on Scripture, planned with diligence, tested against real risks, and executed with patient faithfulness.',
  prayer: 'Heavenly Father, I commit every phase, every peso, and every year of this blueprint into Your sovereign hands. Grant me diligence over haste, wisdom before capital, and humility under Your guidance. Let this life be an offering to You and a blessing to my family. In Jesus’ name, Amen.',
  closingThought: 'Build the tower. Count the cost. And when it’s standing — remember whose hands were on it with you the whole time.',
  status: 'PUBLISHED',
  readingTimeMinutes: 12,
  isFeatured: true,
};
