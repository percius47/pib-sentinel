import {
  articles,
  narratives,
  storyClusters,
  misinfoItems,
  type Article,
  type Narrative,
  type StoryCluster,
} from './mockData';

export type GraphNodeKind =
  | 'Ministry'
  | 'Region'
  | 'Outlet'
  | 'Article'
  | 'Narrative'
  | 'Cluster'
  | 'Claim';

export const GRAPH_KIND_COLOR: Record<GraphNodeKind, string> = {
  Ministry: '#c45a12',
  Region: '#138808',
  Outlet: '#3b82f6',
  Article: '#a1a1aa',
  Narrative: '#8b5cf6',
  Cluster: '#06b6d4',
  Claim: '#ef4444',
};

export interface GraphEntity {
  id: string;
  kind: GraphNodeKind;
  label: string;
  subtitle?: string;
  articleId?: number;
  narrativeId?: number;
  clusterId?: number;
  claimId?: number;
  [key: string]: string | number | undefined;
}

export interface GraphLink {
  id: string;
  source: string;
  target: string;
}

export interface KnowledgeGraph {
  nodes: GraphEntity[];
  links: GraphLink[];
}

interface GraphFilters {
  ministry: string;
  region: string;
  media: string;
}

const HANDWRITTEN_MAX_ID = 8;

