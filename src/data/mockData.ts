import {
  buildCoverageArticles,
  extraNarratives,
  extraPercolation,
  extraNarrativeDetails,
  extraAlerts,
  extraPenetration,
  extraMisinfo,
  extraClusters,
  ministryBriefings as buildMinistryBriefings,
  GRID_REGIONS,
  GRID_MEDIA,
} from './seedGrid';

export const kpiData = {
  coverageVolume: 5_234,
  coverageDelta: '+12%',
  activeNarratives: 23,
  narrativeDelta: '+3',
  pendingAlerts: 5,
  alertsDelta: '+2',
  aiConfidence: 94.2,
  confidenceDelta: '+1.3%',
  threatLevel: 'ELEVATED' as 'STABLE' | 'ELEVATED' | 'CRITICAL',
};

export const sentimentBreakdown = [
  { name: 'Positive', value: 42, color: '#10b981' },
  { name: 'Neutral', value: 31, color: '#6b7280' },
  { name: 'Mixed', value: 16, color: '#f59e0b' },
  { name: 'Negative', value: 11, color: '#ef4444' },
];

export const coverageTrend = [
  { day: 'Aug 7', positive: 38, neutral: 35, negative: 14, mixed: 13 },
  { day: 'Aug 8', positive: 41, neutral: 32, negative: 12, mixed: 15 },
  { day: 'Aug 9', positive: 36, neutral: 34, negative: 16, mixed: 14 },
  { day: 'Aug 10', positive: 44, neutral: 30, negative: 10, mixed: 16 },
  { day: 'Aug 11', positive: 40, neutral: 33, negative: 13, mixed: 14 },
  { day: 'Aug 12', positive: 43, neutral: 29, negative: 15, mixed: 13 },
  { day: 'Aug 13', positive: 42, neutral: 31, negative: 11, mixed: 16 },
];

export const narratives = [
  {
    id: 1,
    title: 'PM announces Rs 2.5 lakh crore infrastructure push under Gati Shakti 2.0',
    tone: 'Positive' as const,
    spread: 'Very High',
    riskLevel: 'Low',
    suggestedAction: 'Amplify via regional PIB offices; translate key highlights into vernacular press releases',
    outlets: 14,
    trendData: [30, 45, 62, 78, 85, 91, 88],
    ministries: ['Ministry of Finance', 'Ministry of Commerce'],
    regions: ['Hindi Belt', 'Maharashtra & Gujarat', 'South India'],
  },
  {
    id: 2,
    title: 'Opposition raises concerns over revised unemployment methodology in PLFS data',
    tone: 'Critical' as const,
    spread: 'High',
    riskLevel: 'High',
    suggestedAction: 'Prepare factual explainer with methodology comparison; brief spokespeople within 24 hours',
    outlets: 11,
    trendData: [10, 18, 32, 45, 58, 72, 81],
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    regions: ['Hindi Belt', 'Maharashtra & Gujarat', 'South India'],
  },
  {
    id: 3,
    title: 'India-ASEAN Free Trade Corridor agreement receives international praise',
    tone: 'Positive' as const,
    spread: 'Medium',
    riskLevel: 'Low',
    suggestedAction: 'Continue current strategy; push vernacular coverage of benefits to Indian exporters',
    outlets: 8,
    trendData: [20, 35, 42, 48, 45, 43, 40],
    ministries: ['Ministry of External Affairs', 'Ministry of Commerce'],
    regions: ['South India', 'Maharashtra & Gujarat'],
  },
  {
    id: 4,
    title: 'Ayushman Bharat 2.0 expansion: coverage gaps reported in rural districts',
    tone: 'Mixed' as const,
    spread: 'Medium',
    riskLevel: 'Medium',
    suggestedAction: 'Issue state-wise implementation status clarification; coordinate with Health Ministry field offices',
    outlets: 9,
    trendData: [15, 22, 28, 35, 42, 48, 52],
    ministries: ['Ministry of Health & Family Welfare'],
    regions: ['Hindi Belt', 'Eastern India', 'South India'],
  },
  {
    id: 5,
    title: 'Digital India 3.0 targets 100% rural broadband — implementation concerns in NE states',
    tone: 'Mixed' as const,
    spread: 'Medium',
    riskLevel: 'Medium',
    suggestedAction: 'Push success stories from connected villages; address NE concerns with MeitY regional office',
    outlets: 7,
    trendData: [25, 30, 28, 35, 38, 41, 44],
    ministries: ['Ministry of Electronics & IT'],
    regions: ['Northeast', 'Hindi Belt'],
  },
  {
    id: 6,
    title: 'Defence procurement reforms: Rafale Marine and Tejas Mk2 progress coverage',
    tone: 'Positive' as const,
    spread: 'Medium',
    riskLevel: 'Low',
    suggestedAction: 'Maintain current outreach; coordinate with MoD for Aero India 2027 media plan',
    outlets: 6,
    trendData: [18, 22, 25, 30, 28, 32, 35],
    ministries: ['Ministry of Defence'],
    regions: ['Punjab & Haryana', 'South India'],
  },
  ...extraNarratives,
];

