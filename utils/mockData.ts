// utils/mockData.ts
import { Stock } from '../interfaces';

export const mockStocks: Stock[] = [
  { id: '1', name: 'Apple Inc.', ticker: 'AAPL', sector: 'Technology', quantity: 10, purchasePrice: 150.00, currentPrice: 182.50, peRatio: 28.5 },
  { id: '2', name: 'Microsoft', ticker: 'MSFT', sector: 'Technology', quantity: 5, purchasePrice: 220.00, currentPrice: 289.75, peRatio: 32.1 },
  { id: '3', name: 'Google', ticker: 'GOOGL', sector: 'Technology', quantity: 3, purchasePrice: 2100.00, currentPrice: 2350.00, peRatio: 25.8 },
  { id: '4', name: 'JPMorgan Chase', ticker: 'JPM', sector: 'Financials', quantity: 8, purchasePrice: 120.00, currentPrice: 135.50, peRatio: 12.3 },
  { id: '5', name: 'Bank of America', ticker: 'BAC', sector: 'Financials', quantity: 20, purchasePrice: 32.00, currentPrice: 29.75, peRatio: 10.8 },
  { id: '6', name: 'Walmart', ticker: 'WMT', sector: 'Retail', quantity: 12, purchasePrice: 145.00, currentPrice: 158.20, peRatio: 22.4 },
  { id: '7', name: 'Amazon', ticker: 'AMZN', sector: 'Retail', quantity: 4, purchasePrice: 3100.00, currentPrice: 3475.00, peRatio: 58.7 },
  { id: '8', name: 'Johnson & Johnson', ticker: 'JNJ', sector: 'Healthcare', quantity: 7, purchasePrice: 160.00, currentPrice: 155.30, peRatio: 19.2 },
  { id: '9', name: 'Pfizer', ticker: 'PFE', sector: 'Healthcare', quantity: 15, purchasePrice: 45.00, currentPrice: 38.75, peRatio: 12.5 },
];

export const sectorColors = {
  'Technology': '#3b82f6',
  'Financials': '#10b981',
  'Retail': '#f59e0b',
  'Healthcare': '#6366f1',
};