'use client';

import { createContext, useContext, useEffect, useMemo, useState, ReactNode, useCallback } from 'react';
import {
  DEFAULT_VIEW,
  parseWorkspaceSearch,
  workspaceSearchString,
  type WorkspaceId,
  type WorkspaceView,
} from '@/data/workspaces';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: 'dark', toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export interface FilterState {
  ministry: string;
  region: string;
  media: string;
}

interface FilterContextValue {
  filters: FilterState;
  setMinistry: (v: string) => void;
  setRegion: (v: string) => void;
  setMedia: (v: string) => void;
  clear: () => void;
  activeCount: number;
}

const defaultFilters: FilterState = { ministry: 'All Ministries', region: 'All Regions', media: 'All Media' };

const FilterContext = createContext<FilterContextValue>({
  filters: defaultFilters,
  setMinistry: () => {},
  setRegion: () => {},
  setMedia: () => {},
  clear: () => {},
  activeCount: 0,
});

export function useFilters() {
  return useContext(FilterContext);
}

interface SidebarContextValue {
  collapsed: boolean;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggleCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
});

export function useSidebar() {
  return useContext(SidebarContext);
}

// -- Density ----------------------------------------------------------------

export type Density = 'compact' | 'comfortable';

interface DensityContextValue {
  density: Density;
  toggle: () => void;
  set: (d: Density) => void;
}

const DensityContext = createContext<DensityContextValue>({
  density: 'comfortable',
  toggle: () => {},
  set: () => {},
});

export function useDensity() {
  return useContext(DensityContext);
}

// -- Ask Sentinel -----------------------------------------------------------

interface AskSentinelContextValue {
  open: boolean;
  openPanel: (presetQuery?: string) => void;
  close: () => void;
  presetQuery: string | null;
  consumePreset: () => void;
}

const AskSentinelContext = createContext<AskSentinelContextValue>({
  open: false,
  openPanel: () => {},
  close: () => {},
  presetQuery: null,
  consumePreset: () => {},
});

export function useAskSentinel() {
  return useContext(AskSentinelContext);
}

// -- Snooze -----------------------------------------------------------------

interface SnoozeContextValue {
  snoozed: Set<string>;
  snooze: (id: string) => void;
  unsnooze: (id: string) => void;
  isSnoozed: (id: string) => boolean;
}

const SnoozeContext = createContext<SnoozeContextValue>({
  snoozed: new Set(),
  snooze: () => {},
  unsnooze: () => {},
  isSnoozed: () => false,
});

export function useSnooze() {
  return useContext(SnoozeContext);
}

function todayKey() {
  const d = new Date();
  return `pib-snooze-${d.getUTCFullYear()}-${d.getUTCMonth() + 1}-${d.getUTCDate()}`;
}

// -- Focus -----------------------------------------------------------------
// Passing a focus request across the tree without hard-coupling components.
// Ask Sentinel citation click sets { articleId }, page.tsx watches it,
// scrolls to the article, opens the article modal, then clears.

interface FocusRequest {
  articleId?: number;
  narrativeId?: number;
  clusterId?: number;
  stay?: boolean;
}

interface FocusContextValue {
  request: FocusRequest | null;
  requestFocus: (r: FocusRequest) => void;
  clear: () => void;
}

const FocusContext = createContext<FocusContextValue>({
  request: null,
  requestFocus: () => {},
  clear: () => {},
});

export function useFocus() {
  return useContext(FocusContext);
}

// -- Workspace --------------------------------------------------------------

