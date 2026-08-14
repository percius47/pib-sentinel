'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

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

export default function Providers({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('pib-theme') as Theme | null;
    const initial: Theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    setCollapsed(localStorage.getItem('pib-sidebar-collapsed') === '1');
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pib-theme', next);
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

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <FilterContext.Provider value={{ filters, setMinistry, setRegion, setMedia, clear, activeCount }}>
        <SidebarContext.Provider value={{ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }}>
          {children}
        </SidebarContext.Provider>
      </FilterContext.Provider>
    </ThemeContext.Provider>
  );
}
