export const WORKSPACE_IDS = ['desk', 'watch', 'coverage', 'intelligence', 'brief'] as const;
export type WorkspaceId = (typeof WORKSPACE_IDS)[number];

export const WORKSPACE_VIEWS = [
  'alerts',
  'misinfo',
  'stories',
  'feed',
  'platform',
  'narratives',
  'regions',
  'penetration',
  'graph',
  'deepfake',
] as const;
export type WorkspaceView = (typeof WORKSPACE_VIEWS)[number];

export const DEFAULT_VIEW: Record<WorkspaceId, WorkspaceView | null> = {
  desk: null,
  watch: 'alerts',
  coverage: 'stories',
  intelligence: 'narratives',
  brief: null,
};

export const workspaces = [
  { id: 'desk' as const, label: 'Desk', icon: 'LayoutDashboard' },
  { id: 'watch' as const, label: 'Watch', icon: 'AlertTriangle' },
  { id: 'coverage' as const, label: 'Coverage', icon: 'Newspaper' },
  { id: 'intelligence' as const, label: 'Intel', icon: 'GitBranch' },
  { id: 'brief' as const, label: 'Brief', icon: 'FileText' },
];

export const workspaceMeta: Record<WorkspaceId, { title: string; subtitle: string }> = {
  desk: { title: 'Duty Desk', subtitle: 'Overview for this shift' },
  watch: { title: 'Watch', subtitle: 'Handle or snooze' },
  coverage: { title: 'Coverage', subtitle: 'What outlets are saying' },
  intelligence: { title: 'Intelligence', subtitle: 'Spread, graph, and authenticity' },
  brief: { title: 'Ministry Briefing', subtitle: 'Daily brief for ministry officers' },
};

export const workspaceTabs: Partial<Record<WorkspaceId, { id: WorkspaceView; label: string }[]>> = {
  watch: [
    { id: 'alerts', label: 'Alerts' },
    { id: 'misinfo', label: 'Misinfo' },
  ],
  coverage: [
    { id: 'stories', label: 'Stories' },
    { id: 'feed', label: 'Feed' },
    { id: 'platform', label: 'By platform' },
  ],
  intelligence: [
    { id: 'narratives', label: 'Narratives' },
    { id: 'regions', label: 'Regions' },
    { id: 'penetration', label: 'Penetration' },
    { id: 'graph', label: 'Graph' },
    { id: 'deepfake', label: 'Deepfake' },
  ],
};

export function isWorkspaceId(v: string | null): v is WorkspaceId {
  return !!v && (WORKSPACE_IDS as readonly string[]).includes(v);
}

export function isWorkspaceView(v: string | null): v is WorkspaceView {
  return !!v && (WORKSPACE_VIEWS as readonly string[]).includes(v);
}

export function parseWorkspaceSearch(search: string): { workspace: WorkspaceId; view: WorkspaceView | null } {
  const q = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const rawWs = q.get('ws');
  const workspace = isWorkspaceId(rawWs) ? rawWs : 'desk';
  const raw = q.get('view');
  const allowed = workspaceTabs[workspace];
  if (allowed && isWorkspaceView(raw) && allowed.some((t) => t.id === raw)) {
    return { workspace, view: raw };
  }
  return { workspace, view: DEFAULT_VIEW[workspace] };
}

export function workspaceSearchString(workspace: WorkspaceId, view: WorkspaceView | null) {
  const q = new URLSearchParams();
  if (workspace !== 'desk') q.set('ws', workspace);
  if (view && DEFAULT_VIEW[workspace] !== null) q.set('view', view);
  const s = q.toString();
  return s ? `?${s}` : '';
}

export function viewLabel(workspace: WorkspaceId, view: WorkspaceView | null) {
  const tabs = workspaceTabs[workspace];
  if (!tabs || !view) return null;
  return tabs.find((t) => t.id === view)?.label ?? null;
}