function slug(prefix: string, value: string) {
  return `${prefix}:${value.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
}

function tokens(s: string) {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3),
  );
}

function overlap(a: string, b: string) {
  const ta = tokens(a);
  const tb = tokens(b);
  let n = 0;
  for (const t of ta) if (tb.has(t)) n += 1;
  return n;
}

function filterArticle(a: Article, f: GraphFilters) {
  if (f.ministry !== 'All Ministries' && !a.ministryTags.some((t) => t.name === f.ministry)) return false;
  if (f.region !== 'All Regions' && a.region !== f.region) return false;
  if (f.media !== 'All Media' && a.mediaType !== f.media) return false;
  return true;
}

function filterNarrative(n: Narrative, f: GraphFilters) {
  if (f.ministry !== 'All Ministries' && !n.ministries.includes(f.ministry)) return false;
  if (f.region !== 'All Regions' && !(n.regions || []).includes(f.region)) return false;
  return true;
}

function filterCluster(c: StoryCluster, f: GraphFilters) {
  if (f.ministry !== 'All Ministries' && !c.ministries.includes(f.ministry)) return false;
  if (f.region !== 'All Regions' && !c.regions.includes(f.region)) return false;
  if (f.media !== 'All Media' && !c.media.includes(f.media)) return false;
  return true;
}

export function buildKnowledgeGraph(filters: GraphFilters): KnowledgeGraph {
  const clusteredIds = new Set(storyClusters.flatMap((c) => c.articleIds));
  const featured = articles.filter((a) => {
    if (!filterArticle(a, filters)) return false;
    return a.id <= HANDWRITTEN_MAX_ID || clusteredIds.has(a.id);
  }).slice(0, 48);

  const visNarratives = narratives.filter((n) => filterNarrative(n, filters));
  const visClusters = storyClusters.filter((c) => filterCluster(c, filters));
  const visMisinfo = misinfoItems.filter((m) => {
    if (filters.ministry !== 'All Ministries' && !(m.ministries || []).includes(filters.ministry)) return false;
    if (filters.region !== 'All Regions' && m.region !== filters.region) return false;
    return true;
  });

  const nodeMap = new Map<string, GraphEntity>();
  const links: GraphLink[] = [];
  const linkSet = new Set<string>();

  function addNode(n: GraphEntity) {
    if (!nodeMap.has(n.id)) nodeMap.set(n.id, n);
  }
  function addLink(source: string, target: string) {
    if (!nodeMap.has(source) || !nodeMap.has(target)) return;
    const key = source < target ? `${source}|${target}` : `${target}|${source}`;
    if (linkSet.has(key)) return;
    linkSet.add(key);
    links.push({ id: key, source, target });
  }

  for (const n of visNarratives) {
    addNode({
      id: `nar:${n.id}`,
      kind: 'Narrative',
      label: n.title.length > 42 ? `${n.title.slice(0, 40)}…` : n.title,
      subtitle: `${n.tone} · ${n.spread} spread`,
      narrativeId: n.id,
    });
    for (const m of n.ministries) {
      addNode({ id: slug('min', m), kind: 'Ministry', label: m.replace('Ministry of ', ''), subtitle: m });
      addLink(`nar:${n.id}`, slug('min', m));
    }
    for (const r of n.regions || []) {
      addNode({ id: slug('reg', r), kind: 'Region', label: r });
      addLink(`nar:${n.id}`, slug('reg', r));
    }
  }

  for (const c of visClusters) {
    addNode({
      id: `clu:${c.id}`,
      kind: 'Cluster',
      label: c.event,
      subtitle: `${c.outlets} outlets`,
      clusterId: c.id,
    });
    for (const m of c.ministries) {
      addNode({ id: slug('min', m), kind: 'Ministry', label: m.replace('Ministry of ', ''), subtitle: m });
      addLink(`clu:${c.id}`, slug('min', m));
    }
    for (const r of c.regions) {
      addNode({ id: slug('reg', r), kind: 'Region', label: r });
      addLink(`clu:${c.id}`, slug('reg', r));
    }
    const match = visNarratives.find((n) => overlap(n.title, c.event) >= 2 || overlap(n.title, c.headline) >= 2);
    if (match) addLink(`clu:${c.id}`, `nar:${match.id}`);
  }

  for (const a of featured) {
    addNode({
      id: `art:${a.id}`,
      kind: 'Article',
      label: a.headline.length > 46 ? `${a.headline.slice(0, 44)}…` : a.headline,
      subtitle: a.source,
      articleId: a.id,
    });
    addNode({ id: slug('out', a.source), kind: 'Outlet', label: a.source, subtitle: a.mediaType });
    addLink(`art:${a.id}`, slug('out', a.source));
    addNode({ id: slug('reg', a.region), kind: 'Region', label: a.region });
    addLink(`art:${a.id}`, slug('reg', a.region));
    for (const t of a.ministryTags) {
      addNode({ id: slug('min', t.name), kind: 'Ministry', label: t.name.replace('Ministry of ', ''), subtitle: t.name });
      addLink(`art:${a.id}`, slug('min', t.name));
    }
    const cluster = visClusters.find((c) => c.articleIds.includes(a.id));
    if (cluster) addLink(`art:${a.id}`, `clu:${cluster.id}`);
  }

  for (const m of visMisinfo) {
    addNode({
      id: `claim:${m.id}`,
      kind: 'Claim',
      label: m.claim.replace(/^"|"$/g, '').slice(0, 48),
      subtitle: m.verificationStatus.split('—')[0].trim(),
      claimId: m.id,
    });
    for (const min of m.ministries || []) {
      addNode({ id: slug('min', min), kind: 'Ministry', label: min.replace('Ministry of ', ''), subtitle: min });
      addLink(`claim:${m.id}`, slug('min', min));
    }
    if (m.region) {
      addNode({ id: slug('reg', m.region), kind: 'Region', label: m.region });
      addLink(`claim:${m.id}`, slug('reg', m.region));
    }
    const related = featured.find((a) =>
      a.ministryTags.some((t) => (m.ministries || []).includes(t.name)) && a.region === m.region,
    );
    if (related) addLink(`claim:${m.id}`, `art:${related.id}`);
  }

  return { nodes: Array.from(nodeMap.values()), links };
}

const RING: Record<GraphNodeKind, number> = {
  Narrative: 0,
  Cluster: 170,
  Claim: 230,
  Ministry: 300,
  Region: 380,
  Outlet: 470,
  Article: 560,
};

export function layoutKnowledgeGraph(graph: KnowledgeGraph) {
  const byKind = new Map<GraphNodeKind, GraphEntity[]>();
  for (const n of graph.nodes) {
    const list = byKind.get(n.kind) ?? [];
    list.push(n);
    byKind.set(n.kind, list);
  }
  const cx = 520;
  const cy = 420;
  const positions = new Map<string, { x: number; y: number }>();
  for (const [kind, list] of byKind) {
    const r = RING[kind];
    list.forEach((n, i) => {
      if (r === 0) {
        const col = i % 3;
        const row = Math.floor(i / 3);
        positions.set(n.id, { x: cx + (col - 1) * 180, y: cy + row * 70 - 20 });
        return;
      }
      const angle = (i / Math.max(list.length, 1)) * Math.PI * 2 - Math.PI / 2;
      const jitter = (i % 3) * 8;
      positions.set(n.id, {
        x: cx + Math.cos(angle) * (r + jitter),
        y: cy + Math.sin(angle) * (r + jitter) * 0.82,
      });
    });
  }
  return positions;
}
