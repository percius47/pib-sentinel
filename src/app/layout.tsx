import type { Metadata } from 'next';
import { cookies } from 'next/headers';
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
  title: 'Prahari',
  description: 'Narrative command for Press Information Bureau, Government of India',
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const stored = (await cookies()).get('pib-theme')?.value;
  const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';

  return (
    <html
      lang="en"
      data-theme={theme}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-primary text-text-primary antialiased" suppressHydrationWarning>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
