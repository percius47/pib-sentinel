import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PIB Sentinel — Media Intelligence Platform',
  description: 'AI-Enabled 360° Media Intelligence System for Press Information Bureau, Government of India',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased">
        <Sidebar />
        <main className="ml-64 min-h-screen bg-grid">
          {children}
        </main>
      </body>
    </html>
  );
}
