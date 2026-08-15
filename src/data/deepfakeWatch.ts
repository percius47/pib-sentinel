export type DeepfakeModality = 'video' | 'image' | 'audio';
export type DeepfakeVerdict = 'Synthetic' | 'Recontextualised' | 'Cloned audio' | 'Low-quality AI';

export interface DeepfakeCase {
  id: string;
  title: string;
  modality: DeepfakeModality;
  verdict: DeepfakeVerdict;
  authenticity: number;
  provenance: 'none' | 'pib';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  ministries: string[];
  region: string;
  articleId: number;
  originalDate: string;
  viralDate: string;
  originalSource: string;
  finding: string;
  action: string;
  scan: number[];
  realTitle: string;
  realDate: string;
}

export const deepfakeCases: DeepfakeCase[] = [
  {
    id: 'df-flood',
    title: 'Old flood footage circulated as current Kerala disaster',
    modality: 'video',
    verdict: 'Recontextualised',
    authenticity: 14,
    provenance: 'none',
    severity: 'HIGH',
    ministries: ['Ministry of Home Affairs'],
    region: 'South India',
    articleId: 15,
    originalDate: 'Jul 2023 · Kerala PIB stills',
    viralDate: 'Aug 11, 2026 · WhatsApp / X',
    originalSource: 'Reverse match: 2023 monsoon relief B-roll',
    finding: 'Same frames as a 2023 relief pool feed. Caption dates the clip as 12 Aug 2026. No C2PA credential. Share graph is organic after the first 40 minutes.',
    action: 'Issue image-comparison Fact Check; Kerala PIB office to seed vernacular correction.',
    scan: [12, 18, 14, 40, 88, 91, 70, 22, 16, 19, 15, 13],
    realTitle: 'PIB pool relief B-roll (credentialed 2023)',
    realDate: 'Jul 2023 · C2PA signed',
  },
  {
    id: 'df-faceswap',
    title: 'Face-swap clip: minister “mocks” flood victims',
    modality: 'video',
    verdict: 'Synthetic',
    authenticity: 9,
    provenance: 'none',
    severity: 'HIGH',
    ministries: ['Ministry of Home Affairs'],
    region: 'Eastern India',
    articleId: 6,
    originalDate: '2019 · Unrelated podium clip',
    viralDate: 'Aug 13, 2026 · short-video apps',
    originalSource: 'Landmark / jaw mismatch; 2019 source frame recovered',
    finding: 'Inner-face swap on a 2019 podium shot. Audio bed is a separate 2024 rally. Model watermark in two I-frames. Not a PIB-issued asset.',
    action: 'Priority Fact Check with side-by-side frames. Do not amplify by quoting the fake line.',
    scan: [8, 11, 9, 72, 94, 96, 90, 44, 12, 10, 8, 7],
    realTitle: '2019 podium pool still — unaltered',
    realDate: '2019 · PIB archive',
  },
  {
    id: 'df-audio',
    title: 'Cloned GST briefing audio pushed as “leaked cabinet audio”',
    modality: 'audio',
    verdict: 'Cloned audio',
    authenticity: 21,
    provenance: 'none',
    severity: 'MEDIUM',
    ministries: ['Ministry of Finance'],
    region: 'Maharashtra & Gujarat',
    articleId: 9,
    originalDate: 'Jul 2026 · official GST presser',
    viralDate: 'Aug 12, 2026 · Telegram forwards',
    originalSource: 'Prosody clone of Finance spokesperson; formant drift',
    finding: 'Timbre matches a July briefing; phoneme timing does not. No content credential. First hop is a new channel created 11 Aug.',
    action: 'Publish 20-second official clip with credential. Ask platforms to label the clone.',
    scan: [30, 28, 55, 80, 86, 40, 22, 70, 88, 33, 29, 31],
    realTitle: 'July GST presser — PIB-issued audio',
    realDate: 'Jul 2026 · credentialed',
  },
  {
    id: 'df-poster',
    title: 'AI poster claiming Digital India “shutdown” in Meghalaya hills',
    modality: 'image',
    verdict: 'Low-quality AI',
    authenticity: 18,
    provenance: 'none',
    severity: 'MEDIUM',
    ministries: ['Ministry of Electronics & IT'],
    region: 'Northeast',
    articleId: 24,
    originalDate: '— · no photographic original',
    viralDate: 'Aug 13, 2026 · Facebook',
    originalSource: 'Diffusion artefacts; misspelt MeitY lockup',
    finding: 'Six-finger hands on a “engineer” extra, warped Devanagari, invented tower geometry. Coverage of real hill-district gaps exists — this graphic is not it.',
    action: 'Correct the graphic; keep the genuine connectivity-gap story on the briefing.',
    scan: [20, 24, 22, 60, 85, 82, 25, 21, 19, 48, 80, 22],
    realTitle: 'MeitY hill-connectivity still (no shutdown)',
    realDate: 'PIB Digital India kit',
  },
  {
    id: 'df-reel',
    title: 'Subsidy reel with swapped irrigation stills from another state',
    modality: 'image',
    verdict: 'Recontextualised',
    authenticity: 36,
    provenance: 'none',
    severity: 'LOW',
    ministries: ['Ministry of Agriculture'],
    region: 'Maharashtra & Gujarat',
    articleId: 22,
    originalDate: '2024 · Rajasthan drip-demo stills',
    viralDate: 'Aug 13, 2026 · Instagram',
    originalSource: 'EXIF stripped; visual match to 2024 Jaipur demo',
    finding: 'Nashik reel is genuine farmer speech; B-roll stills are a 2024 Rajasthan demo. Mixed authenticity — voice organic, pictures borrowed.',
    action: 'Ask the creator to swap stills; no full takedown. Brief Agriculture desk.',
    scan: [40, 42, 38, 35, 70, 74, 36, 34, 41, 39, 37, 40],
    realTitle: 'Nashik farmer speech (voice is genuine)',
    realDate: 'Aug 2026 · no stills credential',
  },
  {
    id: 'df-pib',
    title: 'Control: PIB-credentialed DD News GST package',
    modality: 'video',
    verdict: 'Recontextualised',
    authenticity: 94,
    provenance: 'pib',
    severity: 'LOW',
    ministries: ['Ministry of Finance'],
    region: 'Hindi Belt',
    articleId: 10,
    originalDate: 'Aug 12, 2026 · DD News / PIB pool',
    viralDate: 'Aug 12, 2026 · syndicated',
    originalSource: 'C2PA signed by PIB pool camera',
    finding: 'Included as a clean control. Credential verifies. Use as the reference package when rebutting clones.',
    action: 'No action — keep in the evidence locker as the genuine comparator.',
    scan: [90, 92, 91, 93, 94, 95, 93, 92, 91, 94, 93, 92],
    realTitle: 'This package is the provably real version',
    realDate: 'Aug 12, 2026 · C2PA PIB pool',
  },
];
