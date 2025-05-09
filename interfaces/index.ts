

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}
  
  export interface SectorSummary {
    sector: string;
    totalInvestment: number;
    currentValue: number;
    gainLoss: number;
    gainLossPercentage: number;
  }