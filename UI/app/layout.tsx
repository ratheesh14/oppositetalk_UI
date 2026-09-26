import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'OppositeTalk | Serious Values-Based Relationship Platform',
  description:
    'A platform for adults seeking long-term relationships, marriage, family building, personal growth, and shared responsibility.',
  keywords: ['marriage', 'serious relationships', 'family goals', 'values-based dating', 'relationship platform'],
  openGraph: {
    title: 'OppositeTalk | Serious Values-Based Relationship Platform',
    description: 'Find partner alignment on marriage, family goals, and financial responsibility.',
    siteName: 'OppositeTalk',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