const coreArticles = [
  {
    id: 1,
    headline: 'Cabinet approves Rs 2.5 lakh crore Gati Shakti 2.0 master plan for multi-modal connectivity',
    summary: 'The Union Cabinet has given its nod to the ambitious Gati Shakti 2.0 framework that aims to integrate 16 ministries under a unified logistics infrastructure plan, targeting completion of key corridors by 2029.',
    source: 'Times of India',
    edition: 'National',
    date: 'Aug 13, 2026',
    page: 'Front Page',
    relevanceScore: 97,
    ministryTags: [
      { name: 'Ministry of Finance', confidence: 96 },
      { name: 'Ministry of Commerce', confidence: 88 },
      { name: 'Ministry of Railways', confidence: 72 },
    ],
    sentiment: 'Positive' as const,
    sentimentReason: 'Factual reporting of policy announcement with emphasis on development impact and economic benefits',
    crossReferences: 12,
    mediaType: 'Print' as const,
    region: 'Hindi Belt',
    fullBody: 'NEW DELHI: The Union Cabinet on Wednesday approved Gati Shakti 2.0, a Rs 2.5 lakh crore multi-modal connectivity programme that brings 16 ministries onto a single planning grid. Officials said the framework will complete remaining economic corridors by 2029 and cut logistics costs toward the 8% of GDP target.\n\nThe plan expands the original PM Gati Shakti platform with dedicated freight corridors, port-rail last-mile links, and a common GIS layer for land acquisition and environmental clearances. Finance Ministry estimates 3.2 lakh direct construction jobs over five years.\n\nOpposition MPs asked for a published district-wise works calendar. The Cabinet note, shared with PIB, lists 214 priority stretches across 22 states.',
    estimatedReach: '48.2M impressions (print + digital syndication)',
    audience: ['National English dailies', 'Hindi belt business pages', 'Infrastructure trade press'],
    spreadTimeline: [
      { day: 'Aug 11', outlet: 'PTI', type: 'Wire' },
      { day: 'Aug 11', outlet: 'Times of India', type: 'Front page' },
      { day: 'Aug 12', outlet: 'Dainik Jagran', type: 'Vernacular' },
      { day: 'Aug 13', outlet: 'Business channels', type: 'Analysis' },
    ],
    relatedArticleIds: [5, 8],
    historicalContext: 'Gati Shakti 1.0 (2021) received similar day-one saturation in national dailies; vernacular pickup lagged 48 hours. This cycle is 12 hours faster in Hindi editions.',
    detailedActions: [
      'Issue 12-language fact sheet with corridor maps by 18:00 IST',
      'Brief regional PIB units in UP, Maharashtra, and Tamil Nadu for local job numbers',
      'Offer on-record quote from DPIIT secretary for evening business TV',
    ],
    sourceUrl: 'https://timesofindia.indiatimes.com/india/gati-shakti-2-0-cabinet',
  },
  {
    id: 2,
    headline: 'PLFS methodology under scanner: economists question revised unemployment calculation',
    summary: 'Leading economists have raised concerns about the Periodic Labour Force Survey\'s revised methodology, arguing that the new classification of gig workers inflates employment figures by approximately 3.2 percentage points.',
    source: 'Mint',
    edition: 'National',
    date: 'Aug 13, 2026',
    page: 'Page 3',
    relevanceScore: 94,
    ministryTags: [
      { name: 'Ministry of Labour', confidence: 95 },
      { name: 'Ministry of Statistics', confidence: 91 },
    ],
    sentiment: 'Negative' as const,
    sentimentReason: 'Substantive policy criticism backed by expert analysis — not incident reporting but directed critique of government methodology',
    crossReferences: 8,
    mediaType: 'Print' as const,
    region: 'Maharashtra & Gujarat',
    fullBody: 'MUMBAI: Economists quoted in Mint have questioned the Periodic Labour Force Survey revision that reclassifies a share of gig and unpaid family workers. They argue the change lifts the headline employment rate by about 3.2 percentage points versus the previous series.\n\nThe Ministry of Statistics has not issued a technical note comparing ICLS-19 alignment with the older PLFS definition. Opposition parties used the Mint report in a Wednesday briefing.\n\nThis is policy criticism, not accident or crime reporting — it belongs on the Labour and Statistics desks.',
    estimatedReach: '12.6M (Mint print + livemint.com + TV pickups)',
    audience: ['Policy elites', 'Business desk readers', 'Opposition researchers'],
    spreadTimeline: [
      { day: 'Aug 8', outlet: 'The Wire', type: 'First report' },
      { day: 'Aug 9', outlet: 'Mint', type: 'National print' },
      { day: 'Aug 11', outlet: 'NDTV', type: 'TV panel' },
      { day: 'Aug 13', outlet: 'Hindi dailies', type: 'Regional' },
    ],
    relatedArticleIds: [6],
    historicalContext: 'Feb 2024 jobs-data cycle ran three weeks after the first methodology critique went unbriefed. Same outlet sequence: digital specialist → Mint → TV.',
    detailedActions: [
      'Publish PLFS vs ICLS-19 comparison PDF within 12 hours',
      'Joint MoSPI–MoLE backgrounder for economic editors',
      'Do not wait for evening bulletins — this is already on TV panels',
    ],
    sourceUrl: 'https://www.livemint.com/economy/plfs-methodology',
  },
  {
    id: 3,
    headline: 'Bus overturns in Agra: 12 injured in early morning accident on Yamuna Expressway',
    summary: 'A private bus travelling from Lucknow to Delhi overturned near the Agra toll plaza on the Yamuna Expressway. Twelve passengers sustained minor injuries and were taken to the district hospital.',
    source: 'Dainik Jagran',
    edition: 'Agra',
    date: 'Aug 13, 2026',
    page: 'Page 5',
    relevanceScore: 8,
    ministryTags: [
      { name: 'Ministry of Road Transport', confidence: 32 },
    ],
    sentiment: 'Neutral' as const,
    sentimentReason: 'Routine incident reporting — not a policy critique. Flagged LOW relevance. Previous system incorrectly tagged this as Negative for Ministry of Transport.',
    crossReferences: 1,
    mediaType: 'Print' as const,
    region: 'Hindi Belt',
    aiFlag: 'FILTERED: Would have appeared as negative news under keyword-based system. Correctly identified as routine incident reporting with no ministry relevance.',
    fullBody: 'AGRA: A private bus from Lucknow to Delhi overturned near the Yamuna Expressway toll plaza. Twelve passengers were treated for minor injuries at the district hospital. Police said the driver lost control; no government vehicle or NHAI contract is involved.\n\nKeyword systems tagged this Negative for Transport because of “accident” and “Uttar Pradesh”. Officers do not need this in the morning ministry clip file.',
    estimatedReach: '0.4M (district edition)',
    audience: ['Local crime/city desk'],
    spreadTimeline: [
      { day: 'Aug 13', outlet: 'Dainik Jagran Agra', type: 'City page' },
    ],
    relatedArticleIds: [],
    historicalContext: 'Samvad regularly dumped district accident copy into Transport and Home ministry queues. This item is shown to demonstrate the filter, not as an intelligence lead.',
    detailedActions: [
      'Keep suppressed from ministry dashboards (relevance 8%)',
      'Do not include in morning brief',
    ],
    sourceUrl: 'https://www.jagran.com/uttar-pradesh/agra-bus-accident',
  },
  {
    id: 4,
    headline: 'PM-KISAN disbursement delays reported in 14 districts across UP and Bihar',
    summary: 'District-level editions report that the 17th instalment of PM-KISAN has been delayed by 3-4 weeks in several districts, with farmers citing non-updated Aadhaar-seeding as the primary cause.',
    source: 'Amar Ujala',
    edition: 'Lucknow',
    date: 'Aug 12, 2026',
    page: 'Page 1',
    relevanceScore: 91,
    ministryTags: [
      { name: 'Ministry of Agriculture', confidence: 97 },
      { name: 'Ministry of Finance', confidence: 64 },
    ],
    sentiment: 'Negative' as const,
    sentimentReason: 'Ground-level grievance reporting with specific details of implementation failure — actionable criticism requiring response',
    crossReferences: 5,
    mediaType: 'Print' as const,
    region: 'Hindi Belt',
    fullBody: 'LUCKNOW: District correspondents in 14 blocks of UP and Bihar report that the 17th PM-KISAN instalment is 3–4 weeks late. Farmers named Aadhaar-seeding mismatches at the CSC as the main cause.\n\nUnlike a highway accident, this is implementation failure with named geography. It is already moving from district editions toward state front pages.',
    estimatedReach: '9.1M (Hindi belt print cluster)',
    audience: ['Rural readers', 'District editions', 'Agriculture desks'],
    spreadTimeline: [
      { day: 'Aug 11', outlet: 'Amar Ujala district', type: 'First report' },
      { day: 'Aug 12', outlet: 'Amar Ujala Lucknow', type: 'State page' },
      { day: 'Aug 13', outlet: 'Dainik Bhaskar', type: 'Pickup' },
    ],
    relatedArticleIds: [1],
    historicalContext: 'Oct 2025 disbursement-delay cluster reached national pages in five days when regional PIB did not issue a status note.',
    detailedActions: [
      'PIB Lucknow and Patna: instalment status table by district',
      'Coordinate Agriculture Ministry CSC helpdesk numbers for regional releases',
    ],
    sourceUrl: 'https://www.amarujala.com/lucknow/pm-kisan-delay',
  },
  {
    id: 5,
    headline: 'India-ASEAN trade corridor to boost bilateral commerce by $40 billion annually',
    summary: 'The newly signed India-ASEAN Free Trade Corridor agreement is expected to streamline customs procedures and reduce transit times, with economists projecting a $40 billion annual increase in trade volume.',
    source: 'The Hindu',
    edition: 'National',
    date: 'Aug 12, 2026',
    page: 'Page 1',
    relevanceScore: 89,
    ministryTags: [
      { name: 'Ministry of External Affairs', confidence: 93 },
      { name: 'Ministry of Commerce', confidence: 90 },
    ],
    sentiment: 'Positive' as const,
    sentimentReason: 'Analytical reporting highlighting diplomatic achievement and economic projections — positive framing across domestic and international outlets',
    crossReferences: 7,
    mediaType: 'Print' as const,
    region: 'South India',
    fullBody: 'CHENNAI: The Hindu reports the India–ASEAN corridor is projected to add $40 billion in annual trade, with shorter customs dwell times at Chennai, Vizag, and Mundra.\n\nNational English coverage is strong; Tamil and Telugu pickup remains thin — a penetration gap, not a sentiment problem.',
    estimatedReach: '18.4M (English national + south metros)',
    audience: ['English national', 'Exporter associations', 'South metro readers'],
    spreadTimeline: [
      { day: 'Aug 11', outlet: 'MEA briefing', type: 'Official' },
      { day: 'Aug 12', outlet: 'The Hindu', type: 'National' },
      { day: 'Aug 13', outlet: 'International wires', type: 'Global' },
    ],
    relatedArticleIds: [1],
    historicalContext: 'Trade-deal stories typically stall at English broadsheets unless PIB supplies SME export and port-job angles in vernacular.',
    detailedActions: [
      'Vernacular op-eds on SME export benefit, not only GDP totals',
      'Chennai / Kochi / Vizag port briefings',
    ],
    sourceUrl: 'https://www.thehindu.com/business/asean-corridor',
  },
  {
    id: 6,
    headline: '"Unemployment crisis deepening" — Congress releases alternative jobs report',
    summary: 'Congress party has released an alternative employment assessment claiming job creation is 40% below government targets, citing CMIE data and contrasting it with official PLFS figures.',
    source: 'NDTV',
    edition: 'Digital',
    date: 'Aug 13, 2026',
    page: 'N/A',
    relevanceScore: 88,
    ministryTags: [
      { name: 'Ministry of Labour', confidence: 92 },
    ],
    sentiment: 'Negative' as const,
    sentimentReason: 'Opposition-sourced counter-narrative with political framing — high amplification potential on digital platforms',
    crossReferences: 6,
    mediaType: 'Digital' as const,
    region: 'Hindi Belt',
    fullBody: 'NEW DELHI: NDTV carried the Congress alternative jobs note claiming creation is 40% below target, citing CMIE against PLFS. Clips are circulating on YouTube and X with 340% mention growth in 48 hours.\n\nThis is political amplification of the Mint methodology story, not a new data release.',
    estimatedReach: '22.0M (TV + YouTube + X)',
    audience: ['TV news', 'Digital-first', 'Opposition networks'],
    spreadTimeline: [
      { day: 'Aug 12', outlet: 'Congress briefing', type: 'Political' },
      { day: 'Aug 13', outlet: 'NDTV', type: 'Digital + TV' },
      { day: 'Aug 13', outlet: 'YouTube / X', type: 'Amplification' },
    ],
    relatedArticleIds: [2],
    historicalContext: 'Same amplification signature as Feb 2024 jobs cycle. TV panels follow digital within 24 hours.',
    detailedActions: [
      'Factual explainer before 18:00 news belt',
      'Do not engage the party film — correct the data series only',
    ],
    sourceUrl: 'https://www.ndtv.com/india-news/congress-jobs-report',
  },
  {
    id: 7,
    headline: 'Delhi real estate advertisement — "New Delhi\'s most premium address"',
    summary: 'Full-page advertisement for a luxury real estate project in New Delhi by a private developer.',
    source: 'Hindustan Times',
    edition: 'Delhi',
    date: 'Aug 13, 2026',
    page: 'Page 7',
    relevanceScore: 2,
    ministryTags: [],
    sentiment: 'Neutral' as const,
    sentimentReason: 'Commercial advertisement — zero ministry relevance',
    crossReferences: 0,
    mediaType: 'Print' as const,
    region: 'Hindi Belt',
    aiFlag: 'FILTERED: Keyword “Delhi” would have listed this under Delhi-related ministries. Identified as a commercial advertisement with no government relevance.',
    fullBody: 'A full-page luxury housing advertisement in the Delhi edition of Hindustan Times. No editorial copy. The word “Delhi” is the only match a keyword engine would use.',
    estimatedReach: '—',
    audience: ['Advertisers'],
    spreadTimeline: [],
    relatedArticleIds: [],
    historicalContext: 'Keyword queues routinely mixed classifieds and ads into ministry clip lists.',
    detailedActions: [
      'Exclude from all ministry feeds',
      'Do not count toward coverage volume for officers',
    ],
    sourceUrl: 'https://www.hindustantimes.com/classifieds',
  },
  {
    id: 8,
    headline: 'Ayushman Bharat 2.0: 4.2 crore new beneficiaries enrolled in Phase 1',
    summary: 'The Health Ministry reports 4.2 crore new beneficiaries enrolled under the expanded Ayushman Bharat scheme, though implementation in tribal and remote areas remains below target.',
    source: 'Indian Express',
    edition: 'National',
    date: 'Aug 11, 2026',
    page: 'Page 4',
    relevanceScore: 93,
    ministryTags: [
      { name: 'Ministry of Health & Family Welfare', confidence: 98 },
    ],
    sentiment: 'Mixed' as const,
    sentimentReason: 'Balanced reporting — acknowledges enrollment success while highlighting rural implementation gaps. Contains both positive data and constructive criticism.',
    crossReferences: 9,
    mediaType: 'Print' as const,
    region: 'Eastern India',
    fullBody: 'The Indian Express reports 4.2 crore new Ayushman Bharat 2.0 enrolments in Phase 1, with tribal and remote blocks still below target. Tone is mixed: volume is a success; empanelment gaps are the risk.\n\nHealth officers need both numbers in the same card — not a keyword “negative” dump.',
    estimatedReach: '15.7M',
    audience: ['National English', 'Health policy', 'State health desks'],
    spreadTimeline: [
      { day: 'Aug 10', outlet: 'MoHFW release', type: 'Official' },
      { day: 'Aug 11', outlet: 'Indian Express', type: 'National' },
      { day: 'Aug 12', outlet: 'Regional health pages', type: 'Follow' },
    ],
    relatedArticleIds: [4],
    historicalContext: 'Implementation-gap cycles harden if unanswered for a week even when overall numbers are strong.',
    detailedActions: [
      'State-wise empanelment table for six lagging states',
      'Beneficiary case notes via regional PIB, not only Delhi release',
    ],
    sourceUrl: 'https://indianexpress.com/article/ayushman-bharat-2',
  },
];

function clip(p: {
  id: number;
  headline: string;
  summary: string;
  source: string;
  ministry: string;
  ministry2?: string;
  region: string;
  mediaType: 'Print' | 'Television' | 'Digital' | 'Social Media';
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  edition?: string;
  date?: string;
  relevanceScore?: number;
}) {
  return {
    id: p.id,
    headline: p.headline,
    summary: p.summary,
    source: p.source,
    edition: p.edition ?? (p.mediaType === 'Print' ? 'National' : p.mediaType),
    date: p.date ?? 'Aug 12, 2026',
    page: p.mediaType === 'Print' ? 'Page 4' : 'N/A',
    relevanceScore: p.relevanceScore ?? 86,
    ministryTags: [
      { name: p.ministry, confidence: 93 },
      ...(p.ministry2 ? [{ name: p.ministry2, confidence: 76 }] : []),
    ],
    sentiment: p.sentiment,
    sentimentReason: 'Contextual classification of government-relevant coverage — not keyword matching.',
    crossReferences: 4,
    mediaType: p.mediaType,
    region: p.region,
    fullBody: p.summary,
    estimatedReach: '4.1M',
    audience: [p.region, p.mediaType],
    spreadTimeline: [{ day: p.date ?? 'Aug 12', outlet: p.source, type: 'Pickup' }],
    relatedArticleIds: [] as number[],
    historicalContext: 'Seeded so officers can filter every ministry, region, and medium in this mockup.',
    detailedActions: ['Include in morning brief if relevance remains high'],
    sourceUrl: `https://pib.gov.in/sentinel/clip/${p.id}`,
    aiFlag: undefined as string | undefined,
  };
}

