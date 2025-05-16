import { useState } from 'react';
import { MarketMaker } from '../../lib/hftStrategy';

export default function StrategyPanel() {
  const [strategy, setStrategy] = useState<MarketMaker | null>(null);
  const [config, setConfig] = useState({
    spreadTarget: 0.1,
    orderSize: 0.1,
    riskLimit: 1000
  });

  const startStrategy = () => {
    setStrategy(new MarketMaker(config));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Market Making Strategy</h3>
      <div className="space-y-4">
        <div className="mb-4">
          <label htmlFor="spreadTarget" className="block text-sm font-medium text-gray-700 mb-1">
            Spread Target (%)
          </label>
          <input
            id="spreadTarget"
            type="number"
            value={config.spreadTarget}
            onChange={(e) => setConfig({...config, spreadTarget: parseFloat(e.target.value)})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-describedby="spreadTargetHelp"
          />
          <p id="spreadTargetHelp" className="mt-1 text-sm text-gray-500">
            Target spread between buy and sell orders
          </p>
        </div>
        <button
          onClick={startStrategy}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {strategy ? 'Update Strategy' : 'Start Strategy'}
        </button>
      </div>
    </div>
  );
}