interface WorkspaceContextValue {
  workspace: WorkspaceId;
  view: WorkspaceView | null;
  setWorkspace: (ws: WorkspaceId, view?: WorkspaceView) => void;
  setView: (view: WorkspaceView) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue>({
  workspace: 'desk',
  view: null,
  setWorkspace: () => {},
  setView: () => {},
});

export function useWorkspace() {
  return useContext(WorkspaceContext);
}

function writeWorkspaceUrl(workspace: WorkspaceId, view: WorkspaceView | null) {
  if (typeof window === 'undefined') return;
  const next = workspaceSearchString(workspace, view);
  const url = `${window.location.pathname}${next}${window.location.hash}`;
  window.history.replaceState(window.history.state, '', url);
}

// -- Provider --------------------------------------------------------------

export default function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [density, setDensityState] = useState<Density>('comfortable');
  const [askOpen, setAskOpen] = useState(false);
  const [askPreset, setAskPreset] = useState<string | null>(null);
  const [snoozed, setSnoozed] = useState<Set<string>>(new Set());
  const [focusRequest, setFocusRequest] = useState<FocusRequest | null>(null);
  const [workspace, setWorkspaceState] = useState<WorkspaceId>('desk');
  const [view, setViewState] = useState<WorkspaceView | null>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('pib-theme') as Theme | null;
    const initial: Theme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    document.cookie = `pib-theme=${initial};path=/;max-age=31536000;SameSite=Lax`;
    setCollapsed(localStorage.getItem('pib-sidebar-collapsed') === '1');
    localStorage.setItem('pib-density', 'comfortable');
    setDensityState('comfortable');
    try {
      const raw = localStorage.getItem(todayKey());
      if (raw) setSnoozed(new Set(JSON.parse(raw)));
    } catch {}
    const parsed = parseWorkspaceSearch(window.location.search);
    setWorkspaceState(parsed.workspace);
    setViewState(parsed.view);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pib-theme', next);
      document.cookie = `pib-theme=${next};path=/;max-age=31536000;SameSite=Lax`;
      return next;
    });
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('pib-sidebar-collapsed', next ? '1' : '0');
      return next;
    });
  }, []);

  const setMinistry = useCallback((v: string) => setFilters((f) => ({ ...f, ministry: v })), []);
  const setRegion = useCallback((v: string) => setFilters((f) => ({ ...f, region: v })), []);
  const setMedia = useCallback((v: string) => setFilters((f) => ({ ...f, media: v })), []);
  const clear = useCallback(() => setFilters(defaultFilters), []);

  const activeCount =
    (filters.ministry !== defaultFilters.ministry ? 1 : 0) +
    (filters.region !== defaultFilters.region ? 1 : 0) +
    (filters.media !== defaultFilters.media ? 1 : 0);

  const setDensity = useCallback((d: Density) => {
    setDensityState(d);
    localStorage.setItem('pib-density', d);
  }, []);
  const toggleDensity = useCallback(() => {
    setDensityState((prev) => {
      const next: Density = prev === 'compact' ? 'comfortable' : 'compact';
      localStorage.setItem('pib-density', next);
      return next;
    });
  }, []);

  const openAskPanel = useCallback((preset?: string) => {
    setAskPreset(preset ?? null);
    setAskOpen(true);
  }, []);
  const closeAskPanel = useCallback(() => setAskOpen(false), []);
  const consumeAskPreset = useCallback(() => setAskPreset(null), []);

  const persistSnoozed = useCallback((s: Set<string>) => {
    try { localStorage.setItem(todayKey(), JSON.stringify(Array.from(s))); } catch {}
  }, []);
  const snooze = useCallback((id: string) => {
    setSnoozed((prev) => {
      const next = new Set(prev);
      next.add(id);
      persistSnoozed(next);
      return next;
    });
  }, [persistSnoozed]);
  const unsnooze = useCallback((id: string) => {
    setSnoozed((prev) => {
      const next = new Set(prev);
      next.delete(id);
      persistSnoozed(next);
      return next;
    });
  }, [persistSnoozed]);
  const isSnoozed = useCallback((id: string) => snoozed.has(id), [snoozed]);

  const setWorkspace = useCallback((ws: WorkspaceId, nextView?: WorkspaceView) => {
    const resolved = nextView ?? DEFAULT_VIEW[ws];
    setWorkspaceState(ws);
    setViewState(resolved);
    writeWorkspaceUrl(ws, resolved);
  }, []);

  const setView = useCallback((nextView: WorkspaceView) => {
    setViewState(nextView);
    writeWorkspaceUrl(workspace, nextView);
  }, [workspace]);

  const requestFocus = useCallback((r: FocusRequest) => {
    if (!r.stay) {
      if (r.articleId) {
        setWorkspaceState('coverage');
        setViewState('feed');
        writeWorkspaceUrl('coverage', 'feed');
      } else if (r.narrativeId) {
        setWorkspaceState('intelligence');
        setViewState('narratives');
        writeWorkspaceUrl('intelligence', 'narratives');
      }
    }
    setFocusRequest(r);
  }, []);
  const clearFocus = useCallback(() => setFocusRequest(null), []);

  const themeValue = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  const filterValue = useMemo(
    () => ({ filters, setMinistry, setRegion, setMedia, clear, activeCount }),
    [filters, setMinistry, setRegion, setMedia, clear, activeCount],
  );
  const sidebarValue = useMemo(
    () => ({ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }),
    [collapsed, toggleCollapsed, mobileOpen],
  );
  const densityValue = useMemo(
    () => ({ density, toggle: toggleDensity, set: setDensity }),
    [density, toggleDensity, setDensity],
  );
  const askValue = useMemo(
    () => ({ open: askOpen, openPanel: openAskPanel, close: closeAskPanel, presetQuery: askPreset, consumePreset: consumeAskPreset }),
    [askOpen, askPreset, openAskPanel, closeAskPanel, consumeAskPreset],
  );
  const snoozeValue = useMemo(
    () => ({ snoozed, snooze, unsnooze, isSnoozed }),
    [snoozed, snooze, unsnooze, isSnoozed],
  );
  const focusValue = useMemo(
    () => ({ request: focusRequest, requestFocus, clear: clearFocus }),
    [focusRequest, requestFocus, clearFocus],
  );
  const workspaceValue = useMemo(
    () => ({ workspace, view, setWorkspace, setView }),
    [workspace, view, setWorkspace, setView],
  );

  return (
    <ThemeContext.Provider value={themeValue}>
      <FilterContext.Provider value={filterValue}>
        <SidebarContext.Provider value={sidebarValue}>
          <DensityContext.Provider value={densityValue}>
            <AskSentinelContext.Provider value={askValue}>
              <SnoozeContext.Provider value={snoozeValue}>
                <WorkspaceContext.Provider value={workspaceValue}>
                  <FocusContext.Provider value={focusValue}>
                    {children}
                  </FocusContext.Provider>
                </WorkspaceContext.Provider>
              </SnoozeContext.Provider>
            </AskSentinelContext.Provider>
          </DensityContext.Provider>
        </SidebarContext.Provider>
      </FilterContext.Provider>
    </ThemeContext.Provider>
  );
}