const seedArticles = [
  clip({ id: 9, headline: 'GST collections hit a record Rs 2.1 lakh crore in July', summary: 'Finance Ministry data shows July GST at an all-time high, with strong e-way bill growth in Maharashtra and Gujarat.', source: 'CNBC-TV18', ministry: 'Ministry of Finance', region: 'Maharashtra & Gujarat', mediaType: 'Television', sentiment: 'Positive' }),
  clip({ id: 10, headline: 'Budget mid-year review: capex on track, states lag in matching grants', summary: 'Doordarshan panel on the mid-year review notes Union capex is on schedule while several states have not drawn matching grants.', source: 'DD News', ministry: 'Ministry of Finance', region: 'Hindi Belt', mediaType: 'Television', sentiment: 'Mixed' }),
  clip({ id: 11, headline: 'Tejas Mk2 first flight window confirmed for 2027', summary: 'MoD briefing on HAL production and flight-test calendar for Tejas Mk2, covered as a capability story not a scandal.', source: 'The Tribune', ministry: 'Ministry of Defence', region: 'Punjab & Haryana', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 12, headline: 'INS Vikrant deployment: Navy outreach on western seaboard', summary: 'Republic TV covers the carrier group off Gujarat with MoD clips on indigenous systems.', source: 'Republic', ministry: 'Ministry of Defence', region: 'Maharashtra & Gujarat', mediaType: 'Television', sentiment: 'Positive' }),
  clip({ id: 13, headline: 'Agniveer intake: Punjab cantonment towns report mixed family sentiment', summary: 'Local digital outlets in Ambala and Jalandhar carry family interviews; not a national crisis but a regional beat officers should see.', source: 'Punjab Kesari Digital', ministry: 'Ministry of Defence', region: 'Punjab & Haryana', mediaType: 'Digital', sentiment: 'Mixed' }),
  clip({ id: 14, headline: 'India–Japan 2+2: Tokyo commends Indo-Pacific logistics pact', summary: 'MEA readout picked up by south metro English and Japanese wires; vernacular still thin.', source: 'Deccan Herald', ministry: 'Ministry of External Affairs', ministry2: 'Ministry of Defence', region: 'South India', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 15, headline: 'Passport Seva backlog in Guwahati draws Assam TV debate', summary: 'Regional TV flags appointment delays; consular services story for MEA, not a foreign-policy attack.', source: 'News Live Assam', ministry: 'Ministry of External Affairs', region: 'Northeast', mediaType: 'Television', sentiment: 'Negative' }),
  clip({ id: 16, headline: 'X thread on ASEAN corridor jobs for Chennai SMEs gains 1.2M views', summary: 'Trade-benefit thread originating from exporter associations; useful pickup gap filler for MEA/Commerce.', source: 'X (Twitter)', ministry: 'Ministry of External Affairs', ministry2: 'Ministry of Commerce', region: 'South India', mediaType: 'Social Media', sentiment: 'Positive' }),
  clip({ id: 17, headline: 'AIIMS Bhubaneswar expansion: Odisha press on new cancer block', summary: 'State health pages treat this as delivery news with a wait-list caveat.', source: 'Sambad', ministry: 'Ministry of Health & Family Welfare', region: 'Eastern India', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 18, headline: 'YouTube explainers on Ayushman hospital empanelment in tribal belts', summary: 'Creator explainers in Santhali and Odia; Health desk should treat as mixed implementation coverage.', source: 'YouTube', ministry: 'Ministry of Health & Family Welfare', region: 'Eastern India', mediaType: 'Social Media', sentiment: 'Mixed' }),
  clip({ id: 19, headline: 'Kerala private hospitals seek Ayushman package revision', summary: 'Malayalam digital portals carry IMA Kerala statement; constructive industry pressure, not a scam story.', source: 'Onmanorama', ministry: 'Ministry of Health & Family Welfare', region: 'South India', mediaType: 'Digital', sentiment: 'Mixed' }),
  clip({ id: 20, headline: 'MSP procurement of paddy opens in Punjab with record mandi arrivals', summary: 'Agriculture story with local numbers; positive operations coverage for the ministry brief.', source: 'Ajit', ministry: 'Ministry of Agriculture', region: 'Punjab & Haryana', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 21, headline: 'PM-KISAN: Aadhaar seeding camps announced after Hindi belt complaints', summary: 'Follow-up to delay stories; Agriculture + Finance. TV pickup in Lucknow belt.', source: 'Aaj Tak', ministry: 'Ministry of Agriculture', ministry2: 'Ministry of Finance', region: 'Hindi Belt', mediaType: 'Television', sentiment: 'Mixed' }),
  clip({ id: 22, headline: 'Instagram reels on drip irrigation subsidy in Nashik vineyards', summary: 'Farmer-created content with high engagement; Agriculture should see this as positive vernacular pickup.', source: 'Instagram', ministry: 'Ministry of Agriculture', region: 'Maharashtra & Gujarat', mediaType: 'Social Media', sentiment: 'Positive' }),
  clip({ id: 23, headline: 'BharatNet Phase-III: 1,200 more gram panchayats lit in Assam', summary: 'MeitY numbers carried by Assam Tribune; fills the Digital India coverage gap in the Northeast.', source: 'Assam Tribune', ministry: 'Ministry of Electronics & IT', region: 'Northeast', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 24, headline: 'Digital India 3.0: connectivity still patchy in hill districts of Meghalaya', summary: 'Shillong digital outlet documents tower gaps; mixed, not a national attack.', source: 'The Shillong Times', ministry: 'Ministry of Electronics & IT', region: 'Northeast', mediaType: 'Digital', sentiment: 'Mixed' }),
  clip({ id: 25, headline: 'MeitY ONDC onboarding drive for Kirana stores — Facebook live from Pune', summary: 'Commerce-adjacent but tagged Electronics & IT for the platform story.', source: 'Facebook', ministry: 'Ministry of Electronics & IT', ministry2: 'Ministry of Commerce', region: 'Maharashtra & Gujarat', mediaType: 'Social Media', sentiment: 'Positive' }),
  clip({ id: 26, headline: 'EPFO additions: 18.6 lakh net subscribers in Q1', summary: 'Labour ministry statistical release; positive payroll proxy if explained against PLFS critique.', source: 'Business Standard', ministry: 'Ministry of Labour', ministry2: 'Ministry of Statistics', region: 'Hindi Belt', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 27, headline: 'MoSPI technical note on PLFS ICLS-19 alignment — still awaited, say editors', summary: 'Statistics-specific follow. Officers need this on the Statistics filter, not only Labour.', source: 'ThePrint', ministry: 'Ministry of Statistics', region: 'Hindi Belt', mediaType: 'Digital', sentiment: 'Negative' }),
  clip({ id: 28, headline: 'NSO data users’ conference: state governments ask for district-level dashboards', summary: 'Constructive coverage of statistical capacity; Statistics ministry brief.', source: 'The Telegraph', ministry: 'Ministry of Statistics', region: 'Eastern India', mediaType: 'Print', sentiment: 'Neutral' }),
  clip({ id: 29, headline: 'PLFS explainer clip by data journalists clocks 800K views on YouTube', summary: 'Methodology literacy content; Statistics + Labour. Tone mixed.', source: 'YouTube', ministry: 'Ministry of Statistics', ministry2: 'Ministry of Labour', region: 'South India', mediaType: 'Social Media', sentiment: 'Mixed' }),
  clip({ id: 30, headline: 'Export facilitation: RoDTEP rates unchanged, Gujarati press flags MSME wait', summary: 'Commerce story from Ahmedabad editions; mixed on process, not a boycott.', source: 'Gujarat Samachar', ministry: 'Ministry of Commerce', region: 'Maharashtra & Gujarat', mediaType: 'Print', sentiment: 'Mixed' }),
  clip({ id: 31, headline: 'GIFT City fund registrations — CNBC special from Gandhinagar', summary: 'Positive financial-centre coverage for Commerce/Finance desks.', source: 'CNBC-TV18', ministry: 'Ministry of Commerce', ministry2: 'Ministry of Finance', region: 'Maharashtra & Gujarat', mediaType: 'Television', sentiment: 'Positive' }),
  clip({ id: 32, headline: 'FASTag annual pass: NHAI clarifies toll rules after viral WhatsApp forward', summary: 'Road Transport operational story. Distinct from accident copy.', source: 'Times Now', ministry: 'Ministry of Road Transport', region: 'Hindi Belt', mediaType: 'Television', sentiment: 'Neutral', relevanceScore: 81 }),
  clip({ id: 33, headline: 'Mumbai–Nagpur expressway: local digital on land-acquisition closures', summary: 'Infrastructure implementation, not a crash. Road Transport filter.', source: 'Mid-Day Online', ministry: 'Ministry of Road Transport', region: 'Maharashtra & Gujarat', mediaType: 'Digital', sentiment: 'Mixed', relevanceScore: 84 }),
  clip({ id: 34, headline: 'Vande Bharat: new Ranchi–Howrah service covered in Bengali press', summary: 'Railways delivery story for Eastern India.', source: 'Anandabazar Patrika', ministry: 'Ministry of Railways', region: 'Eastern India', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 35, headline: 'Railway Board denies privatisation of 150 routes — fact-check pickup on TV', summary: 'Rebuttal to the misinfo item; Railways officers need this in the feed.', source: 'India Today TV', ministry: 'Ministry of Railways', region: 'Hindi Belt', mediaType: 'Television', sentiment: 'Neutral', relevanceScore: 90 }),
  clip({ id: 36, headline: 'Station redevelopment in Amritsar: heritage groups post site photos on Instagram', summary: 'Local pride mixed with stalling complaints; Railways Punjab desk.', source: 'Instagram', ministry: 'Ministry of Railways', region: 'Punjab & Haryana', mediaType: 'Social Media', sentiment: 'Mixed' }),
  clip({ id: 37, headline: 'MHA: new coastal security drill with Gujarat police', summary: 'Home ministry operational coverage, western seaboard.', source: 'Sandesh', ministry: 'Ministry of Home Affairs', region: 'Maharashtra & Gujarat', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 38, headline: 'Manipur reconciliation meetings: Imphal TV covers MHA interlocutor visit', summary: 'Sensitive Home ministry story; regional, not to be dropped from NE filter.', source: 'Impact TV Manipur', ministry: 'Ministry of Home Affairs', region: 'Northeast', mediaType: 'Television', sentiment: 'Mixed' }),
  clip({ id: 39, headline: 'Civil defence volunteer drive: Facebook posts from Lucknow zone', summary: 'Low-heat Home ministry outreach; Hindi belt social.', source: 'Facebook', ministry: 'Ministry of Home Affairs', region: 'Hindi Belt', mediaType: 'Social Media', sentiment: 'Neutral', relevanceScore: 72 }),
  clip({ id: 40, headline: 'MGNREGA: Rajasthan digital portals on delayed wage lists in 9 blocks', summary: 'Rural Development implementation. Distinct from the viral fund-diversion claim.', source: 'Patrika.com', ministry: 'Ministry of Rural Development', region: 'Hindi Belt', mediaType: 'Digital', sentiment: 'Negative', relevanceScore: 88 }),
  clip({ id: 41, headline: 'PMAY-G completions in Odisha tribal blocks — state TV package', summary: 'Rural housing delivery; Eastern India.', source: 'O TV', ministry: 'Ministry of Rural Development', region: 'Eastern India', mediaType: 'Television', sentiment: 'Positive' }),
  clip({ id: 42, headline: 'SHG bank linkage: Malayalam press on NRLM credit in Wayanad', summary: 'Rural Development positive vernacular in the south.', source: 'Mathrubhumi', ministry: 'Ministry of Rural Development', region: 'South India', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 43, headline: 'Reddit AMA on PLFS vs CMIE — high comment volume, critical tone', summary: 'Social listening sample for Labour/Statistics. Not a news report; still a spread signal.', source: 'Reddit', ministry: 'Ministry of Labour', region: 'South India', mediaType: 'Social Media', sentiment: 'Negative', relevanceScore: 74 }),
  clip({ id: 44, headline: 'Kohima: Digital India village demo covered by Nagaland Post', summary: 'Second Northeast print item for MeitY so the region filter is not a single card.', source: 'Nagaland Post', ministry: 'Ministry of Electronics & IT', region: 'Northeast', mediaType: 'Print', sentiment: 'Positive' }),
  clip({ id: 45, headline: 'Haryana Kisan Club Facebook group on MSP wheat bonus rumour', summary: 'Agriculture social; needs verification before brief. Punjab & Haryana quota.', source: 'Facebook', ministry: 'Ministry of Agriculture', region: 'Punjab & Haryana', mediaType: 'Social Media', sentiment: 'Mixed', relevanceScore: 70 }),
];

