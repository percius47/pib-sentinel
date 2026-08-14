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

export type NarrativeTone = 'Positive' | 'Critical' | 'Mixed' | 'Neutral';

export interface Narrative {
  id: number;
  title: string;
  tone: NarrativeTone;
  spread: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  suggestedAction: string;
  outlets: number;
  trendData: number[];
  ministries: string[];
  regions: string[];
}

export const narratives: Narrative[] = [
  {
    id: 1,
    title: 'PM announces Rs 2.5 lakh crore infrastructure push under Gati Shakti 2.0',
    tone: 'Positive',
    spread: 'Very High',
    riskLevel: 'Low',
    suggestedAction: 'Amplify via regional PIB offices; translate key highlights into vernacular press releases',
    outlets: 14,
    trendData: [30, 45, 62, 78, 85, 91, 88],
    ministries: ['Ministry of Finance', 'Ministry of Commerce'],
    regions: ['All Regions', 'Hindi Belt', 'Maharashtra & Gujarat'],
  },
  {
    id: 2,
    title: 'Opposition raises concerns over revised unemployment methodology in PLFS data',
    tone: 'Critical',
    spread: 'High',
    riskLevel: 'High',
    suggestedAction: 'Prepare factual explainer with methodology comparison; brief spokespeople within 24 hours',
    outlets: 11,
    trendData: [10, 18, 32, 45, 58, 72, 81],
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    regions: ['All Regions', 'Hindi Belt', 'South India'],
  },
  {
    id: 3,
    title: 'India-ASEAN Free Trade Corridor agreement receives international praise',
    tone: 'Positive',
    spread: 'Medium',
    riskLevel: 'Low',
    suggestedAction: 'Continue current strategy; push vernacular coverage of benefits to Indian exporters',
    outlets: 8,
    trendData: [20, 35, 42, 48, 45, 43, 40],
    ministries: ['Ministry of External Affairs', 'Ministry of Commerce'],
    regions: ['All Regions', 'Maharashtra & Gujarat', 'South India'],
  },
  {
    id: 4,
    title: 'Ayushman Bharat 2.0 expansion: coverage gaps reported in rural districts',
    tone: 'Mixed',
    spread: 'Medium',
    riskLevel: 'Medium',
    suggestedAction: 'Issue state-wise implementation status clarification; coordinate with Health Ministry field offices',
    outlets: 9,
    trendData: [15, 22, 28, 35, 42, 48, 52],
    ministries: ['Ministry of Health & Family Welfare'],
    regions: ['Hindi Belt', 'Eastern India', 'Northeast'],
  },
  {
    id: 5,
    title: 'Digital India 3.0 targets 100% rural broadband — implementation concerns in NE states',
    tone: 'Mixed',
    spread: 'Medium',
    riskLevel: 'Medium',
    suggestedAction: 'Push success stories from connected villages; address NE concerns with MeitY regional office',
    outlets: 7,
    trendData: [25, 30, 28, 35, 38, 41, 44],
    ministries: ['Ministry of Electronics & IT'],
    regions: ['Northeast'],
  },
  {
    id: 6,
    title: 'Defence procurement reforms: Rafale Marine and Tejas Mk2 progress coverage',
    tone: 'Positive',
    spread: 'Medium',
    riskLevel: 'Low',
    suggestedAction: 'Maintain current outreach; coordinate with MoD for Aero India 2027 media plan',
    outlets: 6,
    trendData: [18, 22, 25, 30, 28, 32, 35],
    ministries: ['Ministry of Defence'],
    regions: ['All Regions', 'South India'],
  },
];

export type MediaType = 'Print' | 'Television' | 'Digital' | 'Social Media';

export function mediaFilterKey(value: string): 'print' | 'television' | 'digital' | 'social' | null {
  if (value === 'Print') return 'print';
  if (value === 'Television') return 'television';
  if (value === 'Digital') return 'digital';
  if (value === 'Social Media') return 'social';
  return null;
}

export interface Article {
  id: number;
  headline: string;
  summary: string;
  fullBody: string;
  source: string;
  edition: string;
  date: string;
  page: string;
  relevanceScore: number;
  ministryTags: { name: string; confidence: number }[];
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  sentimentReason: string;
  crossReferences: number;
  mediaType: MediaType;
  region: string;
  aiFlag?: string;
  estimatedReach: string;
  audienceSegments: string[];
  impact: string;
  spreadTimeline: { day: string; outlet: string; type: string }[];
  relatedArticles: { id?: number; source: string; headline: string; tone: string }[];
  historicalContext: string;
  detailedActions: string[];
}

