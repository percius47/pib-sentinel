import { MINISTRIES, REGIONS, MEDIA } from './filterOptions';

export const GRID_MINISTRIES = MINISTRIES.filter((m) => m !== 'All Ministries');
export const GRID_REGIONS = REGIONS.filter((r) => r !== 'All Regions');
export const GRID_MEDIA = MEDIA.filter((m) => m !== 'All Media') as Array<
  'Print' | 'Television' | 'Digital' | 'Social Media'
>;

const SENTIMENTS = ['Positive', 'Mixed', 'Neutral', 'Negative'] as const;

const OUTLET: Record<(typeof GRID_MEDIA)[number], Record<string, string>> = {
  Print: {
    'Hindi Belt': 'Dainik Jagran',
    'Maharashtra & Gujarat': 'Loksatta',
    'South India': 'The Hindu',
    Northeast: 'Assam Tribune',
    'Punjab & Haryana': 'The Tribune',
    'Eastern India': 'Sambad',
  },
  Television: {
    'Hindi Belt': 'Aaj Tak',
    'Maharashtra & Gujarat': 'Republic',
    'South India': 'Sun News',
    Northeast: 'News Live Assam',
    'Punjab & Haryana': 'Zee Punjab Haryana',
    'Eastern India': 'O TV',
  },
  Digital: {
    'Hindi Belt': 'Patrika.com',
    'Maharashtra & Gujarat': 'Mid-Day Online',
    'South India': 'Onmanorama',
    Northeast: 'The Shillong Times',
    'Punjab & Haryana': 'Punjab Kesari Digital',
    'Eastern India': 'The Telegraph Online',
  },
  'Social Media': {
    'Hindi Belt': 'X (Twitter)',
    'Maharashtra & Gujarat': 'Instagram',
    'South India': 'YouTube',
    Northeast: 'Facebook',
    'Punjab & Haryana': 'Facebook',
    'Eastern India': 'YouTube',
  },
};

const BEAT: Record<string, string> = {
  'Ministry of Finance': 'capex offtake and GST compliance',
  'Ministry of Defence': 'indigenous procurement and recruitment',
  'Ministry of External Affairs': 'consular services and trade diplomacy',
  'Ministry of Health & Family Welfare': 'empanelment and public-health delivery',
  'Ministry of Agriculture': 'MSP operations and scheme disbursement',
  'Ministry of Electronics & IT': 'rural connectivity and digital public goods',
  'Ministry of Labour': 'payroll additions and skilling',
  'Ministry of Statistics': 'survey methodology and district dashboards',
  'Ministry of Commerce': 'export facilitation and MSME paperwork',
  'Ministry of Road Transport': 'corridor works and FASTag operations',
  'Ministry of Railways': 'new services and station redevelopment',
  'Ministry of Home Affairs': 'internal security drills and civic outreach',
  'Ministry of Rural Development': 'wage lists and rural housing completions',
};

type ClipIn = {
  id: number;
  headline: string;
  summary: string;
  source: string;
  ministry: string;
  region: string;
  mediaType: (typeof GRID_MEDIA)[number];
  sentiment: (typeof SENTIMENTS)[number];
  relevanceScore?: number;
};

export function clip(p: ClipIn) {
  return {
    id: p.id,
    headline: p.headline,
    summary: p.summary,
    source: p.source,
    edition: p.mediaType === 'Print' ? 'Regional' : p.mediaType,
    date: 'Aug 12, 2026',
    page: p.mediaType === 'Print' ? 'Page 5' : 'N/A',
    relevanceScore: p.relevanceScore ?? 82,
    ministryTags: [{ name: p.ministry, confidence: 91 }],
    sentiment: p.sentiment,
    sentimentReason: 'Contextual classification of government-relevant coverage — not keyword matching.',
    crossReferences: 3,
    mediaType: p.mediaType,
    region: p.region,
    fullBody: p.summary,
    estimatedReach: '2.4M',
    audience: [p.region, p.mediaType],
    spreadTimeline: [{ day: 'Aug 12', outlet: p.source, type: 'Pickup' }],
    relatedArticleIds: [] as number[],
    historicalContext: 'Seeded so every ministry × region × medium filter returns live coverage.',
    detailedActions: ['Keep on the regional desk until the cycle cools'],
    sourceUrl: `https://pib.gov.in/sentinel/clip/${p.id}`,
    aiFlag: undefined as string | undefined,
  };
}

function comboKey(ministry: string, region: string, media: string) {
  return `${ministry}|${region}|${media}`;
}