export const articles = [...coreArticles, ...seedArticles, ...buildCoverageArticles([...coreArticles, ...seedArticles])];

export const alerts = [
  {
    id: 1,
    title: 'Unemployment narrative gaining rapid traction on digital platforms',
    severity: 'HIGH' as const,
    description: 'Opposition-sourced employment counter-narrative has been amplified by 340% across YouTube, X (Twitter), and digital-first portals in the last 48 hours. Cross-referencing shows coordinated amplification patterns.',
    escalationProbability: 78,
    historicalMatch: 'Similar amplification pattern preceded the "Jobs Crisis" narrative cycle of Feb 2024, which sustained for 3 weeks.',
    timeToCritical: '24-48 hours',
    recommendation: 'Priority: Prepare data-backed factual explainer within 12 hours. Brief designated spokespeople. Coordinate with Ministry of Labour for official response.',
    source: 'Digital platforms, YouTube, X',
    timestamp: 'Aug 13, 2026 — 11:30 IST',
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    region: 'Hindi Belt',
  },
  {
    id: 2,
    title: 'PM-KISAN disbursement delays emerging as regional narrative in Hindi belt',
    severity: 'MEDIUM' as const,
    description: 'Ground-level reporting from UP and Bihar district editions indicates PM-KISAN 17th instalment delays in 14 districts. Story has been picked up by 5 publications so far with percolation indicators rising.',
    escalationProbability: 52,
    historicalMatch: 'Previous disbursement delay stories (Oct 2025) escalated to national coverage within 5 days when not addressed at regional level.',
    timeToCritical: '3-5 days',
    recommendation: 'Issue clarification through PIB regional offices. Coordinate with Agriculture Ministry for disbursement status update. Deploy field verification in affected districts.',
    source: 'Amar Ujala, Dainik Jagran, Dainik Bhaskar (district editions)',
    timestamp: 'Aug 13, 2026 — 09:15 IST',
    ministries: ['Ministry of Agriculture', 'Ministry of Finance'],
    region: 'Hindi Belt',
  },
  {
    id: 3,
    title: 'Misleading viral claim: "Government diverts MGNREGA funds to corporate subsidy"',
    severity: 'HIGH' as const,
    description: 'A viral social media post claiming MGNREGA funds are being diverted to corporate subsidies has garnered 2.3M impressions in 18 hours. The claim uses manipulated budget documents. Rapid fact-check required.',
    escalationProbability: 71,
    historicalMatch: 'Similar fund-diversion claims in Apr 2025 reached mainstream media within 72 hours when fact-check was delayed.',
    timeToCritical: '12-24 hours',
    recommendation: 'URGENT: Route to PIB Fact Check Unit immediately. Prepare visual debunking material with actual budget allocation data. Coordinate social media counter-narrative.',
    source: 'X (Twitter), Facebook, WhatsApp forwards',
    timestamp: 'Aug 13, 2026 — 14:00 IST',
    ministries: ['Ministry of Labour', 'Ministry of Rural Development'],
    region: 'Hindi Belt',
  },
  {
    id: 4,
    title: 'Consistent critical coverage of Ayushman Bharat rural implementation',
    severity: 'MEDIUM' as const,
    description: 'Regional press in 6 states running stories on Ayushman Bharat hospital empanelment gaps in rural areas. While tone is constructive, sustained coverage without response risks narrative hardening.',
    escalationProbability: 44,
    historicalMatch: 'No strong historical match. Pattern is typical of implementation-gap reporting cycles.',
    timeToCritical: '5-7 days',
    recommendation: 'Prepare state-wise implementation success data. Push beneficiary impact stories through PIB regional units. Coordinate with Health Ministry for gap-closure timeline.',
    source: 'Regional print editions (Hindi, Tamil, Telugu)',
    timestamp: 'Aug 12, 2026 — 16:45 IST',
    ministries: ['Ministry of Health & Family Welfare'],
    region: 'South India',
  },
  {
    id: 5,
    title: 'Digital India coverage gap in Northeast media',
    severity: 'LOW' as const,
    description: 'Despite significant broadband connectivity achievements in NE states, regional media coverage of Digital India 3.0 is 68% below national average. Risk of narrative vacuum being filled by critical voices.',
    escalationProbability: 25,
    historicalMatch: 'NE coverage gaps have previously been exploited by opposition narratives within 2-3 weeks.',
    timeToCritical: '2-3 weeks',
    recommendation: 'Proactive push: Organize NE media briefing with MeitY. Deploy beneficiary stories from connected villages. Consider PIB NE social media campaign.',
    source: 'Coverage gap analysis',
    timestamp: 'Aug 11, 2026 — 10:00 IST',
    ministries: ['Ministry of Electronics & IT'],
    region: 'Northeast',
  },
  ...extraAlerts,
];

export const regionData = [
  {
    name: 'Hindi Belt',
    states: 'UP, MP, Bihar, Rajasthan, Jharkhand, Uttarakhand, Chhattisgarh',
    volume: 1840,
    volumeLabel: 'Very High',
    sentiment: 'Positive' as const,
    sentimentScore: 72,
    keyInsight: 'Strong PM messaging uptake; PM-KISAN delay is emerging risk in UP/Bihar',
    coverageGap: false,
    topSources: ['Dainik Jagran', 'Amar Ujala', 'Dainik Bhaskar', 'Hindustan (Hindi)'],
  },
  {
    name: 'Maharashtra & Gujarat',
    states: 'Maharashtra, Gujarat, Goa',
    volume: 920,
    volumeLabel: 'High',
    sentiment: 'Mixed' as const,
    sentimentScore: 58,
    keyInsight: 'Urban digital voices critical on employment; Marathi press largely neutral on infrastructure push',
    coverageGap: false,
    topSources: ['Loksatta', 'Maharashtra Times', 'Gujarat Samachar', 'Mid-Day'],
  },
  {
    name: 'South India',
    states: 'Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana',
    volume: 780,
    volumeLabel: 'Medium',
    sentiment: 'Neutral-Critical' as const,
    sentimentScore: 42,
    keyInsight: 'Opposition media dominates in TN/Kerala; Karnataka coverage more balanced. Vernacular coverage gap identified.',
    coverageGap: true,
    topSources: ['The Hindu', 'Deccan Herald', 'Mathrubhumi', 'Eenadu'],
  },
  {
    name: 'Northeast',
    states: 'Assam, Meghalaya, Manipur, Nagaland, Mizoram, Tripura, Arunachal, Sikkim',
    volume: 340,
    volumeLabel: 'Medium',
    sentiment: 'Positive' as const,
    sentimentScore: 68,
    keyInsight: 'Development narrative resonating well; Digital India coverage significantly below national average',
    coverageGap: true,
    topSources: ['The Sentinel', 'Assam Tribune', 'Nagaland Post'],
  },
  {
    name: 'Punjab & Haryana',
    states: 'Punjab, Haryana, Himachal Pradesh, J&K',
    volume: 520,
    volumeLabel: 'Medium',
    sentiment: 'Mixed' as const,
    sentimentScore: 51,
    keyInsight: 'Agricultural policy commentary dominates; MSP discussions ongoing. Defence coverage positive near cantonment areas.',
    coverageGap: false,
    topSources: ['Tribune', 'Punjabi Jagran', 'Ajit'],
  },
  {
    name: 'Eastern India',
    states: 'West Bengal, Odisha',
    volume: 420,
    volumeLabel: 'Medium',
    sentiment: 'Neutral' as const,
    sentimentScore: 50,
    keyInsight: 'Bengali media focused on state politics; Odisha press covering infrastructure projects positively',
    coverageGap: false,
    topSources: ['Anandabazar Patrika', 'The Telegraph', 'Sambad', 'Dharitri'],
  },
];

export const messagePenetration = [
  {
    message: 'Gati Shakti 2.0 — Integrated infrastructure for growth',
    pickupNational: 92,
    pickupRegional: 61,
    pickupDigital: 78,
    gap: 'Regional vernacular coverage at 61% — below 75% target',
    action: 'Translate and distribute regional press releases in 12 languages',
    priority: 'HIGH' as const,
    ministry: 'Ministry of Finance',
    region: 'Hindi Belt',
  },
  {
    message: 'Ayushman Bharat expansion — Healthcare for all',
    pickupNational: 85,
    pickupRegional: 72,
    pickupDigital: 68,
    gap: 'Digital narrative being overtaken by implementation criticism',
    action: 'Push beneficiary success stories on social media; digital-first content strategy',
    priority: 'MEDIUM' as const,
    ministry: 'Ministry of Health & Family Welfare',
    region: 'Eastern India',
  },
  {
    message: 'India\'s global leadership — ASEAN trade corridor',
    pickupNational: 88,
    pickupRegional: 34,
    pickupDigital: 71,
    gap: 'Severe vernacular gap — regional press at 34%. Story perceived as "elite English media" narrative',
    action: 'Local impact angles: jobs created, SME export benefits. Vernacular op-eds by trade experts',
    priority: 'HIGH' as const,
    ministry: 'Ministry of External Affairs',
    region: 'South India',
  },
  {
    message: 'Digital India 3.0 — Rural broadband connectivity',
    pickupNational: 65,
    pickupRegional: 48,
    pickupDigital: 82,
    gap: 'National print below target; NE regional coverage critically low at 22%',
    action: 'NE media briefing; village-level success story campaign; infographic distribution',
    priority: 'MEDIUM' as const,
    ministry: 'Ministry of Electronics & IT',
    region: 'Northeast',
  },
  {
    message: 'Employment generation — MUDRA and Startup India results',
    pickupNational: 45,
    pickupRegional: 28,
    pickupDigital: 38,
    gap: 'Severely under-reported across all channels. Counter-narrative dominating the employment space.',
    action: 'URGENT: Proactive data campaign with district-level job creation numbers. Beneficiary testimonials.',
    priority: 'CRITICAL' as const,
    ministry: 'Ministry of Labour',
    region: 'Hindi Belt',
  },
  ...extraPenetration,
];

