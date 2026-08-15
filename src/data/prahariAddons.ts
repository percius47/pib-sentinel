/** Officer-tool seed that hangs off the existing graph / articles / clusters. */

export const graphSchemes = [
  { id: 'scheme:gati', label: 'PM Gati Shakti 2.0', ministry: 'Ministry of Finance', clusterId: 1, articleId: 1 },
  { id: 'scheme:pm-kisan', label: 'PM-KISAN', ministry: 'Ministry of Agriculture', clusterId: 3, articleId: 4 },
  { id: 'scheme:ayushman', label: 'Ayushman Bharat 2.0', ministry: 'Ministry of Health & Family Welfare', clusterId: 4, articleId: 8 },
];

export const graphOfficials = [
  { id: 'off:fin-spo', label: 'Finance spokesperson', ministry: 'Ministry of Finance', articleId: 9 },
  { id: 'off:mospi', label: 'MoSPI technical desk', ministry: 'Ministry of Statistics', articleId: 2 },
];

export const graphJournalists = [
  { id: 'j:mint-econ', label: 'Mint labour desk', outlet: 'Mint', beat: 'Jobs / PLFS', region: 'Maharashtra & Gujarat', articleId: 2 },
  { id: 'j:hindu-trade', label: 'The Hindu trade correspondent', outlet: 'The Hindu', beat: 'ASEAN / ports', region: 'South India', articleId: 5 },
  { id: 'j:amar-kisan', label: 'Amar Ujala Lucknow agri', outlet: 'Amar Ujala', beat: 'PM-KISAN districts', region: 'Hindi Belt', articleId: 4 },
];

export const pastResponses = [
  {
    id: 'pr:plfs-2024',
    label: 'Feb 2024 PLFS methodology note',
    worked: true,
    claimHint: 'employment',
    misinfoId: 1,
    summary: 'Joint MoSPI + Labour technical note with EPFO payroll table. Cycle cooled in 36 hours.',
  },
  {
    id: 'pr:mgnrega-visual',
    label: 'MGNREGA allocation visual (2025)',
    worked: true,
    claimHint: 'mgnrega',
    misinfoId: 1,
    summary: 'Side-by-side budget graphic through PIB Fact Check. Hindi forwards dropped 60% overnight.',
  },
  {
    id: 'pr:flood-2023',
    label: '2023 Kerala B-roll correction',
    worked: true,
    claimHint: 'flood',
    misinfoId: 2,
    summary: 'Image comparison Fact Check; vernacular seed from Kerala PIB. Do not quote the fake caption.',
  },
];

export type StoryMutation = { outlet: string; language: string; variant: string; hour: string };

export const storyTrees: Record<number, StoryMutation[]> = {
  1: [
    { hour: 'T+0h', outlet: 'PIB pool / DD News', language: 'Hindi + English', variant: 'Cabinet approves Rs 2.5 lakh crore' },
    { hour: 'T+2h', outlet: 'Times of India', language: 'English', variant: 'Jobs + corridor maps added' },
    { hour: 'T+6h', outlet: 'Dainik Jagran', language: 'Hindi', variant: 'District employment angle' },
    { hour: 'T+11h', outlet: 'CNBC-TV18', language: 'English', variant: 'Matching-grant scepticism appears' },
  ],
  2: [
    { hour: 'T+0h', outlet: 'Mint', language: 'English', variant: 'PLFS gig-worker reclassification' },
    { hour: 'T+4h', outlet: 'The Wire', language: 'English', variant: '3.2 pp overstatement claim' },
    { hour: 'T+9h', outlet: 'NDTV panel', language: 'English', variant: 'Opposition jobs report pickup' },
    { hour: 'T+14h', outlet: 'Hindi dailies', language: 'Hindi', variant: 'Political packaging, numbers flattened' },
  ],
  3: [
    { hour: 'T+0h', outlet: 'Amar Ujala district', language: 'Hindi', variant: '17th instalment not credited' },
    { hour: 'T+8h', outlet: 'Dainik Bhaskar', language: 'Hindi', variant: 'Named blocks in UP/Bihar' },
    { hour: 'T+16h', outlet: 'Aaj Tak', language: 'Hindi TV', variant: 'National desk still holding' },
  ],
};

