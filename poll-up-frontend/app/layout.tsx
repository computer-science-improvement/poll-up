import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Nav from '@/components/nav';
import { Providers } from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Poll up',
  description: 'Poll up application',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