export const misinfoItems = [
  {
    id: 1,
    claim: '"Government diverts MGNREGA funds to corporate subsidies"',
    sourceType: 'Social Media (X, Facebook)',
    spread: 'High — 2.3M impressions',
    spreadLevel: 'high' as const,
    verificationStatus: 'FALSE — Manipulated document' as const,
    action: 'Issue visual fact-check with actual budget allocation breakdown. Flag for platform takedown.',
    detectedAt: 'Aug 13, 2026 — 08:20 IST',
    ministries: ['Ministry of Labour'],
    region: 'Hindi Belt',
  },
  {
    id: 2,
    claim: '"PM misquoted on economic growth targets at ASEAN summit"',
    sourceType: 'YouTube, Digital portals',
    spread: 'Medium — 450K views',
    spreadLevel: 'medium' as const,
    verificationStatus: 'MISLEADING — Quote taken out of context' as const,
    action: 'Release full transcript and video clip with correct context. Distribute to fact-check networks.',
    detectedAt: 'Aug 12, 2026 — 14:30 IST',
    ministries: ['Ministry of External Affairs'],
    region: 'South India',
  },
  {
    id: 3,
    claim: '"Old flood footage from 2023 shared as current Kerala disaster"',
    sourceType: 'WhatsApp, X (Twitter)',
    spread: 'Medium — 800K shares',
    spreadLevel: 'medium' as const,
    verificationStatus: 'FALSE — Reverse image search confirms 2023 origin' as const,
    action: 'Issue PIB Fact Check tweet with image comparison. Coordinate with Kerala PIB office.',
    detectedAt: 'Aug 11, 2026 — 11:45 IST',
    ministries: ['Ministry of Home Affairs'],
    region: 'South India',
  },
  {
    id: 4,
    claim: '"Railway privatisation of 150 routes confirmed by Railway Board"',
    sourceType: 'Small news portals, Facebook pages',
    spread: 'Low-Medium — 120K reach',
    spreadLevel: 'low' as const,
    verificationStatus: 'FALSE — No such decision taken' as const,
    action: 'Issue official Railway Ministry clarification. Monitor for re-emergence.',
    detectedAt: 'Aug 10, 2026 — 09:00 IST',
    ministries: ['Ministry of Railways'],
    region: 'Hindi Belt',
  },
  ...extraMisinfo,
];

export const crossPlatformData = {
  print: {
    totalArticles: 2847,
    positive: 44,
    neutral: 33,
    negative: 12,
    mixed: 11,
    topSources: [
      { name: 'Times of India', articles: 342, sentiment: 'Positive' },
      { name: 'Dainik Jagran', articles: 298, sentiment: 'Positive' },
      { name: 'The Hindu', articles: 215, sentiment: 'Neutral' },
      { name: 'Hindustan Times', articles: 198, sentiment: 'Positive' },
      { name: 'Indian Express', articles: 187, sentiment: 'Mixed' },
    ],
  },
  television: {
    totalMentions: 892,
    totalAirtime: '43.5 hours',
    positive: 38,
    neutral: 28,
    negative: 18,
    mixed: 16,
    topChannels: [
      { name: 'DD News', mentions: 145, sentiment: 'Positive' },
      { name: 'NDTV', mentions: 112, sentiment: 'Mixed' },
      { name: 'Republic', mentions: 98, sentiment: 'Positive' },
      { name: 'India Today TV', mentions: 87, sentiment: 'Neutral' },
      { name: 'Aaj Tak', mentions: 76, sentiment: 'Mixed' },
    ],
  },
  digital: {
    totalArticles: 1205,
    positive: 35,
    neutral: 30,
    negative: 20,
    mixed: 15,
    topPortals: [
      { name: 'NDTV.com', articles: 156, sentiment: 'Mixed' },
      { name: 'ThePrint', articles: 134, sentiment: 'Mixed' },
      { name: 'LiveMint', articles: 121, sentiment: 'Neutral' },
      { name: 'Firstpost', articles: 98, sentiment: 'Neutral' },
      { name: 'The Wire', articles: 87, sentiment: 'Critical' },
    ],
  },
  social: {
    totalMentions: 284_000,
    totalEngagement: '12.4M',
    positive: 32,
    neutral: 25,
    negative: 28,
    mixed: 15,
    topPlatforms: [
      { name: 'X (Twitter)', mentions: '142K', sentiment: 'Mixed' },
      { name: 'YouTube', mentions: '68K', sentiment: 'Mixed' },
      { name: 'Facebook', mentions: '45K', sentiment: 'Positive' },
      { name: 'Instagram', mentions: '18K', sentiment: 'Positive' },
      { name: 'Reddit', mentions: '11K', sentiment: 'Critical' },
    ],
  },
};

export const ministryBriefing = {
  ministry: 'Ministry of Finance',
  date: 'August 13, 2026',
  generatedAt: '09:00 IST',
  overallSentiment: 'Positive-Mixed',
  coverageVolume: 847,
  keyHighlights: [
    'Gati Shakti 2.0 cabinet approval received overwhelmingly positive coverage across 14 outlets (national and regional)',
    'PLFS unemployment methodology critique gaining traction — currently in 11 outlets with rising digital amplification',
    'PM-KISAN disbursement delays reported in 14 UP/Bihar districts — requires coordination with Agriculture Ministry',
    'India-ASEAN trade corridor coverage positive but vernacular penetration at only 34%',
  ],
  talkingPoints: [
    'Gati Shakti 2.0 integrates 16 ministries under unified logistics framework — emphasize job creation potential (estimated 3.2 lakh direct jobs)',
    'On unemployment methodology: PLFS follows ILO-recommended ICLS-19 framework — prepare technical comparison document',
    'Budget allocation for infrastructure has increased 4x since 2019 — use comparative visuals',
  ],
  mediaAdvisory: [
    'URGENT: Prepare response to PLFS methodology criticism before evening news cycles',
    'Schedule regional media briefings for Gati Shakti 2.0 in Hindi belt (priority) and South India (coverage gap)',
    'Coordinate with MoL for joint press note on employment data methodology',
  ],
  riskItems: [
    'Employment counter-narrative has 78% escalation probability — monitor closely',
    'MGNREGA fund diversion misinformation (2.3M impressions) — fact-check in progress',
  ],
};

export const ministryBriefings: Record<string, typeof ministryBriefing> = {
  ...buildMinistryBriefings(),
  'Ministry of Finance': ministryBriefing,
};

export const percolationData = [
  {
    id: 2,
    narrative: 'Unemployment methodology concerns',
    timeline: [
      { day: 'Aug 8', outlet: 'The Wire (Digital)', type: 'First Report' },
      { day: 'Aug 9', outlet: 'Mint (Print)', type: 'Amplification' },
      { day: 'Aug 10', outlet: 'Indian Express', type: 'Editorial' },
      { day: 'Aug 11', outlet: 'NDTV (TV)', type: 'Panel Discussion' },
      { day: 'Aug 12', outlet: 'Congress Press Conference', type: 'Political Pickup' },
      { day: 'Aug 13', outlet: 'Dainik Jagran, Amar Ujala', type: 'Regional Spread' },
    ],
    status: 'ESCALATING' as const,
    velocity: 'High',
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    regions: ['Hindi Belt', 'Maharashtra & Gujarat', 'South India'],
    media: ['Print', 'Digital', 'Television', 'Social Media'],
  },
  {
    id: 1,
    narrative: 'Gati Shakti 2.0 announcement',
    timeline: [
      { day: 'Aug 11', outlet: 'PTI Wire', type: 'First Report' },
      { day: 'Aug 11', outlet: 'All National Dailies', type: 'Front Page' },
      { day: 'Aug 12', outlet: 'Regional Hindi Press', type: 'Translation' },
      { day: 'Aug 12', outlet: 'Business Channels', type: 'Analysis' },
      { day: 'Aug 13', outlet: 'International Media', type: 'Global Coverage' },
    ],
    status: 'SATURATED' as const,
    velocity: 'Peaked',
    ministries: ['Ministry of Finance', 'Ministry of Commerce'],
    regions: ['Hindi Belt', 'Maharashtra & Gujarat', 'South India'],
    media: ['Print', 'Television', 'Digital'],
  },
  {
    id: 3,
    narrative: 'India–ASEAN trade corridor',
    timeline: [
      { day: 'Aug 11', outlet: 'MEA briefing', type: 'Official' },
      { day: 'Aug 12', outlet: 'The Hindu', type: 'National' },
      { day: 'Aug 13', outlet: 'X / exporter threads', type: 'Social' },
      { day: 'Aug 13', outlet: 'International wires', type: 'Global' },
    ],
    status: 'STABLE' as const,
    velocity: 'Steady',
    ministries: ['Ministry of External Affairs', 'Ministry of Commerce'],
    regions: ['South India', 'Maharashtra & Gujarat'],
    media: ['Print', 'Digital', 'Social Media'],
  },
  {
    id: 4,
    narrative: 'Ayushman Bharat 2.0 implementation',
    timeline: [
      { day: 'Aug 10', outlet: 'MoHFW release', type: 'Official' },
      { day: 'Aug 11', outlet: 'Indian Express', type: 'National' },
      { day: 'Aug 12', outlet: 'Odisha / Kerala press', type: 'Regional' },
      { day: 'Aug 13', outlet: 'YouTube explainers', type: 'Social' },
    ],
    status: 'STABLE' as const,
    velocity: 'Steady',
    ministries: ['Ministry of Health & Family Welfare'],
    regions: ['Eastern India', 'South India', 'Hindi Belt'],
    media: ['Print', 'Digital', 'Social Media'],
  },
  {
    id: 5,
    narrative: 'Digital India 3.0 in the Northeast',
    timeline: [
      { day: 'Aug 9', outlet: 'MeitY', type: 'Release' },
      { day: 'Aug 11', outlet: 'Assam Tribune', type: 'Regional' },
      { day: 'Aug 12', outlet: 'Shillong Times', type: 'Gap report' },
      { day: 'Aug 13', outlet: 'Nagaland Post', type: 'Village demo' },
    ],
    status: 'STABLE' as const,
    velocity: 'Low',
    ministries: ['Ministry of Electronics & IT'],
    regions: ['Northeast'],
    media: ['Print', 'Digital'],
  },
  {
    id: 6,
    narrative: 'Defence procurement and Tejas Mk2',
    timeline: [
      { day: 'Aug 10', outlet: 'MoD PRO', type: 'Brief' },
      { day: 'Aug 11', outlet: 'The Tribune', type: 'Print' },
      { day: 'Aug 12', outlet: 'Republic TV', type: 'Broadcast' },
      { day: 'Aug 13', outlet: 'Punjab digital', type: 'Agniveer' },
    ],
    status: 'STABLE' as const,
    velocity: 'Steady',
    ministries: ['Ministry of Defence'],
    regions: ['Punjab & Haryana', 'Maharashtra & Gujarat', 'South India'],
    media: ['Print', 'Television', 'Digital'],
  },
  ...extraPercolation,
].map((p) => ({
  ...p,
  regions: [...new Set([...p.regions, ...GRID_REGIONS])],
  media: [...new Set([...p.media, ...GRID_MEDIA])],
}));

