// interfaces/index.ts
export interface Stock {
    id: string;
    name: string;
    ticker: string;
    sector: string;
    quantity: number;
    purchasePrice: number;
    currentPrice: number;
    peRatio: number;
  }
  
  export interface SectorSummary {
    sector: string;
    totalInvestment: number;
    currentValue: number;
    gainLoss: number;
    gainLossPercentage: number;
  }