export type CorrelationHit = {
  narrativeId: number;
  verdict: 'Coordinated' | 'Coincidence' | 'Seasonal';
  courts: string;
  elections: string;
  states: string;
};

export function correlationFor(id: number): CorrelationHit {
  return narrativeCorrelation.find((c) => c.narrativeId === id) ?? {
    narrativeId: id,
    verdict: 'Coincidence',
    courts: 'No linked judgment in this slice.',
    elections: 'No poll calendar clash in seed.',
    states: 'Not a five-State surge in current filters.',
  };
}

export const narrativeCorrelation: CorrelationHit[] = [
  {
    narrativeId: 1,
    verdict: 'Coincidence',
    courts: 'No live PIL on Gati corridors this week.',
    elections: 'No poll-bound state in the cabinet note.',
    states: 'Same talking points in 8 States — wire copy, not coordination.',
  },
  {
    narrativeId: 2,
    verdict: 'Coordinated',
    courts: 'No court order; methodology is administrative.',
    elections: 'Opposition jobs film timed to session week.',
    states: 'Same 3.2 pp figure in five States within 9 hours.',
  },
  {
    narrativeId: 3,
    verdict: 'Coincidence',
    courts: 'No FTA litigation this week.',
    elections: 'None.',
    states: 'English metros only — not a five-State complaint.',
  },
];

export const schemeHistory = {
  scheme: 'PM Gati Shakti',
  series: [
    { period: 'Aug 2025', volume: 420, sentiment: 61 },
    { period: 'Nov 2025', volume: 310, sentiment: 58 },
    { period: 'Feb 2026', volume: 880, sentiment: 72 },
    { period: 'May 2026', volume: 510, sentiment: 64 },
    { period: 'Aug 2026', volume: 1240, sentiment: 78 },
  ],
  note: 'August spikes match Cabinet windows. Sentiment is higher than Aug 2025 (+17) on the same scheme.',
};

export const officerTrust = {
  band: 'Band B — vernacular correction, no new policy line',
  score: 78,
  joint: 'Finance × Labour shared thread on PLFS (opened 12 Aug)',
  note: 'Calibrated from 14 signed outcomes this quarter. Band widens after two clean corrections.',
};

export const radarPitches = [
  {
    id: 'radar-gati-south',
    messageMatch: /ASEAN|south|corridor|Gati/i,
    district: 'Vizag / Kochi SME belt',
    scheme: 'India–ASEAN corridor',
    coverage: '34% pickup vs 75% target',
    journalist: 'The Hindu trade correspondent',
    pitch: 'Port jobs + exporter quotes. Warm follow after today’s Chennai edition.',
  },
  {
    id: 'radar-kisan',
    messageMatch: /KISAN|farmer|agri/i,
    district: 'Sitapur & Nalanda blocks with on-time credit',
    scheme: 'PM-KISAN',
    coverage: 'Zero national desk; delay story is crowding the win',
    journalist: 'Amar Ujala Lucknow agri',
    pitch: 'Named villages that received the 17th instalment on schedule.',
  },
];

export const immuneStrains = [
  {
    misinfoId: 1,
    strain: 'N-BUD-02 · “MGNREGA diverted to corporates”',
    lastSeen: 'Budget cycle 2025, Hindi Belt',
    rebuttalId: 'pr:mgnrega-visual',
    rebuttal: 'Reuse the allocation visual. Do not debate the forged PDF line-by-line on TV.',
  },
  {
    misinfoId: 2,
    strain: 'N-QTE-07 · summit quote stripped of context',
    lastSeen: 'Prior ASEAN cycle, YouTube first',
    rebuttalId: 'pr:plfs-2024',
    rebuttal: 'Full clip + transcript to fact-check networks. Do not repeat the truncated line.',
  },
];