export const narrativeDetails: Record<number, {
  status: 'ESCALATING' | 'SATURATED' | 'STABLE';
  outletBreakdown: { outlet: string; tone: string; reach: string }[];
  timeline: { day: string; outlet: string; type: string }[];
  ministryImpact: { name: string; confidence: number }[];
  velocitySeries: { day: string; mentions: number }[];
  historicalPattern: string;
  response: { priority: string; timeline: string; spokesperson: string; notes: string };
  sourceArticleIds: number[];
}> = {
  1: {
    status: 'SATURATED',
    outletBreakdown: [
      { outlet: 'Times of India', tone: 'Positive', reach: '8.4M' },
      { outlet: 'Dainik Jagran', tone: 'Positive', reach: '6.1M' },
      { outlet: 'The Hindu', tone: 'Neutral', reach: '3.2M' },
      { outlet: 'Mint', tone: 'Positive', reach: '2.8M' },
      { outlet: 'DD News', tone: 'Positive', reach: '4.0M' },
    ],
    timeline: [
      { day: 'Aug 11 09:00', outlet: 'PTI', type: 'Wire' },
      { day: 'Aug 11 11:00', outlet: 'National dailies', type: 'Front page' },
      { day: 'Aug 12', outlet: 'Hindi press', type: 'Translation' },
      { day: 'Aug 12', outlet: 'Business TV', type: 'Analysis' },
      { day: 'Aug 13', outlet: 'International', type: 'Global' },
    ],
    ministryImpact: [
      { name: 'Ministry of Finance', confidence: 96 },
      { name: 'Ministry of Commerce', confidence: 88 },
      { name: 'Ministry of Railways', confidence: 72 },
      { name: 'Ministry of Road Transport', confidence: 70 },
    ],
    velocitySeries: [
      { day: 'Aug 7', mentions: 30 },
      { day: 'Aug 8', mentions: 45 },
      { day: 'Aug 9', mentions: 62 },
      { day: 'Aug 10', mentions: 78 },
      { day: 'Aug 11', mentions: 85 },
      { day: 'Aug 12', mentions: 91 },
      { day: 'Aug 13', mentions: 88 },
    ],
    historicalPattern: 'Matches Gati Shakti 1.0 (Oct 2021): national saturation in 36 hours, then plateau. Risk is vernacular fade, not backlash.',
    response: {
      priority: 'Sustain',
      timeline: 'This week',
      spokesperson: 'DPIIT / Finance additional secretary',
      notes: 'Shift from announcement to district job and corridor maps. Do not over-brief English desks.',
    },
    sourceArticleIds: [1, 5],
  },
  2: {
    status: 'ESCALATING',
    outletBreakdown: [
      { outlet: 'Mint', tone: 'Critical', reach: '4.1M' },
      { outlet: 'The Wire', tone: 'Critical', reach: '1.9M' },
      { outlet: 'NDTV', tone: 'Critical', reach: '6.8M' },
      { outlet: 'Indian Express', tone: 'Mixed', reach: '3.5M' },
      { outlet: 'Dainik Jagran', tone: 'Critical', reach: '5.2M' },
    ],
    timeline: [
      { day: 'Aug 8', outlet: 'The Wire', type: 'First report' },
      { day: 'Aug 9', outlet: 'Mint', type: 'National print' },
      { day: 'Aug 10', outlet: 'Indian Express', type: 'Editorial' },
      { day: 'Aug 11', outlet: 'NDTV', type: 'Panel' },
      { day: 'Aug 12', outlet: 'Congress briefing', type: 'Political' },
      { day: 'Aug 13', outlet: 'Hindi dailies', type: 'Regional' },
    ],
    ministryImpact: [
      { name: 'Ministry of Labour', confidence: 95 },
      { name: 'Ministry of Statistics', confidence: 91 },
    ],
    velocitySeries: [
      { day: 'Aug 7', mentions: 10 },
      { day: 'Aug 8', mentions: 18 },
      { day: 'Aug 9', mentions: 32 },
      { day: 'Aug 10', mentions: 45 },
      { day: 'Aug 11', mentions: 58 },
      { day: 'Aug 12', mentions: 72 },
      { day: 'Aug 13', mentions: 81 },
    ],
    historicalPattern: 'Same sequence as Feb 2024 jobs cycle: specialist digital → Mint → TV → political conference → Hindi belt. Unbriefed, that cycle lasted 3 weeks.',
    response: {
      priority: 'Immediate',
      timeline: '12 hours',
      spokesperson: 'MoSPI + Labour joint briefing',
      notes: 'Technical comparison of PLFS series. Do not debate the party film.',
    },
    sourceArticleIds: [2, 6],
  },
  3: {
    status: 'STABLE',
    outletBreakdown: [
      { outlet: 'The Hindu', tone: 'Positive', reach: '3.2M' },
      { outlet: 'Times of India', tone: 'Positive', reach: '2.1M' },
      { outlet: 'Eenadu', tone: 'Neutral', reach: '0.8M' },
    ],
    timeline: [
      { day: 'Aug 11', outlet: 'MEA', type: 'Briefing' },
      { day: 'Aug 12', outlet: 'The Hindu', type: 'National' },
      { day: 'Aug 13', outlet: 'Wires', type: 'Global' },
    ],
    ministryImpact: [
      { name: 'Ministry of External Affairs', confidence: 93 },
      { name: 'Ministry of Commerce', confidence: 90 },
    ],
    velocitySeries: [
      { day: 'Aug 7', mentions: 20 },
      { day: 'Aug 8', mentions: 35 },
      { day: 'Aug 9', mentions: 42 },
      { day: 'Aug 10', mentions: 48 },
      { day: 'Aug 11', mentions: 45 },
      { day: 'Aug 12', mentions: 43 },
      { day: 'Aug 13', mentions: 40 },
    ],
    historicalPattern: 'Trade agreements stall in English press unless local export jobs are supplied.',
    response: {
      priority: 'Vernacular push',
      timeline: '3 days',
      spokesperson: 'Commerce / MEA',
      notes: 'Port and SME angles for Tamil, Telugu, Malayalam desks.',
    },
    sourceArticleIds: [5],
  },
  4: {
    status: 'STABLE',
    outletBreakdown: [
      { outlet: 'Indian Express', tone: 'Mixed', reach: '3.8M' },
      { outlet: 'Regional health pages', tone: 'Mixed', reach: '2.4M' },
    ],
    timeline: [
      { day: 'Aug 10', outlet: 'MoHFW', type: 'Release' },
      { day: 'Aug 11', outlet: 'Indian Express', type: 'National' },
      { day: 'Aug 12', outlet: 'State pages', type: 'Follow' },
    ],
    ministryImpact: [{ name: 'Ministry of Health & Family Welfare', confidence: 98 }],
    velocitySeries: [
      { day: 'Aug 7', mentions: 15 },
      { day: 'Aug 8', mentions: 22 },
      { day: 'Aug 9', mentions: 28 },
      { day: 'Aug 10', mentions: 35 },
      { day: 'Aug 11', mentions: 42 },
      { day: 'Aug 12', mentions: 48 },
      { day: 'Aug 13', mentions: 52 },
    ],
    historicalPattern: 'Mixed implementation stories harden without state-wise tables.',
    response: {
      priority: 'Monitor',
      timeline: '5 days',
      spokesperson: 'Health additional secretary',
      notes: 'Empanelment data for six lagging states.',
    },
    sourceArticleIds: [8],
  },
  5: {
    status: 'STABLE',
    outletBreakdown: [
      { outlet: 'National digital', tone: 'Mixed', reach: '2.0M' },
      { outlet: 'NE press', tone: 'Neutral', reach: '0.3M' },
    ],
    timeline: [
      { day: 'Aug 9', outlet: 'MeitY', type: 'Release' },
      { day: 'Aug 11', outlet: 'National digital', type: 'Pickup' },
    ],
    ministryImpact: [{ name: 'Ministry of Electronics & IT', confidence: 90 }],
    velocitySeries: [
      { day: 'Aug 7', mentions: 25 },
      { day: 'Aug 8', mentions: 30 },
      { day: 'Aug 9', mentions: 28 },
      { day: 'Aug 10', mentions: 35 },
      { day: 'Aug 11', mentions: 38 },
      { day: 'Aug 12', mentions: 41 },
      { day: 'Aug 13', mentions: 44 },
    ],
    historicalPattern: 'NE coverage vacuums fill with critical copy within 2–3 weeks.',
    response: {
      priority: 'Fill gap',
      timeline: '2 weeks',
      spokesperson: 'MeitY regional',
      notes: 'Guwahati briefing; village connectivity case notes.',
    },
    sourceArticleIds: [],
  },
  6: {
    status: 'STABLE',
    outletBreakdown: [
      { outlet: 'Defence beat', tone: 'Positive', reach: '1.6M' },
      { outlet: 'Punjab press', tone: 'Positive', reach: '0.9M' },
    ],
    timeline: [
      { day: 'Aug 10', outlet: 'MoD', type: 'Brief' },
      { day: 'Aug 12', outlet: 'Defence pages', type: 'Follow' },
    ],
    ministryImpact: [{ name: 'Ministry of Defence', confidence: 94 }],
    velocitySeries: [
      { day: 'Aug 7', mentions: 18 },
      { day: 'Aug 8', mentions: 22 },
      { day: 'Aug 9', mentions: 25 },
      { day: 'Aug 10', mentions: 30 },
      { day: 'Aug 11', mentions: 28 },
      { day: 'Aug 12', mentions: 32 },
      { day: 'Aug 13', mentions: 35 },
    ],
    historicalPattern: 'Procurement coverage stays specialist unless linked to Aero India calendar.',
    response: {
      priority: 'Maintain',
      timeline: 'Routine',
      spokesperson: 'MoD PRO',
      notes: 'Hold line; plan Aero India 2027 media calendar.',
    },
    sourceArticleIds: [],
  },
  ...extraNarrativeDetails(),
};

export const sidebarItems = [
  { id: 'command-center', label: 'Command Center', icon: 'LayoutDashboard' },
  { id: 'media-feed', label: 'Media Coverage', icon: 'Newspaper' },
  { id: 'narratives', label: 'Narratives', icon: 'GitBranch' },
  { id: 'regional', label: 'Regional Coverage', icon: 'Map' },
  { id: 'early-warning', label: 'Alerts', icon: 'AlertTriangle' },
  { id: 'cross-platform', label: 'Cross-Platform', icon: 'Monitor' },
  { id: 'penetration', label: 'Message Penetration', icon: 'Radio' },
  { id: 'misinfo', label: 'Misinformation Watch', icon: 'ShieldAlert' },
  { id: 'briefing', label: 'Ministry Briefing', icon: 'FileText' },
];

export type Article = (typeof articles)[number] & {
  aiFlag?: string;
  clusterId?: number;
  outletStance?: OutletStance;
};
export type Narrative = (typeof narratives)[number];

export function mediaFilterKey(media: string): 'print' | 'television' | 'digital' | 'social' | null {
  if (media === 'Print') return 'print';
  if (media === 'Television') return 'television';
  if (media === 'Digital') return 'digital';
  if (media === 'Social Media') return 'social';
  return null;
}

// ---------------------------------------------------------------------------
// Iteration 3: Genuine Score, Story Clusters, Executive Digest, Priority Pin,
// Ask Sentinel responses
// ---------------------------------------------------------------------------

export type LanguageMarker = 'Factual' | 'Analytical' | 'Emotive' | 'Propagandistic';
export type OutletStance = 'Factual' | 'Amplifying' | 'Sceptical' | 'Critical' | 'Wire copy';

export interface GenuineFactors {
  sourceCred: number;
  corroboration: number;
  languageBias: number;
  factCheckHistory: number;
  deepfakeLikelihood: number | null;
}

export interface GenuineData {
  score: number;
  factors: GenuineFactors;
  marker: LanguageMarker;
  note: string;
}

// Per-outlet base credibility used as the source-cred factor for Genuine.
export const outletCredibility: Record<string, number> = {
  'Times of India': 88,
  'The Hindu': 92,
  'Indian Express': 90,
  'Hindustan Times': 84,
  'Mint': 89,
  'Business Standard': 90,
  'CNBC-TV18': 84,
  'DD News': 82,
  'Dainik Jagran': 80,
  'Amar Ujala': 80,
  'Dainik Bhaskar': 79,
  'The Tribune': 83,
  'Deccan Herald': 85,
  'The Telegraph': 83,
  'The Telegraph Online': 80,
  'Sun News': 70,
  'Zee Punjab Haryana': 68,
  'Anandabazar Patrika': 82,
  'Sambad': 78,
  'Mathrubhumi': 84,
  'Onmanorama': 78,
  'The Sentinel': 76,
  'Assam Tribune': 78,
  'Nagaland Post': 75,
  'The Shillong Times': 74,
  'News Live Assam': 72,
  'Impact TV Manipur': 68,
  'O TV': 72,
  'Punjab Kesari Digital': 66,
  'Republic': 60,
  'NDTV': 68,
  'India Today TV': 72,
  'Aaj Tak': 68,
  'Times Now': 65,
  'ThePrint': 75,
  'The Wire': 62,
  'Firstpost': 68,
  'Ajit': 78,
  'Sandesh': 74,
  'Gujarat Samachar': 75,
  'Patrika.com': 68,
  'Mid-Day Online': 66,
  'YouTube': 45,
  'X (Twitter)': 40,
  'Facebook': 38,
  'Instagram': 42,
  'Reddit': 45,
  'Hindustan Times (Delhi ad)': 15,
};