export function buildCoverageArticles(existing: Array<{
  id: number;
  ministryTags: { name: string }[];
  region: string;
  mediaType: string;
}>) {
  const have = new Set<string>();
  for (const a of existing) {
    for (const t of a.ministryTags) have.add(comboKey(t.name, a.region, a.mediaType));
  }
  let nextId = Math.max(...existing.map((a) => a.id)) + 1;
  const extra: ReturnType<typeof clip>[] = [];
  let i = 0;
  for (const ministry of GRID_MINISTRIES) {
    const beat = BEAT[ministry] ?? 'scheme delivery';
    for (const region of GRID_REGIONS) {
      for (const mediaType of GRID_MEDIA) {
        if (have.has(comboKey(ministry, region, mediaType))) continue;
        const sentiment = SENTIMENTS[i % SENTIMENTS.length];
        extra.push(clip({
          id: nextId,
          headline: `${ministry.replace('Ministry of ', '')}: ${beat} — ${region} ${mediaType.toLowerCase()} desk`,
          summary: `${OUTLET[mediaType][region]} coverage of ${beat} for ${ministry} in ${region}. Seeded so this filter combination is not empty.`,
          source: OUTLET[mediaType][region],
          ministry,
          region,
          mediaType,
          sentiment,
          relevanceScore: 78 + (i % 12),
        }));
        have.add(comboKey(ministry, region, mediaType));
        nextId += 1;
        i += 1;
      }
    }
  }
  return extra;
}

const EXTRA_NARRATIVE_MINISTRIES = [
  'Ministry of Agriculture',
  'Ministry of Statistics',
  'Ministry of Commerce',
  'Ministry of Road Transport',
  'Ministry of Railways',
  'Ministry of Home Affairs',
  'Ministry of Rural Development',
];

export const extraNarratives = EXTRA_NARRATIVE_MINISTRIES.map((ministry, idx) => ({
  id: 7 + idx,
  title: `${ministry.replace('Ministry of ', '')} cycle: ${BEAT[ministry]} across regions`,
  tone: (['Positive', 'Mixed', 'Neutral', 'Critical'] as const)[idx % 4],
  spread: (['Medium', 'High', 'Low'] as const)[idx % 3],
  riskLevel: (['Low', 'Medium', 'High'] as const)[idx % 3],
  suggestedAction: `Brief ${ministry} spokespeople; push a regional fact sheet for desks that are still thin.`,
  outlets: 5 + (idx % 6),
  trendData: [12, 18, 22, 28, 31, 35, 38].map((v) => v + idx),
  ministries: [ministry],
  regions: [...GRID_REGIONS],
}));

export const extraPercolation = extraNarratives.map((n) => ({
  id: n.id,
  narrative: n.title,
  timeline: [
    { day: 'Aug 10', outlet: 'PIB desk', type: 'Official' },
    { day: 'Aug 11', outlet: 'National pickup', type: 'Print' },
    { day: 'Aug 12', outlet: 'Regional TV', type: 'Broadcast' },
    { day: 'Aug 13', outlet: 'Digital / social', type: 'Amplification' },
  ],
  status: (n.riskLevel === 'High' ? 'ESCALATING' : 'STABLE') as 'ESCALATING' | 'SATURATED' | 'STABLE',
  velocity: n.spread === 'High' ? 'High' : 'Steady',
  ministries: n.ministries,
  regions: [...GRID_REGIONS],
  media: [...GRID_MEDIA],
}));

export function extraNarrativeDetails(): Record<number, {
  status: 'ESCALATING' | 'SATURATED' | 'STABLE';
  outletBreakdown: { outlet: string; tone: string; reach: string }[];
  timeline: { day: string; outlet: string; type: string }[];
  ministryImpact: { name: string; confidence: number }[];
  velocitySeries: { day: string; mentions: number }[];
  historicalPattern: string;
  response: { priority: string; timeline: string; spokesperson: string; notes: string };
  sourceArticleIds: number[];
}> {
  const out: ReturnType<typeof extraNarrativeDetails> = {};
  for (const n of extraNarratives) {
    out[n.id] = {
      status: n.riskLevel === 'High' ? 'ESCALATING' : 'STABLE',
      outletBreakdown: [
        { outlet: 'National desk', tone: n.tone, reach: '1.4M' },
        { outlet: 'Regional press', tone: 'Neutral', reach: '0.6M' },
        { outlet: 'Digital', tone: n.tone, reach: '0.9M' },
      ],
      timeline: extraPercolation.find((p) => p.id === n.id)?.timeline ?? [],
      ministryImpact: [{ name: n.ministries[0], confidence: 90 }],
      velocitySeries: n.trendData.map((mentions, i) => ({ day: `Aug ${7 + i}`, mentions })),
      historicalPattern: `Routine ${n.ministries[0]} cycle. Fill regional desks before a vacuum opens.`,
      response: {
        priority: n.riskLevel === 'High' ? 'Immediate' : 'Monitor',
        timeline: n.riskLevel === 'High' ? '24 hours' : 'This week',
        spokesperson: `${n.ministries[0]} PRO`,
        notes: n.suggestedAction,
      },
      sourceArticleIds: [],
    };
  }
  return out;
}

