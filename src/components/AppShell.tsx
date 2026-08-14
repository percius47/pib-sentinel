'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import FilterFab from './FilterFab';
import { useSidebar } from './Providers';

export default function AppShell({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar />
      <div
        className={`min-h-screen bg-grid transition-[margin] duration-200 ml-0 ${
          collapsed ? 'md:ml-16' : 'md:ml-60'
        }`}
      >
        <Header />
        <div className="pb-24 lg:pb-0">
          {children}
        </div>
        <FilterFab />
      </div>
    </>
  );
}