function baseCred(source: string): number {
  return outletCredibility[source] ?? 60;
}

// Hand-authored Genuine data keyed by article id — deterministic, demo-friendly.
export const articleGenuine: Record<number, GenuineData> = {
  1: {
    score: 92,
    factors: { sourceCred: 88, corroboration: 96, languageBias: 90, factCheckHistory: 92, deepfakeLikelihood: null },
    marker: 'Factual',
    note: 'Front-page policy reporting cross-referenced by 12 outlets. Language is descriptive, not persuasive.',
  },
  2: {
    score: 78,
    factors: { sourceCred: 89, corroboration: 72, languageBias: 68, factCheckHistory: 88, deepfakeLikelihood: null },
    marker: 'Analytical',
    note: 'Substantive expert critique. Named sources, reproducible arithmetic. Language leans directive but stays within analytical bounds.',
  },
  3: {
    score: 22,
    factors: { sourceCred: 80, corroboration: 8, languageBias: 62, factCheckHistory: 80, deepfakeLikelihood: null },
    marker: 'Factual',
    note: 'Local incident report. Zero corroboration outside one city page. Not a ministry-relevant signal.',
  },
  4: {
    score: 74,
    factors: { sourceCred: 80, corroboration: 62, languageBias: 78, factCheckHistory: 78, deepfakeLikelihood: null },
    marker: 'Factual',
    note: 'District-level implementation reporting with named blocks and cited causes. Ground-truth reliable; regional scope.',
  },
  5: {
    score: 88,
    factors: { sourceCred: 92, corroboration: 82, languageBias: 88, factCheckHistory: 92, deepfakeLikelihood: null },
    marker: 'Analytical',
    note: 'Diplomatic analysis with named projections. High-credibility outlet, corroborated by wires.',
  },
  6: {
    score: 58,
    factors: { sourceCred: 68, corroboration: 74, languageBias: 42, factCheckHistory: 70, deepfakeLikelihood: 20 },
    marker: 'Emotive',
    note: 'Political counter-narrative on a live TV outlet. Emotive framing; comparable data exists but is contested.',
  },
  7: {
    score: 15,
    factors: { sourceCred: 15, corroboration: 0, languageBias: 30, factCheckHistory: 60, deepfakeLikelihood: null },
    marker: 'Propagandistic',
    note: 'Commercial advertisement. No editorial content. Suppress from ministry queues.',
  },
  8: {
    score: 86,
    factors: { sourceCred: 90, corroboration: 84, languageBias: 84, factCheckHistory: 90, deepfakeLikelihood: null },
    marker: 'Factual',
    note: 'Balanced enrolment reporting with named lagging states. High corroboration in follow-up cycles.',
  },
};

// Cluster ids that group same real-world event across outlets.
export const articleClusterMap: Record<number, number> = {
  // Gati Shakti 2.0 cluster
  1: 1,
  9: 1,
  10: 1,
  31: 1,
  // PLFS / employment cluster
  2: 2,
  6: 2,
  26: 2,
  27: 2,
  29: 2,
  43: 2,
  // PM-KISAN disbursement cluster
  4: 3,
  21: 3,
  // Ayushman Bharat cluster
  8: 4,
  17: 4,
  18: 4,
  19: 4,
  // India-ASEAN cluster
  5: 5,
  14: 5,
  16: 5,
  // Digital India NE cluster
  23: 6,
  24: 6,
  44: 6,
  // Defence procurement cluster
  11: 7,
  12: 7,
  13: 7,
};

// Per-article outlet stance for the stance-compare view.
export const articleStanceMap: Record<number, OutletStance> = {
  1: 'Factual',
  5: 'Factual',
  9: 'Amplifying',
  10: 'Sceptical',
  31: 'Amplifying',
  2: 'Sceptical',
  6: 'Critical',
  26: 'Amplifying',
  27: 'Critical',
  29: 'Sceptical',
  43: 'Critical',
  4: 'Critical',
  21: 'Amplifying',
  8: 'Factual',
  17: 'Amplifying',
  18: 'Sceptical',
  19: 'Sceptical',
  14: 'Factual',
  16: 'Amplifying',
  23: 'Amplifying',
  24: 'Sceptical',
  44: 'Amplifying',
  11: 'Factual',
  12: 'Amplifying',
  13: 'Sceptical',
};

export interface StoryCluster {
  id: number;
  event: string;
  headline: string;
  articleIds: number[];
  outlets: number;
  toneSplit: { positive: number; neutral: number; mixed: number; negative: number };
  genuineScore: number;
  outletsSummary: string[];
  ministries: string[];
  regions: string[];
  media: string[];
  note: string;
}

export const storyClusters: StoryCluster[] = [
  {
    id: 1,
    event: 'Gati Shakti 2.0 Cabinet approval',
    headline: 'Cabinet approves Rs 2.5 lakh crore Gati Shakti 2.0 — 14 outlets, mostly positive',
    articleIds: [1, 9, 10, 31],
    outlets: 14,
    toneSplit: { positive: 11, neutral: 2, mixed: 1, negative: 0 },
    genuineScore: 90,
    outletsSummary: ['Times of India', 'The Hindu', 'Mint', 'Dainik Jagran', 'CNBC-TV18', 'DD News', 'Business Standard'],
    ministries: ['Ministry of Finance', 'Ministry of Commerce', 'Ministry of Railways'],
    regions: ['Hindi Belt', 'Maharashtra & Gujarat', 'South India'],
    media: ['Print', 'Television'],
    note: 'National saturation with mostly factual/amplifying stances. DD News matching-grant angle is the one sceptical read.',
  },
  {
    id: 2,
    event: 'PLFS methodology / unemployment critique',
    headline: 'Unemployment methodology critique — 11 outlets, sceptical to critical',
    articleIds: [2, 6, 26, 27, 29, 43],
    outlets: 11,
    toneSplit: { positive: 1, neutral: 1, mixed: 3, negative: 6 },
    genuineScore: 66,
    outletsSummary: ['Mint', 'NDTV', 'The Wire', 'Business Standard', 'ThePrint', 'Reddit'],
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    regions: ['Hindi Belt', 'Maharashtra & Gujarat', 'South India'],
    media: ['Print', 'Digital', 'Television', 'Social Media'],
    note: 'Analytical to critical spread. Business Standard EPFO piece is the one clean counter to the cycle.',
  },
  {
    id: 3,
    event: 'PM-KISAN disbursement delay',
    headline: 'PM-KISAN 17th instalment delays — 6 outlets, regional escalation',
    articleIds: [4, 21],
    outlets: 6,
    toneSplit: { positive: 0, neutral: 1, mixed: 2, negative: 3 },
    genuineScore: 72,
    outletsSummary: ['Amar Ujala', 'Dainik Bhaskar', 'Aaj Tak', 'Amar Ujala district'],
    ministries: ['Ministry of Agriculture', 'Ministry of Finance'],
    regions: ['Hindi Belt'],
    media: ['Print', 'Television'],
    note: 'Ground-level, geographically named. Regional pattern; not yet national front pages.',
  },
  {
    id: 4,
    event: 'Ayushman Bharat 2.0 implementation',
    headline: 'Ayushman Bharat 2.0 rollout — 9 outlets, mixed regional tone',
    articleIds: [8, 17, 18, 19],
    outlets: 9,
    toneSplit: { positive: 4, neutral: 2, mixed: 3, negative: 0 },
    genuineScore: 82,
    outletsSummary: ['Indian Express', 'Sambad', 'Onmanorama', 'YouTube', 'Regional health pages'],
    ministries: ['Ministry of Health & Family Welfare'],
    regions: ['Eastern India', 'South India', 'Hindi Belt'],
    media: ['Print', 'Digital', 'Social Media'],
    note: 'Delivery numbers strong; empanelment and package-rate coverage keeps tone mixed. Needs state-wise brief.',
  },
  {
    id: 5,
    event: 'India-ASEAN Free Trade Corridor',
    headline: 'India-ASEAN trade corridor — 7 outlets, English-heavy',
    articleIds: [5, 14, 16],
    outlets: 7,
    toneSplit: { positive: 5, neutral: 2, mixed: 0, negative: 0 },
    genuineScore: 85,
    outletsSummary: ['The Hindu', 'Deccan Herald', 'X exporter threads', 'Business Standard'],
    ministries: ['Ministry of External Affairs', 'Ministry of Commerce'],
    regions: ['South India', 'Maharashtra & Gujarat'],
    media: ['Print', 'Digital', 'Social Media'],
    note: 'Positive framing but vernacular pickup thin. Push SME/port-jobs angles for Tamil, Telugu, Bengali.',
  },
  {
    id: 6,
    event: 'Digital India 3.0 in the Northeast',
    headline: 'Digital India in NE — 7 outlets, coverage gap still open',
    articleIds: [23, 24, 44],
    outlets: 7,
    toneSplit: { positive: 4, neutral: 1, mixed: 2, negative: 0 },
    genuineScore: 76,
    outletsSummary: ['Assam Tribune', 'The Shillong Times', 'Nagaland Post'],
    ministries: ['Ministry of Electronics & IT'],
    regions: ['Northeast'],
    media: ['Print', 'Digital'],
    note: 'Positive village-demo copy exists, but hill-district gaps keep the tone mixed. Fill the vacuum before critical voices do.',
  },
  {
    id: 7,
    event: 'Defence procurement / Tejas Mk2',
    headline: 'Tejas Mk2 and carrier deployment — 6 outlets, specialist beat',
    articleIds: [11, 12, 13],
    outlets: 6,
    toneSplit: { positive: 4, neutral: 1, mixed: 1, negative: 0 },
    genuineScore: 81,
    outletsSummary: ['The Tribune', 'Republic', 'Punjab Kesari Digital'],
    ministries: ['Ministry of Defence'],
    regions: ['Punjab & Haryana', 'Maharashtra & Gujarat'],
    media: ['Print', 'Television', 'Digital'],
    note: 'Capability coverage, not scandal. Agniveer family sentiment is the only mixed read.',
  },
  ...extraClusters,
].map((c) => {
  const regions = [...new Set([...c.regions, ...GRID_REGIONS])];
  const media = [...new Set([...c.media, ...GRID_MEDIA])];
  const articleIds = c.articleIds.length
    ? c.articleIds
    : articles
      .filter((a) => a.ministryTags.some((t) => c.ministries.includes(t.name)))
      .slice(0, 6)
      .map((a) => a.id);
  return { ...c, regions, media, articleIds };
});

// Cluster-agnostic helpers.
export function articleCluster(articleId: number): StoryCluster | undefined {
  const cid = articleClusterMap[articleId];
  return cid ? storyClusters.find((c) => c.id === cid) : undefined;
}

export function articleStance(articleId: number): OutletStance | undefined {
  return articleStanceMap[articleId];
}

