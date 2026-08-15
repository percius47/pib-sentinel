'use client';

import { memo, useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  applyNodeChanges,
  type Edge,
  type Node,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFilters, useFocus } from './Providers';
import {
  GRAPH_KIND_COLOR,
  buildKnowledgeGraph,
  layoutKnowledgeGraph,
  type GraphEntity,
  type GraphNodeKind,
} from '@/data/knowledgeGraph';

const KINDS: GraphNodeKind[] = ['Ministry', 'Region', 'Outlet', 'Article', 'Narrative', 'Cluster', 'Claim'];

function EntityNode({ data, selected }: NodeProps) {
  const entity = data as unknown as GraphEntity;
  const color = GRAPH_KIND_COLOR[entity.kind];
  return (
    <div
      className={`px-2.5 py-1.5 rounded-lg border min-w-[92px] max-w-[160px] ${
        selected ? 'ring-2 ring-offset-1 ring-offset-transparent' : ''
      }`}
      style={{
        background: 'var(--bg-card)',
        borderColor: selected ? color : 'var(--border-strong)',
        boxShadow: selected ? `0 0 0 1px ${color}` : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} className="!w-1.5 !h-1.5 !bg-text-muted !border-0" />
      <p className="text-[8px] uppercase tracking-wider font-semibold" style={{ color }}>{entity.kind}</p>
      <p className="text-[11px] text-text-primary leading-snug line-clamp-2 mt-0.5">{entity.label}</p>
      <Handle type="source" position={Position.Bottom} className="!w-1.5 !h-1.5 !bg-text-muted !border-0" />
    </div>
  );
}

const nodeTypes = { entity: memo(EntityNode) };

function GraphCanvas() {
  const { filters } = useFilters();
  const { requestFocus } = useFocus();
  const [enabled, setEnabled] = useState<Set<GraphNodeKind>>(() => new Set(KINDS));
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<GraphEntity | null>(null);

  const graph = useMemo(
    () => buildKnowledgeGraph(filters),
    [filters.ministry, filters.region, filters.media],
  );

  const { nodes, edges, byId } = useMemo(() => {
    const positions = layoutKnowledgeGraph(graph);
    const q = query.trim().toLowerCase();
    const vis = graph.nodes.filter((n) => enabled.has(n.kind));
    const visIds = new Set(vis.map((n) => n.id));
    const rfNodes: Node[] = vis.map((n) => {
      const p = positions.get(n.id) ?? { x: 0, y: 0 };
      const match = !q || n.label.toLowerCase().includes(q) || n.kind.toLowerCase().includes(q);
      return {
        id: n.id,
        type: 'entity',
        position: p,
        data: n,
        style: { opacity: match ? 1 : 0.22 },
      };
    });
    const rfEdges: Edge[] = graph.links
      .filter((l) => visIds.has(l.source) && visIds.has(l.target))
      .map((l) => ({
        id: l.id,
        source: l.source,
        target: l.target,
        style: { stroke: 'var(--border-strong)', strokeWidth: 1.2 },
      }));
    const map = new Map(graph.nodes.map((n) => [n.id, n]));
    return { nodes: rfNodes, edges: rfEdges, byId: map };
  }, [graph, enabled, query]);

  const [flowNodes, setFlowNodes] = useState(nodes);
  const [flowEdges, setFlowEdges] = useState(edges);

  useEffect(() => {
    setFlowNodes(nodes);
    setFlowEdges(edges);
    setSelected(null);
  }, [nodes, edges]);

  const neighbors = useMemo(() => {
    if (!selected) return [];
    return graph.links
      .filter((l) => l.source === selected.id || l.target === selected.id)
      .map((l) => byId.get(l.source === selected.id ? l.target : l.source))
      .filter((n): n is GraphEntity => Boolean(n));
  }, [selected, graph.links, byId]);

  function toggleKind(k: GraphNodeKind) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      if (next.size === 0) next.add(k);
      return next;
    });
  }

  function openEntity(n: GraphEntity) {
    if (n.articleId) requestFocus({ articleId: n.articleId, stay: true });
    else if (n.narrativeId) requestFocus({ narrativeId: n.narrativeId, stay: true });
    else if (n.clusterId) requestFocus({ clusterId: n.clusterId, stay: true });
  }

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  const inspector = (
    <InspectorBody
      selected={selected}
      neighbors={neighbors}
      onSelect={setSelected}
      onOpen={openEntity}
    />
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px] gap-3">
      <div className="relative">
      <div className="glass-card overflow-hidden">
        <div className="px-3 py-2.5 border-b border-border-subtle flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search entities…"
            className="text-xs bg-bg-surface border border-border-subtle rounded-lg px-3 py-1.5 text-text-primary w-full sm:w-56 focus:outline-none focus:border-border-strong"
          />
          <div className="flex flex-wrap gap-1.5">
            {KINDS.map((k) => {
              const on = enabled.has(k);
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => toggleKind(k)}
                  className="text-[10px] px-2 py-0.5 rounded-full border"
                  style={{
                    borderColor: on ? GRAPH_KIND_COLOR[k] : 'var(--border-subtle)',
                    color: on ? GRAPH_KIND_COLOR[k] : 'var(--text-muted)',
                    opacity: on ? 1 : 0.45,
                  }}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-[420px] md:h-[560px] bg-bg-surface">
          <ReactFlow
            nodes={flowNodes}
            edges={flowEdges}
            onNodesChange={(changes) => {
              setFlowNodes((nds) => applyNodeChanges(changes, nds));
            }}
            onNodeClick={(_, node) => setSelected(node.data as unknown as GraphEntity)}
            onPaneClick={() => setSelected(null)}
            nodeTypes={nodeTypes}
            nodesConnectable={false}
            edgesReconnectable={false}
            fitView
            minZoom={0.25}
            maxZoom={1.6}
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={22} size={1} color="var(--border-subtle)" />
            <Controls showInteractive={false} />
            <MiniMap
              pannable
              zoomable
              maskColor="rgba(0,0,0,0.45)"
              nodeColor={(n) => GRAPH_KIND_COLOR[(n.data as unknown as GraphEntity).kind]}
            />
          </ReactFlow>
        </div>
        <p className="px-3 py-2 text-[10px] text-text-muted border-t border-border-subtle">
          Drag nodes · scroll to zoom · tap a node for details · {graph.nodes.length} entities · {graph.links.length} links
        </p>
      </div>

      {selected && (
        <div className="xl:hidden absolute inset-0 z-20 flex flex-col justify-end pointer-events-none">
          <button
            type="button"
            className="flex-1 bg-black/40 pointer-events-auto"
            aria-label="Dismiss node details"
            onClick={() => setSelected(null)}
          />
          <aside
            className="relative pointer-events-auto mx-2 mb-2 max-h-[46%] overflow-y-auto glass-card p-4 pt-3 animate-slide-in"
            role="dialog"
            aria-modal="true"
            aria-label="Node details"
          >
            <div className="flex justify-center mb-3" aria-hidden>
              <div className="w-8 h-1 rounded-full bg-border-strong" />
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-strong bg-bg-card"
              aria-label="Close node details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            {inspector}
          </aside>
        </div>
      )}
      </div>

      <aside className="hidden xl:block glass-card p-4 min-h-[220px]">
        {inspector}
      </aside>
    </div>
  );
}

