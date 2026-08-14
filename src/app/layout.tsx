import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/components/Providers';
import AppShell from '@/components/AppShell';
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
  title: 'PIB Sentinel',
  description: 'Media intelligence for Press Information Bureau, Government of India',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-theme="dark" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('pib-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);else document.documentElement.setAttribute('data-theme','dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