// Genuine score derivation for articles without hand-authored data.
export function computeGenuine(a: {
  id: number;
  source: string;
  crossReferences: number;
  mediaType: string;
  sentiment: string;
  relevanceScore: number;
}): GenuineData {
  const hand = articleGenuine[a.id];
  if (hand) return hand;

  const sourceCred = baseCred(a.source);
  const corroboration = Math.min(100, 20 + a.crossReferences * 12);
  const languageBias = a.sentiment === 'Neutral' ? 82
    : a.sentiment === 'Mixed' ? 75
    : a.sentiment === 'Positive' ? 72
    : 60;
  const factCheckHistory = sourceCred >= 80 ? 88 : sourceCred >= 65 ? 74 : 62;
  const deepfakeLikelihood = a.mediaType === 'Social Media' ? 22 : null;

  const composite = Math.round(
    sourceCred * 0.35 +
    corroboration * 0.25 +
    languageBias * 0.20 +
    factCheckHistory * 0.15 +
    (100 - (deepfakeLikelihood ?? 0)) * 0.05,
  );

  const marker: LanguageMarker = a.sentiment === 'Neutral' ? 'Factual'
    : a.sentiment === 'Mixed' ? 'Analytical'
    : a.sentiment === 'Negative' ? 'Emotive'
    : 'Analytical';

  return {
    score: composite,
    factors: { sourceCred, corroboration, languageBias, factCheckHistory, deepfakeLikelihood },
    marker,
    note: `${a.source} coverage. Corroborated by ${a.crossReferences} outlet${a.crossReferences === 1 ? '' : 's'}. Composite from source credibility, cross-corroboration, language, and fact-check history.`,
  };
}

// ---------------------------------------------------------------------------
// Executive digest + Priority pin
// ---------------------------------------------------------------------------

export const executiveDigest: Record<string, string> = {
  'command-center': '5 narratives active. Unemployment critique needs response within 24h. Sentiment trending -3% overnight.',
  'story-clusters': '3 events reached cluster threshold today. Gati Shakti saturated across 14 outlets; PLFS critique still escalating.',
  'media-feed': '45 items ingested today. 4 flagged low Genuine Score. 2 filtered as non-ministry noise.',
  'narratives': '2 escalating, 3 stable, 1 saturated. Only PLFS methodology needs an officer decision this cycle.',
  'regional': 'Hindi Belt volume high with rising PM-KISAN risk. South India and Northeast still show coverage gaps.',
  'early-warning': '1 HIGH-severity alert requires action in the next 24 hours. 2 MEDIUM alerts on track for pre-emptive briefing.',
  'cross-platform': 'Print and TV mostly positive; social sentiment 6 points lower. Amplification signature matches Feb 2024 jobs cycle.',
  'penetration': '2 messages at CRITICAL/HIGH under-penetration. Employment generation is the most under-reported.',
  'misinfo': '2 HIGH-spread claims verified FALSE. MGNREGA-diversion post is closest to mainstream mainstreaming.',
  'briefing': 'Finance brief ready. Priority: PLFS methodology response before evening news cycles.',
};

// Priority pin — auto-picked one item to attend first.
export const topPriority = {
  articleId: 2 as number,
  clusterId: 2 as number,
  alertId: 1 as number,
  reason: 'Highest escalation probability (78%) with a matched historical pattern that ran 3 weeks unbriefed.',
  action: 'Publish PLFS vs ICLS-19 comparison before 18:00 IST. Brief MoSPI + Labour spokesperson jointly.',
};

// ---------------------------------------------------------------------------
// Ask Sentinel
// ---------------------------------------------------------------------------

export interface AskResponse {
  patterns: RegExp[];
  response: string;
  citations: number[]; // article ids
}

export const askSentinelSuggestions: string[] = [
  'What should I prep for tomorrow\'s Finance briefing?',
  'Give me the opposition angle on employment this week.',
  'Where is our messaging under-penetrating in the south?',
  'What misinformation is trending right now?',
  'Show me all critical coverage on Ayushman Bharat.',
  'Which narratives are still escalating after 24h?',
];

export const askSentinelResponses: AskResponse[] = [
  {
    patterns: [/finance.*brief/i, /prep.*finance/i, /tomorrow.*brief/i],
    response:
      'For tomorrow\'s Finance briefing, three items dominate.\n\n' +
      'First — Gati Shakti 2.0 is saturated across 14 outlets with mostly factual framing [c:1]. The next 24 hours should shift from announcement to district-level job and corridor maps in Hindi and southern vernaculars [c:5]. English desks are covered; do not over-brief them.\n\n' +
      'Second — the PLFS methodology critique [c:2] is escalating with a 78% probability of a full news cycle. It follows the exact sequence of the Feb 2024 jobs story: The Wire → Mint → NDTV panel → political pickup → Hindi regional. A joint MoSPI + Labour technical note before 18:00 IST is the highest-leverage action of the day [c:6].\n\n' +
      'Third — the MGNREGA fund-diversion claim (2.3M impressions, FALSE) needs a visual debunk pushed through PIB Fact Check before it graduates to mainstream TV.',
    citations: [1, 5, 2, 6],
  },
  {
    patterns: [/opposition.*employ/i, /opposition.*angle.*jobs/i, /jobs.*critic/i, /unemploy.*critic/i, /plfs/i],
    response:
      'The opposition frame this week is *"official employment numbers overstate reality by 3.2 percentage points."*\n\n' +
      'The technical origin is the Mint methodology story [c:2] — economists challenging the reclassification of gig workers as regular wage-earners. Congress packaged this as an alternative jobs report [c:6] and it is now on TV panels and Hindi dailies. Reddit is amplifying with critical tone [c:43].\n\n' +
      'The clean counter is EPFO payroll additions (+18.6 lakh in Q1) [c:26] which the Business Standard piece already carries. Use that number, not a debate on the party film.',
    citations: [2, 6, 43, 26],
  },
  {
    patterns: [/south/i, /vernacular/i, /tamil|telugu|malayalam|kannada/i, /penetrat/i],
    response:
      'The south under-penetration this week is concentrated on the India-ASEAN corridor story.\n\n' +
      'The Hindu carried it strongly at national English level [c:5], and X threads from exporter associations picked it up [c:16], but Tamil, Telugu, and Malayalam desks did not. The pickup number is 34% vs a 75% target.\n\n' +
      'The recommended push: SME-export and port-jobs angles for Chennai, Vizag, and Kochi editions. Deccan Herald in Bangalore is already covering [c:14] and is a warm brief-and-follow.',
    citations: [5, 16, 14],
  },
  {
    patterns: [/misinfo/i, /misinformation/i, /viral.*claim/i, /fact.*check/i, /trending.*false/i],
    response:
      'Two claims cross the response threshold today.\n\n' +
      '1) *"Government diverts MGNREGA funds to corporate subsidies"* — social-media originated, 2.3M impressions in 18 hours, uses a manipulated budget document. Verdict: FALSE. Route to PIB Fact Check immediately with a visual debunk of actual allocations.\n\n' +
      '2) *"PM misquoted on economic growth targets at ASEAN summit"* — 450K YouTube views. Verdict: MISLEADING (quote out of context). Release full transcript and clip to fact-check networks.\n\n' +
      'The Railway privatisation claim is still at 120K reach and only on small portals — clarify once, then monitor.',
    citations: [],
  },
  {
    patterns: [/ayushman|health/i, /critical.*health/i],
    response:
      'Ayushman Bharat 2.0 coverage this week is *balanced but hardening*.\n\n' +
      'The Indian Express headline number (4.2 crore new enrolments in Phase 1) is a clear win [c:8]. But regional press in six states — including Sambad and Onmanorama — is running empanelment gap and package-rate stories [c:17][c:18][c:19]. Sustained mixed coverage without a state-wise reply becomes a hardened critical narrative within a week.\n\n' +
      'Priority action: state-wise empanelment table for the six lagging states via PIB regional units.',
    citations: [8, 17, 18, 19],
  },
  {
    patterns: [/escalat|still\s+active|24h|hot/i],
    response:
      'Two narratives are still climbing after 24 hours.\n\n' +
      'PLFS methodology critique is at the top with a 78% escalation probability [c:2]. The Congress alternative jobs report [c:6] arrived on TV yesterday; Hindi dailies are picking it up today. Historical fingerprint matches Feb 2024.\n\n' +
      'PM-KISAN disbursement delay [c:4] is at 52% escalation probability, regional for now but heading for national front pages if no district-wise status note is issued from PIB Lucknow and Patna.\n\n' +
      'Everything else has plateaued — Gati Shakti is saturated, ASEAN corridor is stable-positive, Ayushman is mixed-stable, Defence procurement is routine.',
    citations: [2, 6, 4],
  },
  {
    patterns: [/gati|infra|corridor.*national|cabinet.*approv/i],
    response:
      'Gati Shakti 2.0 is the day\'s volume story, not the risk story.\n\n' +
      'Times of India led with the Rs 2.5 lakh crore Cabinet approval [c:1]. Hindi and business desks amplified (Mint, Dainik Jagran, CNBC-TV18). Genuine Score sits at 90 — high corroboration, factual language.\n\n' +
      'The only sceptical read is the matching-grant angle. Do not over-brief English desks. Shift to district job maps and vernacular explainers for the next cycle.',
    citations: [1],
  },
  {
    patterns: [/kisan|pm-kisan|disburse|agricultur/i],
    response:
      'PM-KISAN 17th instalment delays are a regional escalation, not yet a national front-page cycle [c:4].\n\n' +
      'Amar Ujala and district Hindi pages are naming blocks and citing DBT lag. Escalation probability 52%. If Lucknow and Patna PIB units do not issue a district-wise status note today, this graduates to national dailies tomorrow.\n\n' +
      'Recommended: named-block clarification, not a generic "payments are on track" line.',
    citations: [4],
  },
  {
    patterns: [/genuine|bus accident|real estate|advert|junk|noise|keyword/i],
    response:
      'Two items this cycle show why keyword systems fail and Genuine Score exists.\n\n' +
      'The Delhi bus accident [c:3] scored Genuine 22 — a local incident with no ministry signal. Older clipping tools tagged it Negative for Transport because of the word "accident".\n\n' +
      'A Hindustan Times real-estate advertisement [c:7] scored Genuine 15. Zero editorial content. Suppress from ministry queues.\n\n' +
      'Officers should treat Genuine below 40 as noise unless a human overrides.',
    citations: [3, 7],
  },
  {
    patterns: [/defence|tejas|agniveer|mod\b|military/i],
    response:
      'Defence this week is capability coverage, not scandal.\n\n' +
      'Tejas Mk2 and carrier-deployment copy is running on specialist beats [c:11] with Genuine in the 80s. Agniveer family sentiment is the only mixed read.\n\n' +
      'No action required beyond the standing Aero India 2027 media plan. Do not elevate this into the morning brief unless a new critical outlet appears.',
    citations: [11],
  },
  {
    patterns: [/northeast|digital india|meity|assam|shillong/i],
    response:
      'Digital India 3.0 in the Northeast is a coverage-gap story, not a crisis [c:23].\n\n' +
      'Assam Tribune and hill-state papers carried village-demo copy, but pickup is thin versus the national English desks. Mixed tone persists where last-mile connectivity is unnamed.\n\n' +
      'Push success stories from connected villages via MeitY regional office before a critical vacuum fills the gap.',
    citations: [23],
  },
];

export const askSentinelFallback = (): AskResponse => ({
  patterns: [],
  response:
    'Here\'s what stands out across today\'s coverage.\n\n' +
    'The dominant positive story is the Gati Shakti 2.0 approval, saturated in national English and Hindi press [c:1][c:5]. The dominant risk is the PLFS methodology critique, which is escalating with a 78% probability [c:2][c:6]. Regional watch item: PM-KISAN disbursement delays in the Hindi belt [c:4]. Health desks should note Ayushman Bharat 2.0 mixed coverage [c:8].\n\n' +
    'For a more specific answer, try one of the suggested questions, or ask about a ministry, region, or narrative.',
  citations: [1, 5, 2, 6, 4, 8],
});

export function matchAskResponse(query: string): AskResponse {
  const q = query.toLowerCase().trim();
  if (!q) return askSentinelFallback();
  for (const r of askSentinelResponses) {
    if (r.patterns.some((p) => p.test(q))) return r;
  }
  return askSentinelFallback();
}
