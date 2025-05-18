import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type OrderBookEntry = {
  price: number;
  size: number;
  total: number;
};

type MarketDataContextType = {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  spread: number;
  connectToMarket: (pair: string) => void;
  disconnect: () => void;
};

const MarketDataContext = createContext<MarketDataContextType>({
  bids: [],
  asks: [],
  spread: 0,
  connectToMarket: () => {},
  disconnect: () => {}
});

type OrderBookData = {
  bids?: Array<[string, string]>;
  asks?: Array<[string, string]>;
};

export function MarketDataProvider({ children }: { children: React.ReactNode }) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [spread, setSpread] = useState(0);

  const processOrderBook = useCallback((orderBookData: OrderBookData) => {
    if (!orderBookData) return;

    const processEntries = (entries: Array<[string, string]> = []): OrderBookEntry[] => {
      let total = 0;
      return entries
        .map(([price, size]) => ({
          price: parseFloat(price),
          size: parseFloat(size),
          total: 0
        }))
        .sort((a, b) => b.price - a.price)
        .map(entry => {
          total += entry.size;
          return { ...entry, total };
        });
    };

    const newBids = processEntries(orderBookData.bids);
    const newAsks = processEntries(orderBookData.asks);

    setBids(newBids);
    setAsks(newAsks);

    // Calculate spread if we have both bids and asks
    if (newBids.length > 0 && newAsks.length > 0) {
      const bestBid = newBids[0]?.price || 0;
      const bestAsk = newAsks[0]?.price || 0;
      setSpread(bestAsk - bestBid);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (ws) {
      ws.close();
      setWs(null);
      setBids([]);
      setAsks([]);
      setSpread(0);
    }
  }, [ws]);

  const connectToMarket = useCallback((pair: string) => {
    try {
      disconnect(); // Close any existing connection
      
      const websocket = new WebSocket(
        `wss://api.pump.fun/ws?pair=${encodeURIComponent(pair)}`
      );

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          processOrderBook(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        disconnect();
      };

      setWs(websocket);
    } catch (error) {
      console.error('Error connecting to market:', error);
    }
  }, [disconnect, processOrderBook]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <MarketDataContext.Provider 
      value={{ 
        bids, 
        asks, 
        spread, 
        connectToMarket, 
        disconnect 
      }}
    >
      {children}
    </MarketDataContext.Provider>
  );
}

export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
};
