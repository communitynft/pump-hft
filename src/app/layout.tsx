'use client';

import React from 'react';
import { ReactNode } from 'react';
import { WalletProvider } from '../context/WalletContext';
import { MarketDataProvider } from '../context/MarketDataContext';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <MarketDataProvider>
            {children}
          </MarketDataProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