export const articles: Article[] = [
  {
    id: 1,
    headline: 'Cabinet approves Rs 2.5 lakh crore Gati Shakti 2.0 master plan for multi-modal connectivity',
    summary: 'The Union Cabinet has given its nod to the ambitious Gati Shakti 2.0 framework that aims to integrate 16 ministries under a unified logistics infrastructure plan, targeting completion of key corridors by 2029.',
    fullBody: 'The Union Cabinet, chaired by the Prime Minister, has approved the Gati Shakti 2.0 master plan with a total outlay of Rs 2.5 lakh crore over the next four years. The plan integrates 16 ministries and departments under a unified digital platform for infrastructure planning. Key components include 12 economic corridors, 8 industrial belts, and 22 multi-modal logistics parks. Officials indicated that the plan is expected to generate approximately 3.2 lakh direct jobs and reduce logistics costs from the current 14% of GDP to under 9% by 2029. The initiative builds on the 2021 launch of Gati Shakti 1.0 and incorporates lessons from its four-year implementation phase.',
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
    sentiment: 'Positive',
    sentimentReason: 'Factual reporting of policy announcement with emphasis on development impact and economic benefits',
    crossReferences: 12,
    mediaType: 'Print',
    region: 'All Regions',
    estimatedReach: '18.4M readers',
    audienceSegments: ['Urban professionals', 'Business decision-makers', 'Policy analysts'],
    impact: 'High positive impact on infrastructure narrative. Front-page placement across 12 major dailies indicates strong editorial priority. Expected to dominate business and policy discussion cycles for 3-5 days.',
    spreadTimeline: [
      { day: 'Aug 12', outlet: 'PTI Wire', type: 'Wire Release' },
      { day: 'Aug 12', outlet: 'Times of India, Hindustan Times, The Hindu', type: 'National Front Page' },
      { day: 'Aug 13', outlet: 'Regional Hindi Press (14 papers)', type: 'Translation' },
      { day: 'Aug 13', outlet: 'Business Standard, Mint', type: 'Analysis Piece' },
      { day: 'Aug 13', outlet: 'CNBC, ET Now', type: 'TV Panel' },
    ],
    relatedArticles: [
      { id: 5, source: 'The Hindu', headline: 'India-ASEAN trade corridor to boost bilateral commerce by $40 billion annually', tone: 'Positive' },
      { source: 'Business Standard', headline: 'Gati Shakti 2.0 to reduce logistics cost from 14% to 9%', tone: 'Positive' },
      { source: 'Mint', headline: 'Analysts see Rs 2.5L cr push benefiting cement, steel, capital goods', tone: 'Positive' },
    ],
    historicalContext: 'Gati Shakti 1.0 (2021) received similar positive coverage on launch. However, implementation gap stories emerged 18 months later. Recommend proactive milestone communication to prevent similar pattern.',
    detailedActions: [
      'Translate key highlights into 12 vernacular languages within 24 hours',
      'Prepare data-driven infographic showing state-wise infrastructure allocation',
      'Schedule Finance Ministry press briefing for Aug 14 to sustain narrative',
    ],
  },
  {
    id: 2,
    headline: 'PLFS methodology under scanner: economists question revised unemployment calculation',
    summary: 'Leading economists have raised concerns about the Periodic Labour Force Survey\'s revised methodology, arguing that the new classification of gig workers inflates employment figures by approximately 3.2 percentage points.',
    fullBody: 'A group of 12 senior economists, including former RBI Deputy Governor and two members of the Economic Advisory Council, have published a joint critique of the revised PLFS methodology. The critique specifically challenges the reclassification of gig-economy workers as "regular wage/salaried employees" without corresponding benefits or contract guarantees. The economists estimate that this reclassification alone accounts for a 3.2 percentage point overestimation of the employment rate. The Ministry of Statistics has previously defended the revision, stating it aligns with ILO framework updates. The critique has been picked up by opposition parties and is scheduled for discussion in parliamentary committee.',
    source: 'Mint',
    edition: 'National',
    date: 'Aug 13, 2026',
    page: 'Page 3',
    relevanceScore: 94,
    ministryTags: [
      { name: 'Ministry of Labour', confidence: 95 },
      { name: 'Ministry of Statistics', confidence: 91 },
    ],
    sentiment: 'Negative',
    sentimentReason: 'Substantive policy criticism backed by expert analysis — not incident reporting but directed critique of government methodology',
    crossReferences: 8,
    mediaType: 'Print',
    region: 'All Regions',
    estimatedReach: '4.2M readers + digital amplification',
    audienceSegments: ['Policy analysts', 'Opposition strategists', 'Academic community', 'Financial journalists'],
    impact: 'Medium-High negative impact. Threatens to become the dominant employment narrative if not addressed within 48-72 hours. Historical pattern suggests amplification through TV panels and social media.',
    spreadTimeline: [
      { day: 'Aug 8', outlet: 'The Wire', type: 'First Report' },
      { day: 'Aug 9', outlet: 'Mint', type: 'Print Coverage' },
      { day: 'Aug 10', outlet: 'Indian Express', type: 'Editorial' },
      { day: 'Aug 11', outlet: 'NDTV', type: 'Panel Discussion' },
      { day: 'Aug 12', outlet: 'Congress Press Conference', type: 'Political Pickup' },
      { day: 'Aug 13', outlet: 'Dainik Jagran, Amar Ujala', type: 'Regional Spread' },
    ],
    relatedArticles: [
      { id: 6, source: 'NDTV', headline: '"Unemployment crisis deepening" — Congress releases alternative jobs report', tone: 'Critical' },
      { source: 'Indian Express', headline: 'Rethinking employment data: why definitions matter', tone: 'Mixed' },
      { source: 'The Wire', headline: 'Unemployment: what the numbers hide', tone: 'Critical' },
    ],
    historicalContext: 'Comparable pattern to Feb 2024 "Jobs Crisis" cycle which sustained 3 weeks and required Finance Ministry intervention. Requires factual response, not defensive posture.',
    detailedActions: [
      'Priority: Prepare methodology comparison document within 12 hours',
      'Brief Statistics Ministry spokesperson for TV panels this evening',
      'Coordinate with EAC-PM member for op-ed response by Aug 14',
    ],
  },
  {
    id: 3,
    headline: 'Bus overturns in Agra: 12 injured in early morning accident on Yamuna Expressway',
    summary: 'A private bus travelling from Lucknow to Delhi overturned near the Agra toll plaza on the Yamuna Expressway. Twelve passengers sustained minor injuries and were taken to the district hospital.',
    fullBody: 'A private tourist bus operating on the Lucknow-Delhi route overturned near the Agra toll plaza on the Yamuna Expressway around 5:30 AM. Preliminary investigation suggests driver fatigue as the primary cause. All 12 injured passengers received first aid at the Agra district hospital and were discharged. The bus operator has been booked under relevant sections of the Motor Vehicles Act. Traffic on the expressway was briefly diverted but resumed normal flow within an hour.',
    source: 'Dainik Jagran',
    edition: 'Agra',
    date: 'Aug 13, 2026',
    page: 'Page 5',
    relevanceScore: 8,
    ministryTags: [{ name: 'Ministry of Road Transport', confidence: 32 }],
    sentiment: 'Neutral',
    sentimentReason: 'Routine incident reporting — not a policy critique. Flagged LOW relevance. Previous system incorrectly tagged this as Negative for Ministry of Transport.',
    crossReferences: 1,
    mediaType: 'Print',
    region: 'Hindi Belt',
    aiFlag: 'FILTERED: Would have appeared as negative news under keyword-based system. AI correctly identifies this as routine incident reporting with no ministry relevance.',
    estimatedReach: '320K local readers',
    audienceSegments: ['Local readership'],
    impact: 'No ministry impact. Isolated incident with no policy implications. Standard local reporting.',
    spreadTimeline: [{ day: 'Aug 13', outlet: 'Dainik Jagran (Agra)', type: 'Local Report' }],
    relatedArticles: [],
    historicalContext: 'Similar incidents occur regularly; no historical policy escalation pattern.',
    detailedActions: ['No action required. Monitoring for narrative-level pattern only.'],
  },
  {
    id: 4,
    headline: 'PM-KISAN disbursement delays reported in 14 districts across UP and Bihar',
    summary: 'District-level editions report that the 17th instalment of PM-KISAN has been delayed by 3-4 weeks in several districts, with farmers citing non-updated Aadhaar-seeding as the primary cause.',
    fullBody: 'Ground reports from 14 districts across Uttar Pradesh and Bihar indicate that the 17th instalment of PM-KISAN has been delayed by 3-4 weeks for approximately 2.8 lakh beneficiaries. Farmers interviewed by regional newspapers cite non-updated Aadhaar-seeding, e-KYC completion issues, and bank account mismatches as primary causes. The Ministry of Agriculture has not issued a formal statement, though local officials indicate that the disbursement will proceed after Aadhaar reconciliation. Farmers unions in the affected districts have called for a review meeting.',
    source: 'Amar Ujala',
    edition: 'Lucknow',
    date: 'Aug 12, 2026',
    page: 'Page 1',
    relevanceScore: 91,
    ministryTags: [
      { name: 'Ministry of Agriculture', confidence: 97 },
      { name: 'Ministry of Finance', confidence: 64 },
    ],
    sentiment: 'Negative',
    sentimentReason: 'Ground-level grievance reporting with specific details of implementation failure — actionable criticism requiring response',
    crossReferences: 5,
    mediaType: 'Print',
    region: 'Hindi Belt',
    estimatedReach: '3.6M readers in Hindi belt',
    audienceSegments: ['Rural readership', 'Farmer community', 'Regional political base'],
    impact: 'High regional impact. Story is at Hindi-belt regional level currently. Historical pattern shows escalation to national coverage within 5-7 days if unaddressed.',
    spreadTimeline: [
      { day: 'Aug 10', outlet: 'Amar Ujala (Lucknow)', type: 'District Report' },
      { day: 'Aug 11', outlet: 'Dainik Jagran (Patna)', type: 'Regional Spread' },
      { day: 'Aug 12', outlet: 'Dainik Bhaskar', type: 'Multi-city Coverage' },
      { day: 'Aug 13', outlet: 'Hindustan (Hindi)', type: 'Feature Story' },
    ],
    relatedArticles: [
      { source: 'Dainik Bhaskar', headline: 'Farmers demand review of PM-KISAN delays', tone: 'Critical' },
      { source: 'Prabhat Khabar', headline: 'Aadhaar seeding remains bottleneck for welfare disbursement', tone: 'Mixed' },
    ],
    historicalContext: 'Comparable to Oct 2025 disbursement delay coverage which escalated to national front pages after 5 days.',
    detailedActions: [
      'Coordinate with Agriculture Ministry for immediate district-wise status update',
      'Issue clarification through PIB regional offices in UP and Bihar',
      'Deploy field verification teams in the 14 affected districts',
    ],
  },
  {
    id: 5,
    headline: 'India-ASEAN trade corridor to boost bilateral commerce by $40 billion annually',
    summary: 'The newly signed India-ASEAN Free Trade Corridor agreement is expected to streamline customs procedures and reduce transit times, with economists projecting a $40 billion annual increase in trade volume.',
    fullBody: 'The India-ASEAN Free Trade Corridor agreement, signed at the sidelines of the ASEAN summit in Jakarta, is projected to increase bilateral trade by approximately $40 billion annually within three years. Key provisions include harmonized customs procedures, mutual recognition of standards for 18 product categories, and dedicated fast-track shipping lanes between Chennai/Kolkata and Bangkok/Ho Chi Minh City. Indian textile, pharmaceutical, and IT services exporters are expected to be primary beneficiaries.',
    source: 'The Hindu',
    edition: 'National',
    date: 'Aug 12, 2026',
    page: 'Page 1',
    relevanceScore: 89,
    ministryTags: [
      { name: 'Ministry of External Affairs', confidence: 93 },
      { name: 'Ministry of Commerce', confidence: 90 },
    ],
    sentiment: 'Positive',
    sentimentReason: 'Analytical reporting highlighting diplomatic achievement and economic projections',
    crossReferences: 7,
    mediaType: 'Print',
    region: 'All Regions',
    estimatedReach: '5.1M readers',
    audienceSegments: ['Business community', 'Foreign policy analysts', 'Exporters'],
    impact: 'Positive diplomatic narrative. Vernacular coverage remains at 34% — significant regional gap that limits penetration.',
    spreadTimeline: [
      { day: 'Aug 11', outlet: 'PTI Wire', type: 'Wire Release' },
      { day: 'Aug 12', outlet: 'The Hindu, Indian Express', type: 'National Coverage' },
      { day: 'Aug 12', outlet: 'Business Standard', type: 'Analysis' },
    ],
    relatedArticles: [
      { source: 'Business Standard', headline: 'Textile, pharma exporters set to gain from ASEAN corridor', tone: 'Positive' },
      { source: 'Economic Times', headline: 'How India-ASEAN pact reshapes regional trade dynamics', tone: 'Positive' },
    ],
    historicalContext: 'Trade agreement announcements typically see 5-7 days of positive coverage before receding. Recommend vernacular push to extend cycle.',
    detailedActions: [
      'Push vernacular coverage of exporter benefits in Tamil, Bengali, Marathi',
      'Coordinate op-eds by trade experts for regional press by Aug 15',
      'Prepare SME-focused benefit explainer for MSME associations',
    ],
  },
  {
    id: 6,
    headline: '"Unemployment crisis deepening" — Congress releases alternative jobs report',
    summary: 'Congress party has released an alternative employment assessment claiming job creation is 40% below government targets, citing CMIE data and contrasting it with official PLFS figures.',
    fullBody: 'The Congress party has released a 42-page alternative employment assessment titled "Jobs Report Card 2026", claiming that actual job creation over the past 24 months is approximately 40% below government targets. The report relies on CMIE (Centre for Monitoring Indian Economy) data and contrasts it with official PLFS figures. The report has been amplified across the party\'s digital channels and is being picked up by opposition-aligned commentators.',
    source: 'NDTV',
    edition: 'Digital',
    date: 'Aug 13, 2026',
    page: 'N/A',
    relevanceScore: 88,
    ministryTags: [{ name: 'Ministry of Labour', confidence: 92 }],
    sentiment: 'Negative',
    sentimentReason: 'Opposition-sourced counter-narrative with political framing — high amplification potential on digital platforms',
    crossReferences: 6,
    mediaType: 'Digital',
    region: 'All Regions',
    estimatedReach: '12.4M digital impressions',
    audienceSegments: ['Digital-first news consumers', 'Opposition base', 'Youth demographic'],
    impact: 'High digital impact. Coordinated with earlier PLFS methodology critique — forms part of broader opposition narrative strategy.',
    spreadTimeline: [
      { day: 'Aug 13', outlet: 'Congress Party (Press Release)', type: 'Origin' },
      { day: 'Aug 13', outlet: 'NDTV Digital, The Wire, Scroll', type: 'Digital Coverage' },
      { day: 'Aug 13', outlet: 'X (Twitter) amplification', type: 'Social Spread' },
    ],
    relatedArticles: [
      { id: 2, source: 'Mint', headline: 'PLFS methodology under scanner: economists question revised unemployment calculation', tone: 'Negative' },
      { source: 'The Wire', headline: 'Reading between the lines: what CMIE and PLFS disagree on', tone: 'Critical' },
    ],
    historicalContext: 'Direct continuation of PLFS methodology critique cycle. Combined narrative likely to sustain 2-3 weeks.',
    detailedActions: [
      'URGENT: Prepare data-backed counter with PLFS methodology explainer',
      'Deploy verified beneficiary data at district level to counter aggregate critique',
      'Brief Labour Ministry for evening TV cycle',
    ],
  },
  {
    id: 7,
    headline: 'Delhi real estate advertisement — "New Delhi\'s most premium address"',
    summary: 'Full-page advertisement for a luxury real estate project in New Delhi by a private developer.',
    fullBody: 'Full-page advertisement by a private developer for a luxury residential project. Contains no editorial content or ministry-related information.',
    source: 'Hindustan Times',
    edition: 'Delhi',
    date: 'Aug 13, 2026',
    page: 'Page 7',
    relevanceScore: 2,
    ministryTags: [],
    sentiment: 'Neutral',
    sentimentReason: 'Commercial advertisement — zero ministry relevance',
    crossReferences: 0,
    mediaType: 'Print',
    region: 'Hindi Belt',
    aiFlag: 'FILTERED: Keyword "Delhi" would have listed this under Delhi-related ministries in the old system. AI correctly identifies this as a commercial advertisement with no government relevance.',
    estimatedReach: 'N/A (commercial)',
    audienceSegments: [],
    impact: 'No relevance. Filtered out at ingestion.',
    spreadTimeline: [],
    relatedArticles: [],
    historicalContext: 'N/A',
    detailedActions: ['No action required.'],
  },
  {
    id: 8,
    headline: 'Ayushman Bharat 2.0: 4.2 crore new beneficiaries enrolled in Phase 1',
    summary: 'The Health Ministry reports 4.2 crore new beneficiaries enrolled under the expanded Ayushman Bharat scheme, though implementation in tribal and remote areas remains below target.',
    fullBody: 'The Ministry of Health & Family Welfare has released Phase 1 enrollment data for Ayushman Bharat 2.0, showing 4.2 crore new beneficiaries added to the scheme. Urban and semi-urban enrollment exceeded targets by 12%. However, tribal district enrollment reached only 58% of target, and remote hill regions in North-East states show enrollment at 41% of target. The Ministry has attributed the gap to authentication infrastructure limitations and has committed to deploying additional enrollment camps in Q3.',
    source: 'Indian Express',
    edition: 'National',
    date: 'Aug 11, 2026',
    page: 'Page 4',
    relevanceScore: 93,
    ministryTags: [{ name: 'Ministry of Health & Family Welfare', confidence: 98 }],
    sentiment: 'Mixed',
    sentimentReason: 'Balanced reporting — acknowledges enrollment success while highlighting rural implementation gaps',
    crossReferences: 9,
    mediaType: 'Print',
    region: 'All Regions',
    estimatedReach: '7.8M readers',
    audienceSegments: ['Healthcare professionals', 'Public policy audience', 'Rural development stakeholders'],
    impact: 'Mixed narrative on flagship scheme. Requires state-wise clarification to prevent negative interpretation from dominating.',
    spreadTimeline: [
      { day: 'Aug 11', outlet: 'Indian Express', type: 'Original Report' },
      { day: 'Aug 12', outlet: 'The Hindu, Mint', type: 'Follow-up Analysis' },
      { day: 'Aug 13', outlet: 'Regional press (6 states)', type: 'State-specific Coverage' },
    ],
    relatedArticles: [
      { source: 'The Hindu', headline: 'Tribal hospital empanelment lags Ayushman Bharat expansion', tone: 'Mixed' },
      { source: 'Down To Earth', headline: 'Bridging the last-mile healthcare gap', tone: 'Neutral' },
    ],
    historicalContext: 'Ayushman Bharat coverage typically shifts from positive at launch to implementation-focused within 60 days. Current phase is expected.',
    detailedActions: [
      'Prepare state-wise implementation success data by Aug 15',
      'Push beneficiary impact stories via PIB regional units',
      'Coordinate with Health Ministry for tribal district gap-closure timeline',
    ],
  },
];

