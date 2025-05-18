'use client';

// External imports
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import React, { useEffect, useState } from 'react';
// Component imports
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingSpinner from '../components/LoadingSpinner';
// Context imports
import { MarketDataProvider } from '../context/MarketDataContext';
import { WalletProvider } from '../context/WalletContext';
// Style imports
import '../styles/globals.css';
import './globals.css';

// Initialize font
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <body className={`${inter.className} bg-gray-50`}>
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner size="lg" />
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <ErrorBoundary>
          <WalletProvider>
            <MarketDataProvider>
              <div className="flex-1">
                {children}
                <Analytics />
              </div>
              <footer className="py-4 text-center text-sm text-gray-500 bg-white border-t">
                <div className="container mx-auto px-4">
                  <p>Pump.fun HFT Interface - {new Date().getFullYear()}</p>
                  <p className="text-xs mt-1 text-gray-400">High-frequency trading on Solana</p>
                </div>
              </footer>
            </MarketDataProvider>
          </WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
