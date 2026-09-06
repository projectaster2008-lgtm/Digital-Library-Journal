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
    subtitle: 'College BSIT + Capability Credentials',
    timeframe: '2026–2030',
    targetAge: 'Age 18–22',
    status: 'UPCOMING',
    what: 'Complete the 4-year BSIT degree as the primary asset. Acquire CSS NC II and EIM NC II as secondary, Philippines-based capability credentials.',
    why: 'Under Saudi legal system, only BSIT legally qualifies for the IT Specialist visa category. CSS and EIM serve as personal capability layers and college freelance income.',
    howSteps: [
      'Self-pace AWS Cloud Practitioner & CompTIA Security+ during downtime.',
      'Business self-study in parallel: reading balance sheets, income statements, and cash flows using real Philippine companies (e.g. Jollibee Foods Corp).',
      'Build small automation projects (savings tracker, financial calculator, property monitoring mockup).',
      'Research DFA & Saudi Embassy degree attestation in final college year to prevent bottlenecks.',
      'Protect 6-hour sleep floor even during working-student evening schedule (3–9 PM class alongside morning merchandising).',
    ],
    keyMetrics: [
      { label: 'Primary Degree', value: '4-Year BSIT' },
      { label: 'Capability Layers', value: 'CSS NC II & EIM NC II' },
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
    why: 'Under Saudi labor law, Iqama is tied to a single legal profession, and SCE registration is required. Working outside the listed profession is a violation (Tastur) carrying deportation/blacklisting risks. Direct IT entry avoids risk and increases 5-year savings by ~₱3M.',
    howSteps: [
      'Finish 4-year BSIT degree completely as the clean entry ticket.',
      'Formally attest degree with Saudi Embassy / DFA during final year.',
      'Leverage uncle’s supervisor position correctly: apply formally to an entry-level IT support or systems role.',
      'Enter on IT Specialist visa category with matching Iqama, contract, and job title.',
    ],
    keyMetrics: [
      { label: 'Visa Category', value: 'IT Specialist / Support' },
      { label: 'Legal Status', value: '100% SCE Clean & Attested' },
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
1. **Phase 1 — The Foundation (COMPLETED)**: Senior High School ABM Honors. Established cash flow and balance sheet literacy.
2. **Phase 2 — The Freedom Gap (June–July 2026, Age 18)**: Pre-college daily habit formation. freeCodeCamp coding, daily calisthenics, 7-hour sleep floor. Japanese dropped for direct Saudi IT preparation.
3. **Phase 3 — The Foundation Build (College, 2026–2030, Age 18–22)**: Complete 4-year BSIT. Acquire CSS NC II & EIM NC II for practical local capability and college freelance income. Self-study AWS Cloud + CompTIA Security+, balance sheets, small automation projects, degree attestation.
4. **Phase 4 — The Legal Entry: Saudi Arabia (Age ≈22, 2030)**: Direct entry as an IT professional with attested BSIT degree and SCE registration, eliminating *Tastur* risk and gaining +₱2.98M in savings advantage over technician route.
5. **Phase 5 — The Career Ascent (Age 22–28, Saudi Arabia)**: 5-year IT progression (₱94.2k/mo to ₱275.5k/mo Cyber/Cloud Specialist). Total accumulated capital: **₱10,076,050** (₱8.69M base savings + ₱1.38M bonuses & gratuity).
6. **Phase 6 — The Sovereign Legacy (Age ≈28+, Philippines Return)**: Deploy capital into permanent assets:
   - Real estate condo down payment: ₱1.5M
   - Casual Filipino restaurant: ₱1.2M (opened LAST with physical presence)
   - Rural livestock & farm: ₱800k (managed with in-laws)
   - Untouchable emergency buffer: ₱1.0M
   - Reserve & opportunity capital: ₱5.58M
7. **Phase 7 — The Tech–Business Fusion (Ongoing)**: Turn internal business tools (OFW rental tracker, resto POS, farm ops) into commercial SaaS products. Validated before sold.

---

### Part IV — Investing Wisdom
- **Trading Is Not Investing**: 74–89% of retail day traders and 84% of crypto traders lose money. Long-term compounding in productive assets and index funds outlasts emotional speculation (1 Timothy 6:9–10).
- **Financial-Statement Literacy**: Read balance sheets, debt ratios, and profit margins. Apply the same analytical rigor inward to your own physical ventures.

---

### Part V — The Risk Management Shield
- Burnout: Start projects on day assigned; 6-hour sleep floor.
- Saudi legal: Direct IT visa with attested degree.
- Restaurant risk: Open last with physical presence.
- Farm disease: Insurance and crop diversification.
- Real estate: Secondary CBDs with verified transit/BPO demand.
- **The Humility Clause (James 4:13–15)**: *“If the Lord will, we shall live, and do this, or that.”* Hold plans firmly to work toward them daily, loosely enough to bend if God rewrites a chapter.

---

### Part VI — Letters to My Future Self
- **To Clint at 22**: Walk through the front door with an attested IT degree.
- **To Clint at 27–28**: Do not rush Phase 6. Research before capital. Slow is not the enemy; wrong is.
- **To Clint at 30 and beyond**: The point was never just money. It was your parents never carrying debt, being an unwavering provider, and hearing *“Well done, good and faithful servant”* (Matthew 25:21).

---

> “Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.”
> — **Proverbs 3:5–6 (KJV)**

*Build the tower. Count the cost, like you already did. And when it’s standing — remember whose hands were on it with you the whole time.*
*— Clint, Age 18, one month before it all began.*`,
  lesson: 'A life well-built is not an accident of luck or anxious haste, but a structure founded on Scripture, planned with diligence, tested against real risks, and executed with patient faithfulness.',
  prayer: 'Heavenly Father, I commit every phase, every peso, and every year of this blueprint into Your sovereign hands. Grant me diligence over haste, wisdom before capital, and humility under Your guidance. Let this life be an offering to You and a blessing to my family. In Jesus’ name, Amen.',
  closingThought: 'Build the tower. Count the cost. And when it’s standing — remember whose hands were on it with you the whole time.',
  status: 'PUBLISHED',
  readingTimeMinutes: 12,
  isFeatured: true,
};
