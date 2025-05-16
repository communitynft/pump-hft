'use client';

import React, { useState } from 'react';
import ConnectionPanel from '../components/hft/ConnectionPanel';
import OrderBook from '../components/hft/OrderBook';
import StrategyPanel from '../components/hft/StrategyPanel';

export default function Home() {
  const [selectedPair, setSelectedPair] = useState('SOL/USDC');

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Pump.fun HFT Interface</h1>
      <div className="mb-6">
        <select
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="SOL/USDC">SOL/USDC</option>
          <option value="BTC/USDC">BTC/USDC</option>
        </select>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ConnectionPanel />
          <StrategyPanel />
        </div>
        <div className="lg:col-span-2">
          <OrderBook />
        </div>
      </div>
    </main>
  );
}