export interface Alert {
  id: number;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW' | 'CRITICAL';
  description: string;
  escalationProbability: number;
  historicalMatch: string;
  timeToCritical: string;
  recommendation: string;
  source: string;
  timestamp: string;
  ministries: string[];
  region: string;
  mediaType?: MediaType;
}

export const alerts: Alert[] = [
  {
    id: 1,
    title: 'Unemployment narrative gaining rapid traction on digital platforms',
    severity: 'HIGH',
    description: 'Opposition-sourced employment counter-narrative has been amplified by 340% across YouTube, X (Twitter), and digital-first portals in the last 48 hours. Cross-referencing shows coordinated amplification patterns.',
    escalationProbability: 78,
    historicalMatch: 'Similar amplification pattern preceded the "Jobs Crisis" narrative cycle of Feb 2024, which sustained for 3 weeks.',
    timeToCritical: '24-48 hours',
    recommendation: 'Priority: Prepare data-backed factual explainer within 12 hours. Brief designated spokespeople. Coordinate with Ministry of Labour for official response.',
    source: 'Digital platforms, YouTube, X',
    timestamp: 'Aug 13, 2026 — 11:30 IST',
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    region: 'All Regions',
    mediaType: 'Digital',
  },
  {
    id: 2,
    title: 'PM-KISAN disbursement delays emerging as regional narrative in Hindi belt',
    severity: 'MEDIUM',
    description: 'Ground-level reporting from UP and Bihar district editions indicates PM-KISAN 17th instalment delays in 14 districts. Story has been picked up by 5 publications so far with percolation indicators rising.',
    escalationProbability: 52,
    historicalMatch: 'Previous disbursement delay stories (Oct 2025) escalated to national coverage within 5 days when not addressed at regional level.',
    timeToCritical: '3-5 days',
    recommendation: 'Issue clarification through PIB regional offices. Coordinate with Agriculture Ministry for disbursement status update. Deploy field verification in affected districts.',
    source: 'Amar Ujala, Dainik Jagran, Dainik Bhaskar (district editions)',
    timestamp: 'Aug 13, 2026 — 09:15 IST',
    ministries: ['Ministry of Agriculture'],
    region: 'Hindi Belt',
    mediaType: 'Print',
  },
  {
    id: 3,
    title: 'Misleading viral claim: "Government diverts MGNREGA funds to corporate subsidy"',
    severity: 'HIGH',
    description: 'A viral social media post claiming MGNREGA funds are being diverted to corporate subsidies has garnered 2.3M impressions in 18 hours. The claim uses manipulated budget documents. Rapid fact-check required.',
    escalationProbability: 71,
    historicalMatch: 'Similar fund-diversion claims in Apr 2025 reached mainstream media within 72 hours when fact-check was delayed.',
    timeToCritical: '12-24 hours',
    recommendation: 'URGENT: Route to PIB Fact Check Unit immediately. Prepare visual debunking material with actual budget allocation data. Coordinate social media counter-narrative.',
    source: 'X (Twitter), Facebook, WhatsApp forwards',
    timestamp: 'Aug 13, 2026 — 14:00 IST',
    ministries: ['Ministry of Finance', 'Ministry of Labour'],
    region: 'All Regions',
    mediaType: 'Social Media',
  },
  {
    id: 4,
    title: 'Consistent critical coverage of Ayushman Bharat rural implementation',
    severity: 'MEDIUM',
    description: 'Regional press in 6 states running stories on Ayushman Bharat hospital empanelment gaps in rural areas. While tone is constructive, sustained coverage without response risks narrative hardening.',
    escalationProbability: 44,
    historicalMatch: 'No strong historical match. Pattern is typical of implementation-gap reporting cycles.',
    timeToCritical: '5-7 days',
    recommendation: 'Prepare state-wise implementation success data. Push beneficiary impact stories through PIB regional units. Coordinate with Health Ministry for gap-closure timeline.',
    source: 'Regional print editions (Hindi, Tamil, Telugu)',
    timestamp: 'Aug 12, 2026 — 16:45 IST',
    ministries: ['Ministry of Health & Family Welfare'],
    region: 'Hindi Belt',
    mediaType: 'Print',
  },
  {
    id: 5,
    title: 'Digital India coverage gap in Northeast media',
    severity: 'LOW',
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
];

export const regionData = [
  { name: 'Hindi Belt', states: 'UP, MP, Bihar, Rajasthan, Jharkhand, Uttarakhand, Chhattisgarh', volume: 1840, volumeLabel: 'Very High', sentiment: 'Positive', sentimentScore: 72, keyInsight: 'Strong PM messaging uptake; PM-KISAN delay is emerging risk in UP/Bihar', coverageGap: false, topSources: ['Dainik Jagran', 'Amar Ujala', 'Dainik Bhaskar', 'Hindustan (Hindi)'] },
  { name: 'Maharashtra & Gujarat', states: 'Maharashtra, Gujarat, Goa', volume: 920, volumeLabel: 'High', sentiment: 'Mixed', sentimentScore: 58, keyInsight: 'Urban digital voices critical on employment; Marathi press largely neutral on infrastructure push', coverageGap: false, topSources: ['Loksatta', 'Maharashtra Times', 'Gujarat Samachar', 'Mid-Day'] },
  { name: 'South India', states: 'Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana', volume: 780, volumeLabel: 'Medium', sentiment: 'Neutral-Critical', sentimentScore: 42, keyInsight: 'Opposition media dominates in TN/Kerala; Karnataka coverage more balanced. Vernacular coverage gap identified.', coverageGap: true, topSources: ['The Hindu', 'Deccan Herald', 'Mathrubhumi', 'Eenadu'] },
  { name: 'Northeast', states: 'Assam, Meghalaya, Manipur, Nagaland, Mizoram, Tripura, Arunachal, Sikkim', volume: 340, volumeLabel: 'Medium', sentiment: 'Positive', sentimentScore: 68, keyInsight: 'Development narrative resonating well; Digital India coverage significantly below national average', coverageGap: true, topSources: ['The Sentinel', 'Assam Tribune', 'Nagaland Post'] },
  { name: 'Punjab & Haryana', states: 'Punjab, Haryana, Himachal Pradesh, J&K', volume: 520, volumeLabel: 'Medium', sentiment: 'Mixed', sentimentScore: 51, keyInsight: 'Agricultural policy commentary dominates; MSP discussions ongoing. Defence coverage positive near cantonment areas.', coverageGap: false, topSources: ['Tribune', 'Punjabi Jagran', 'Ajit'] },
  { name: 'Eastern India', states: 'West Bengal, Odisha', volume: 420, volumeLabel: 'Medium', sentiment: 'Neutral', sentimentScore: 50, keyInsight: 'Bengali media focused on state politics; Odisha press covering infrastructure projects positively', coverageGap: false, topSources: ['Anandabazar Patrika', 'The Telegraph', 'Sambad', 'Dharitri'] },
];

export interface MessagePenetration {
  message: string;
  pickupNational: number;
  pickupRegional: number;
  pickupDigital: number;
  gap: string;
  action: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  ministry: string;
  region: string;
}

export const messagePenetration: MessagePenetration[] = [
  { message: 'Gati Shakti 2.0 — Integrated infrastructure for growth', pickupNational: 92, pickupRegional: 61, pickupDigital: 78, gap: 'Regional vernacular coverage at 61% — below 75% target', action: 'Translate and distribute regional press releases in 12 languages', priority: 'HIGH', ministry: 'Ministry of Finance', region: 'All Regions' },
  { message: 'Ayushman Bharat expansion — Healthcare for all', pickupNational: 85, pickupRegional: 72, pickupDigital: 68, gap: 'Digital narrative being overtaken by implementation criticism', action: 'Push beneficiary success stories on social media; digital-first content strategy', priority: 'MEDIUM', ministry: 'Ministry of Health & Family Welfare', region: 'All Regions' },
  { message: 'India\'s global leadership — ASEAN trade corridor', pickupNational: 88, pickupRegional: 34, pickupDigital: 71, gap: 'Severe vernacular gap — regional press at 34%. Story perceived as "elite English media" narrative', action: 'Local impact angles: jobs created, SME export benefits. Vernacular op-eds by trade experts', priority: 'HIGH', ministry: 'Ministry of External Affairs', region: 'South India' },
  { message: 'Digital India 3.0 — Rural broadband connectivity', pickupNational: 65, pickupRegional: 48, pickupDigital: 82, gap: 'National print below target; NE regional coverage critically low at 22%', action: 'NE media briefing; village-level success story campaign; infographic distribution', priority: 'MEDIUM', ministry: 'Ministry of Electronics & IT', region: 'Northeast' },
  { message: 'Employment generation — MUDRA and Startup India results', pickupNational: 45, pickupRegional: 28, pickupDigital: 38, gap: 'Severely under-reported across all channels. Counter-narrative dominating the employment space.', action: 'URGENT: Proactive data campaign with district-level job creation numbers. Beneficiary testimonials.', priority: 'CRITICAL', ministry: 'Ministry of Labour', region: 'All Regions' },
];

export interface MisinfoItem {
  id: number;
  claim: string;
  sourceType: string;
  spread: string;
  spreadLevel: 'high' | 'medium' | 'low';
  verificationStatus: string;
  action: string;
  detectedAt: string;
  ministries: string[];
  region: string;
  mediaType: MediaType;
}

export const misinfoItems: MisinfoItem[] = [
  { id: 1, claim: '"Government diverts MGNREGA funds to corporate subsidies"', sourceType: 'Social Media (X, Facebook)', spread: 'High — 2.3M impressions', spreadLevel: 'high', verificationStatus: 'FALSE — Manipulated document', action: 'Issue visual fact-check with actual budget allocation breakdown. Flag for platform takedown.', detectedAt: 'Aug 13, 2026 — 08:20 IST', ministries: ['Ministry of Finance', 'Ministry of Labour'], region: 'All Regions', mediaType: 'Social Media' },
  { id: 2, claim: '"PM misquoted on economic growth targets at ASEAN summit"', sourceType: 'YouTube, Digital portals', spread: 'Medium — 450K views', spreadLevel: 'medium', verificationStatus: 'MISLEADING — Quote taken out of context', action: 'Release full transcript and video clip with correct context. Distribute to fact-check networks.', detectedAt: 'Aug 12, 2026 — 14:30 IST', ministries: ['Ministry of External Affairs'], region: 'All Regions', mediaType: 'Digital' },
  { id: 3, claim: '"Old flood footage from 2023 shared as current Kerala disaster"', sourceType: 'WhatsApp, X (Twitter)', spread: 'Medium — 800K shares', spreadLevel: 'medium', verificationStatus: 'FALSE — Reverse image search confirms 2023 origin', action: 'Issue PIB Fact Check tweet with image comparison. Coordinate with Kerala PIB office.', detectedAt: 'Aug 11, 2026 — 11:45 IST', ministries: ['Ministry of Home Affairs'], region: 'South India', mediaType: 'Social Media' },
  { id: 4, claim: '"Railway privatisation of 150 routes confirmed by Railway Board"', sourceType: 'Small news portals, Facebook pages', spread: 'Low-Medium — 120K reach', spreadLevel: 'low', verificationStatus: 'FALSE — No such decision taken', action: 'Issue official Railway Ministry clarification. Monitor for re-emergence.', detectedAt: 'Aug 10, 2026 — 09:00 IST', ministries: ['Ministry of Railways'], region: 'All Regions', mediaType: 'Digital' },
];

export const crossPlatformData = {
  print: { totalArticles: 2847, positive: 44, neutral: 33, negative: 12, mixed: 11, topSources: [
    { name: 'Times of India', articles: 342, sentiment: 'Positive' },
    { name: 'Dainik Jagran', articles: 298, sentiment: 'Positive' },
    { name: 'The Hindu', articles: 215, sentiment: 'Neutral' },
    { name: 'Hindustan Times', articles: 198, sentiment: 'Positive' },
    { name: 'Indian Express', articles: 187, sentiment: 'Mixed' },
  ] },
  television: { totalMentions: 892, totalAirtime: '43.5 hours', positive: 38, neutral: 28, negative: 18, mixed: 16, topChannels: [
    { name: 'DD News', mentions: 145, sentiment: 'Positive' },
    { name: 'NDTV', mentions: 112, sentiment: 'Mixed' },
    { name: 'Republic', mentions: 98, sentiment: 'Positive' },
    { name: 'India Today TV', mentions: 87, sentiment: 'Neutral' },
    { name: 'Aaj Tak', mentions: 76, sentiment: 'Mixed' },
  ] },
  digital: { totalArticles: 1205, positive: 35, neutral: 30, negative: 20, mixed: 15, topPortals: [
    { name: 'NDTV.com', articles: 156, sentiment: 'Mixed' },
    { name: 'ThePrint', articles: 134, sentiment: 'Mixed' },
    { name: 'LiveMint', articles: 121, sentiment: 'Neutral' },
    { name: 'Firstpost', articles: 98, sentiment: 'Neutral' },
    { name: 'The Wire', articles: 87, sentiment: 'Critical' },
  ] },
  social: { totalMentions: 284000, totalEngagement: '12.4M', positive: 32, neutral: 25, negative: 28, mixed: 15, topPlatforms: [
    { name: 'X (Twitter)', mentions: '142K', sentiment: 'Mixed' },
    { name: 'YouTube', mentions: '68K', sentiment: 'Mixed' },
    { name: 'Facebook', mentions: '45K', sentiment: 'Positive' },
    { name: 'Instagram', mentions: '18K', sentiment: 'Positive' },
    { name: 'Reddit', mentions: '11K', sentiment: 'Critical' },
  ] },
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

export interface PercolationEntry {
  id: number;
  narrative: string;
  status: string;
  velocity: string;
  ministries: string[];
  regions: string[];
  media: string[];
  timeline: { day: string; outlet: string; type: string }[];
}

export const percolationData: PercolationEntry[] = [
  {
    id: 2,
    narrative: 'Unemployment methodology concerns',
    ministries: ['Ministry of Labour', 'Ministry of Statistics'],
    regions: ['All Regions'],
    media: ['All Media', 'Digital', 'Print', 'Television'],
    timeline: [
      { day: 'Aug 8', outlet: 'The Wire (Digital)', type: 'First Report' },
      { day: 'Aug 9', outlet: 'Mint (Print)', type: 'Amplification' },
      { day: 'Aug 10', outlet: 'Indian Express', type: 'Editorial' },
      { day: 'Aug 11', outlet: 'NDTV (TV)', type: 'Panel Discussion' },
      { day: 'Aug 12', outlet: 'Congress Press Conference', type: 'Political Pickup' },
      { day: 'Aug 13', outlet: 'Dainik Jagran, Amar Ujala', type: 'Regional Spread' },
    ],
    status: 'ESCALATING',
    velocity: 'High',
  },
  {
    id: 1,
    narrative: 'Gati Shakti 2.0 announcement',
    ministries: ['Ministry of Finance', 'Ministry of Commerce'],
    regions: ['All Regions'],
    media: ['All Media', 'Print', 'Digital', 'Television'],
    timeline: [
      { day: 'Aug 11', outlet: 'PTI Wire', type: 'First Report' },
      { day: 'Aug 11', outlet: 'All National Dailies', type: 'Front Page' },
      { day: 'Aug 12', outlet: 'Regional Hindi Press', type: 'Translation' },
      { day: 'Aug 12', outlet: 'Business Channels', type: 'Analysis' },
      { day: 'Aug 13', outlet: 'International Media', type: 'Global Coverage' },
    ],
    status: 'SATURATED',
    velocity: 'Peaked',
  },
];

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
