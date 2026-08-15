import {
  articleCluster,
  type Article,
  type AskResponse,
} from './mockData';
import {
  graphJournalists,
  graphOfficials,
  graphSchemes,
  pastResponses,
  storyChatByCluster,
  storyTrees,
} from './prahariAddons';

export function matchArticleChat(
  article: Article,
  mode: 'story' | 'graph',
  query: string,
): AskResponse {
  const q = query.trim();
  const cluster = articleCluster(article.id);
  const mates = (cluster?.articleIds ?? [article.id]).filter((id) => id !== article.id).slice(0, 3);
  const cites = [article.id, ...mates];

  if (mode === 'graph') {
    const mins = article.ministryTags.map((t) => t.name.replace('Ministry of ', '')).join(', ') || 'unscoped';
    const scheme = graphSchemes.find((s) => s.articleId === article.id || s.clusterId === cluster?.id);
    const journo = graphJournalists.find((j) => j.articleId === article.id || j.region === article.region);
    const official = graphOfficials.find((o) => o.articleId === article.id || article.ministryTags.some((t) => t.name === o.ministry));
    const past = pastResponses.find((p) =>
      article.headline.toLowerCase().includes('plfs') || article.headline.toLowerCase().includes('unemploy')
        ? p.id.includes('plfs')
        : p.id.includes('mgnrega') || p.id.includes('flood'),
    );
    return {
      patterns: [],
      citations: cites,
      response:
        `Graph for this story — entities linked to “${article.headline.slice(0, 72)}”.\n\n` +
        `Ministries: ${mins}. Outlet: ${article.source} (${article.mediaType}). Region: ${article.region}.\n\n` +
        (scheme ? `Scheme node: ${scheme.label}. ` : '') +
        (official ? `Official: ${official.label}. ` : '') +
        (journo ? `Journalist: ${journo.label} (${journo.beat}). ` : '') +
        (past ? `\n\nPast response on the graph: ${past.label} — ${past.summary}` : '\n\nNo prior strain match on this slice.') +
        `\n\nThis is the connected memory around the piece, not a generic briefing. Open citations for the coverage nodes [c:${article.id}].`,
    };
  }

  const pack = cluster ? storyChatByCluster[cluster.id] : undefined;
  const hit = pack?.find((r) => r.patterns.some((p) => p.test(q)));
  if (hit) return hit;

  const tree = cluster ? storyTrees[cluster.id] : undefined;
  const treeLines = tree
    ? tree.map((n) => `${n.hour} · ${n.outlet} (${n.language}): ${n.variant}`).join('\n')
    : `${article.source} · ${article.date}: ${article.summary}`;

  return {
    patterns: [],
    citations: cites,
    response:
      `This story only — “${article.headline.slice(0, 80)}” (${article.source}).\n\n` +
      `${article.sentimentReason}\n\n` +
      (cluster ? `Cluster: ${cluster.event}. How the claim mutated:\n${treeLines}\n\n` : '') +
      `Fresh detail on this clip: ${article.summary}\n\n` +
      `Siblings in the same cluster are cited. The rest of the graph is out of scope in this mode [c:${article.id}].`,
  };
}
