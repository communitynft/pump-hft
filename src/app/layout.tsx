'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { Inter } from 'next/font/google';

import { MarketDataProvider } from '../context/MarketDataContext';
import { WalletProvider } from '../context/WalletContext';
import LoadingSpinner from '../components/LoadingSpinner';

import '../styles/globals.css';
import './globals.css';

// Initialize font
const inter = Inter({ subsets: ['latin'] });

// Simple error boundary component
class ErrorBoundary extends React.Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
            <p className="mt-2 text-gray-700">Please refresh the page to continue.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
      <body className={`min-h-screen bg-gray-50 ${inter.className}`}>
        <ErrorBoundary>
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
