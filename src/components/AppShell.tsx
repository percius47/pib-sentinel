'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AskSentinel from './AskSentinel';
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
        <div className="pb-28">
          {children}
        </div>
      </div>
      <AskSentinel />
    </>
  );
}