export const extraAlerts = GRID_MINISTRIES.flatMap((ministry, mi) =>
  GRID_REGIONS.map((region, ri) => ({
    id: 6 + mi * GRID_REGIONS.length + ri,
    title: `${ministry.replace('Ministry of ', '')} watch item — ${region}`,
    severity: (['LOW', 'MEDIUM', 'HIGH'] as const)[(mi + ri) % 3],
    description: `Desk signal on ${BEAT[ministry]} in ${region}. Seeded so this ministry/region pair is not an empty Alerts section.`,
    escalationProbability: 22 + ((mi * 7 + ri * 5) % 55),
    historicalMatch: 'Typical regional implementation cycle; not a national scandal fingerprint.',
    timeToCritical: ['5-7 days', '3-5 days', '24-48 hours'][(mi + ri) % 3],
    recommendation: `PIB ${region} unit: one factual note on ${BEAT[ministry]} before the next news cycle.`,
    source: `${OUTLET.Print[region]}, ${OUTLET.Digital[region]}`,
    timestamp: 'Aug 13, 2026 — 12:00 IST',
    ministries: [ministry],
    region,
  })),
);

export const extraPenetration = GRID_MINISTRIES.flatMap((ministry) =>
  GRID_REGIONS.map((region) => ({
    message: `${ministry.replace('Ministry of ', '')} — ${BEAT[ministry]}`,
    pickupNational: 55 + (ministry.length % 30),
    pickupRegional: 32 + (region.length % 40),
    pickupDigital: 40 + ((ministry.length + region.length) % 35),
    gap: `Vernacular pickup in ${region} is below the 75% target for this message.`,
    action: `Issue a ${region} fact sheet and one beneficiary clip for ${ministry}.`,
    priority: (['MEDIUM', 'HIGH', 'LOW'] as const)[ministry.length % 3],
    ministry,
    region,
  })),
);

export const extraMisinfo = GRID_MINISTRIES.flatMap((ministry, mi) =>
  GRID_REGIONS.map((region, ri) => ({
    id: 5 + mi * GRID_REGIONS.length + ri,
    claim: `"${ministry.replace('Ministry of ', '')} scrapped ${BEAT[ministry]} in ${region}"`,
    sourceType: ri % 2 === 0 ? 'Social Media (X, WhatsApp)' : 'Small digital portals',
    spread: ['Low — 40K reach', 'Medium — 180K reach', 'Low-Medium — 90K reach'][(mi + ri) % 3],
    spreadLevel: (['low', 'medium', 'low'] as const)[(mi + ri) % 3],
    verificationStatus: (['FALSE — No such decision', 'MISLEADING — Partial quote', 'FALSE — Recycled footage'] as const)[(mi + ri) % 3],
    action: `PIB Fact Check + ${region} unit: one visual correction for ${ministry}.`,
    detectedAt: 'Aug 12, 2026 — 16:00 IST',
    ministries: [ministry],
    region,
  })),
);

const EXTRA_CLUSTER_MINISTRIES = [
  'Ministry of Home Affairs',
  'Ministry of Rural Development',
  'Ministry of Road Transport',
];

export const extraClusters = EXTRA_CLUSTER_MINISTRIES.map((ministry, i) => ({
  id: 8 + i,
  event: `${ministry.replace('Ministry of ', '')} regional cycle`,
  headline: `${BEAT[ministry]} — cluster across regions and media`,
  articleIds: [] as number[],
  outlets: 6,
  toneSplit: { positive: 3, neutral: 2, mixed: 1, negative: 0 },
  genuineScore: 70 + (i % 15),
  outletsSummary: ['PTI', 'Regional press', 'DD News', 'Digital desks'],
  ministries: [ministry],
  regions: [...GRID_REGIONS],
  media: [...GRID_MEDIA],
  note: `Seeded cluster so ${ministry} still has a stance-compare strip under any region or medium filter.`,
}));

export function ministryBriefings() {
  return Object.fromEntries(
    GRID_MINISTRIES.map((ministry) => [
      ministry,
      {
        ministry,
        date: 'August 13, 2026',
        generatedAt: '09:00 IST',
        overallSentiment: 'Mixed',
        coverageVolume: 120 + ministry.length * 9,
        keyHighlights: [
          `${ministry} is active in all six regions this cycle.`,
          `Primary beat: ${BEAT[ministry]}.`,
          'No empty filter combination — regional desks have copy in print, TV, digital, and social.',
        ],
        talkingPoints: [
          `Lead with verified numbers on ${BEAT[ministry]}.`,
          'Offer a regional spokesperson for vernacular desks, not only Delhi English.',
        ],
        mediaAdvisory: [
          `Schedule one ${ministry} briefing for Hindi belt and one for the south.`,
          'Do not let a coverage gap sit more than 48 hours.',
        ],
        riskItems: [
          `Watch misinfo claiming ${ministry} cancelled field programmes.`,
        ],
      },
    ]),
  ) as Record<string, {
    ministry: string;
    date: string;
    generatedAt: string;
    overallSentiment: string;
    coverageVolume: number;
    keyHighlights: string[];
    talkingPoints: string[];
    mediaAdvisory: string[];
    riskItems: string[];
  }>;
}
