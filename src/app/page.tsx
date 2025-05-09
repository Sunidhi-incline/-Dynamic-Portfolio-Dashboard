'use client';

import { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Stock, SectorSummary } from '../../interfaces';
import { mockStocks, sectorColors } from '../../utils/mockData';
import { formatCurrency } from '../../utils/formatters';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import ErrorBanner from '../../components/ErrorBanner';
import SectorGroup from '../../components/SectorGroup';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export default function PortfolioDashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sectorSummaries, setSectorSummaries] = useState<SectorSummary[]>([]);
  const [showCharts, setShowCharts] = useState<boolean>(false);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStocks(mockStocks);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch portfolio data. Please try again.');
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  useEffect(() => {
    if (stocks.length > 0) {
      const sectors = [...new Set(stocks.map(stock => stock.sector))];
      const summaries = sectors.map(sector => {
        const sectorStocks = stocks.filter(stock => stock.sector === sector);
        const totalInvestment = sectorStocks.reduce((sum, stock) => sum + (stock.purchasePrice * stock.quantity), 0);
        const currentValue = sectorStocks.reduce((sum, stock) => sum + (stock.currentPrice * stock.quantity), 0);
        const gainLoss = currentValue - totalInvestment;
        const gainLossPercentage = (gainLoss / totalInvestment) * 100;

        return {
          sector,
          totalInvestment,
          currentValue,
          gainLoss,
          gainLossPercentage
        };
      });
      setSectorSummaries(summaries);
    }
  }, [stocks]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedStocks = stocks.map(stock => ({
        ...stock,
        currentPrice: stock.currentPrice * (0.95 + Math.random() * 0.1)
      }));
      setStocks(updatedStocks);
      setLoading(false);
    }, 1000);
  };

  const totalInvestment = stocks.reduce((sum, stock) => sum + (stock.purchasePrice * stock.quantity), 0);
  const currentValue = stocks.reduce((sum, stock) => sum + (stock.currentPrice * stock.quantity), 0);
  const overallGainLoss = currentValue - totalInvestment;
  const overallGainLossPercentage = totalInvestment === 0 ? 0 : (overallGainLoss / totalInvestment) * 100;

  const pieChartData = sectorSummaries.map(summary => ({
    name: summary.sector,
    value: summary.currentValue
  }));

  if (loading && stocks.length === 0) {
    return <Loader />;
  }

  // ✅ Move this here to recalculate with each render
  const sectors = [...new Set(stocks.map(stock => stock.sector))];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header 
        onRefresh={handleRefresh} 
        onToggleCharts={() => setShowCharts(!showCharts)}
        showCharts={showCharts}
        loading={loading}
      />

      {error && <ErrorBanner message={error} />}

      {/* Overall Stats */}
      <div className="my-4 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-bold mb-2">Portfolio Summary</h2>
        <p>Total Investment: {formatCurrency(totalInvestment)}</p>
        <p>Current Value: {formatCurrency(currentValue)}</p>
        <p className={overallGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
          Overall {overallGainLoss >= 0 ? 'Gain' : 'Loss'}: {formatCurrency(overallGainLoss)} ({overallGainLossPercentage.toFixed(2)}%)
        </p>
      </div>

      {/* Charts */}
      {showCharts && (
        <div className="my-4 bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={sectorColors[entry.name as keyof typeof sectorColors] || '#8884d8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Sector Groups */}
      {sectors.map(sector => {
        const sectorStocks = stocks.filter(stock => stock.sector === sector);
        const sectorSummary = sectorSummaries.find(summary => summary.sector === sector);

        return (
          <div key={sector} className="my-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold">{sector}</h3>
            {sectorSummary && (
              <div className="mb-2">
                <p>Total Investment: {formatCurrency(sectorSummary.totalInvestment)}</p>
                <p>Current Value: {formatCurrency(sectorSummary.currentValue)}</p>
                <p className={sectorSummary.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {sectorSummary.gainLoss >= 0 ? 'Gain' : 'Loss'}: {formatCurrency(sectorSummary.gainLoss)} ({sectorSummary.gainLossPercentage.toFixed(2)}%)
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sectorStocks.map(stock => (
                <div key={stock.symbol} className="p-3 border rounded bg-gray-100">
                  <h4 className="font-medium">{stock.name} ({stock.symbol})</h4>
                  <p>Quantity: {stock.quantity}</p>
                  <p>Buy Price: {formatCurrency(stock.purchasePrice)}</p>
                  <p>Current Price: {formatCurrency(stock.currentPrice)}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
