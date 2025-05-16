import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

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

export function MarketDataProvider({ children }: { children: React.ReactNode }) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [spread, setSpread] = useState(0);

  const processOrderBook = (data: unknown) => {
    if (!data) return;
    // Implementation placeholder for order book processing
  };

  const connectToMarket = (pair: string) => {
    const websocket = new WebSocket(
      `wss://api.pump.fun/ws?pair=${encodeURIComponent(pair)}`
    );

    websocket.onmessage = (event) => {
      processOrderBook(JSON.parse(event.data));
    };

    setWs(websocket);
  };

  const disconnect = () => {
    ws?.close();
    setWs(null);
    setBids([]);
    setAsks([]);
    setSpread(0);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return (
    <MarketDataContext.Provider value={{ bids, asks, spread, connectToMarket, disconnect }}>
      {children}
    </MarketDataContext.Provider>
  );
}

export const useMarketData = () => useContext(MarketDataContext);
