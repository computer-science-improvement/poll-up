import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Nav from '@/components/nav';
import Footer from '@/components/footer';
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
    <html lang='en' className='light'>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Nav />
          <main className='min-h-[calc(100vh-186px)]'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
