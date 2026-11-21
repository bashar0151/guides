import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { SeasonalThemeProvider } from '@/components/SeasonalTheme';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bashar.wiki'),
  title: { default: 'Bashar Wiki', template: '%s | Bashar Wiki' },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <SeasonalThemeProvider>{children}</SeasonalThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}