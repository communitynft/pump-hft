import { useMarketData } from '../../context/MarketDataContext';

export default function OrderBook() {
  const { bids, asks, spread } = useMarketData();

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className="bg-red-50 p-4 rounded">
        <h3 className="text-red-600 font-bold mb-2">Bids</h3>
        <div className="space-y-1">
          {bids.map((bid, i) => (
            <div key={i} className="flex justify-between text-red-700">
              <span>{bid.price.toFixed(4)}</span>
              <span>{bid.size.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded">
        <h3 className="text-green-600 font-bold mb-2">Asks</h3>
        <div className="space-y-1">
          {asks.map((ask, i) => (
            <div key={i} className="flex justify-between text-green-700">
              <span>{ask.price.toFixed(4)}</span>
              <span>{ask.size.toFixed(4)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 text-center py-2 bg-gray-100 rounded">
        Spread: {spread.toFixed(4)}%
      </div>
    </div>
  );
}