export const mitraReports = [
  {
    id: 'mitra-1',
    rumour: 'WhatsApp forward: ration shop in Imphal closed “by Delhi order”',
    region: 'Northeast',
    reporter: 'Mitra · R. Devi',
    reputation: 86,
    status: 'Vetted',
    note: 'Hyperlocal; no print pickup yet. E2E chat is invisible to the graph — this is the human channel.',
  },
  {
    id: 'mitra-2',
    rumour: 'Voice note: “GST raid on every kirana in Surat tonight”',
    region: 'Maharashtra & Gujarat',
    reporter: 'Mitra · K. Patel',
    reputation: 71,
    status: 'Needs second source',
    note: 'Two hops, same recording. Reputation holds if the second stringer contradicts.',
  },
  {
    id: 'mitra-3',
    rumour: 'Temple-queue claim that a scheme form is “only in English”',
    region: 'South India',
    reporter: 'Mitra · S. Iyer',
    reputation: 91,
    status: 'Accurate last 8 reports',
    note: 'Track record system — accuracy, not volume, ranks this sensor.',
  },
];

export const handoverExtra = {
  recurred: [
    'PLFS methodology critique — two-year fingerprint, same Mint → Wire → TV path.',
    'PM-KISAN instalment delay in named Hindi Belt blocks — smoulders each cycle.',
  ],
  worked: [
    'Feb 2024 technical note (MoSPI + Labour) — cooled the jobs cycle.',
    'Kerala 2023 image-comparison Fact Check — do not quote fake captions.',
  ],
  backfired: [
    'Over-briefing English desks on Gati after saturation — looked defensive, added no pickup.',
  ],
  people: graphJournalists.map((j) => `${j.label} · ${j.beat} · ${j.outlet}`),
};

export const rehearsalPersonas = [
  {
    id: 'hostile',
    name: 'Hostile spokesperson',
    kind: 'Attack',
    line: 'You are hiding the 3.2 pp. If the number were real you would release district microdata tonight.',
  },
  {
    id: 'sceptical',
    name: 'Sceptical journalist',
    kind: 'Probe',
    line: 'Is EPFO a substitute for PLFS? Walk me through gig-worker classification in one paragraph I can print.',
  },
  {
    id: 'badfaith',
    name: 'Bad-faith reading',
    kind: 'Cut',
    line: 'Headline: “PIB admits jobs data was cooked.” Any hedge in your draft will be cut to that.',
  },
] as const;

export const rehearsalSeed =
  'PLFS follows ICLS-19. Gig workers are not silently reclassified. EPFO added 18.6 lakh in Q1. District tables follow at 18:00 IST.';

export const preMortem = {
  announcement: 'State-wise PM-KISAN 17th instalment dashboard (draft, Monday)',
  regions: [
    { region: 'Hindi Belt', risk: 'High', note: 'Delay stories already named blocks. Dashboard without those blocks looks evasive.' },
    { region: 'South India', risk: 'Low', note: 'Low baseline coverage; a Tamil/Telugu farmer quote would be net-new.' },
    { region: 'Northeast', risk: 'Medium', note: 'Connectivity grievance is real — do not lead with a national success montage.' },
  ],
};

export const storyChatFallback = {
  patterns: [/./],
  response:
    'Story mode is scoped to this cluster and its variants — not the whole graph.\n\n' +
    'Ask what each outlet claimed, where they disagree, or how the line mutated by language. Open a citation to read the piece.',
  citations: [1, 2] as number[],
};

export const storyChatByCluster: Record<number, { patterns: RegExp[]; response: string; citations: number[] }[]> = {
  1: [
    {
      patterns: [/disagree|each|outlet|claim|variant|mutat/i],
      response:
        'On Gati Shakti 2.0 the canonical line is the Cabinet figure [c:1]. DD News and TOI stay on jobs and corridors [c:10][c:1]. The mutation is the matching-grant scepticism on CNBC-TV18 [c:9] — not a different number, a different implication.\n\nHindi desks added district employment; they did not contest the outlay.',
      citations: [1, 10, 9],
    },
  ],
  2: [
    {
      patterns: [/disagree|each|outlet|claim|variant|mutat|plfs|jobs/i],
      response:
        'Mint originated the methodology critique [c:2]. The Wire sharpened it to a 3.2 pp overstatement [c:6]. NDTV and Hindi dailies then ran the political package. Business Standard is the dissenting factual counter via EPFO [c:26].\n\nThey disagree on whether PLFS classification is a technical choice or a political one — not on the existence of the survey.',
      citations: [2, 6, 26],
    },
  ],
};
