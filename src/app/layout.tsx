'use client';

import React from 'react';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MarketDataProvider } from '../../context/MarketDataContext';
import { WalletProvider } from '../../context/WalletContext';

import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorFallback from '../../components/ErrorFallback';

// Global CSS imports
import '../../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="HFT Interface for pump.fun using Phantom wallet" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-gray-50">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <WalletProvider>
            <MarketDataProvider>
              {isLoading ? <LoadingSpinner /> : children}
            </MarketDataProvider>
          </WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
