'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSidebar } from './Providers';

export default function AppShell({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();
  const marginClass = collapsed ? 'md:ml-16' : 'md:ml-60';

  return (
    <>
      <Sidebar />
      <div className={`${marginClass} min-h-screen transition-all duration-200`}>
        <Header />
        <main className="bg-grid min-h-[calc(100vh-60px)]">{children}</main>
      </div>
    </>
  );
}