function InspectorBody({
  selected,
  neighbors,
  onSelect,
  onOpen,
}: {
  selected: GraphEntity | null;
  neighbors: GraphEntity[];
  onSelect: (n: GraphEntity) => void;
  onOpen: (n: GraphEntity) => void;
}) {
  if (!selected) {
    return (
      <p className="text-sm text-text-muted leading-relaxed">
        Click a node to inspect ministries, regions, outlets, articles, narratives, clusters, and claims. Drag freely — layout is a starting map, not a lock.
      </p>
    );
  }
  return (
    <div>
      <span
        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
        style={{ background: `${GRAPH_KIND_COLOR[selected.kind]}22`, color: GRAPH_KIND_COLOR[selected.kind] }}
      >
        {selected.kind}
      </span>
      <h3 className="text-sm font-semibold text-text-primary mt-2 leading-snug pr-8">
        {selected.label}
      </h3>
      {selected.subtitle && <p className="text-[11px] text-text-muted mt-1">{selected.subtitle}</p>}
      {(selected.articleId || selected.narrativeId || selected.clusterId) && (
        <button
          type="button"
          onClick={() => onOpen(selected)}
          className="mt-3 text-xs px-3 py-1.5 rounded-lg border border-border-strong text-text-primary hover:bg-bg-card-hover"
        >
          Open record
        </button>
      )}
      <h4 className="text-[10px] uppercase tracking-wider text-text-muted mt-4 mb-2">Connected</h4>
      <div className="space-y-1.5 max-h-40 xl:max-h-64 overflow-y-auto no-scrollbar">
        {neighbors.length === 0 && <p className="text-xs text-text-muted">No neighbours in this slice.</p>}
        {neighbors.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(n)}
            className="w-full text-left text-xs px-2 py-1.5 rounded-md border border-border-subtle hover:border-border-strong"
          >
            <span className="text-[9px] uppercase tracking-wider" style={{ color: GRAPH_KIND_COLOR[n.kind] }}>{n.kind}</span>
            <span className="block text-text-primary leading-snug">{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function KnowledgeGraph() {
  return (
    <ReactFlowProvider>
      <GraphCanvas />
    </ReactFlowProvider>
  );
}
