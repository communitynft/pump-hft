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
        <div>
          <label>Spread Target (%)</label>
          <input
            type="number"
            value={config.spreadTarget}
            onChange={(e) => setConfig({...config, spreadTarget: parseFloat(e.target.value)})}
            className="ml-2 p-1 border rounded"
          />
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
