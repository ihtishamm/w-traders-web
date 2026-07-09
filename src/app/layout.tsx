import { Toaster } from '@/components/ui/sonner';
import { fontVariables } from '@/lib/font';
import { cn } from '@/lib/utils';
import QueryProvider from '@/provider/query-provider';
import type { Metadata, Viewport } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import './globals.css';
import './theme.css';

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export const viewport: Viewport = {
  themeColor: '#ffffff'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'bg-background overflow-hidden overscroll-none font-sans antialiased',
          fontVariables
        )}
      >
        <NextTopLoader showSpinner={false} />
        <QueryProvider>
          <NuqsAdapter>
            <Toaster />
            {children}
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
