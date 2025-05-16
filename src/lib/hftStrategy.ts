import { OrderBookEntry } from '../context/MarketDataContext';

export class MarketMaker {
  private spreadTarget: number;
  private orderSize: number;
  private riskLimit: number;

  constructor(config: {
    spreadTarget: number;
    orderSize: number;
    riskLimit: number;
  }) {
    this.spreadTarget = config.spreadTarget;
    this.orderSize = config.orderSize;
    this.riskLimit = config.riskLimit;
  }

  calculateQuotes(bids: OrderBookEntry[], asks: OrderBookEntry[]) {
    const bestBid = bids[0]?.price || 0;
    const bestAsk = asks[0]?.price || Infinity;
    
    return {
      bidPrice: bestBid * (1 - this.spreadTarget/2),
      askPrice: bestAsk * (1 + this.spreadTarget/2),
      size: this.orderSize
    };
  }

  shouldAdjustQuotes(currentSpread: number) {
    return Math.abs(currentSpread - this.spreadTarget) > this.spreadTarget * 0.1;
  }
}
