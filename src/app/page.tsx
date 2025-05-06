'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
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
    // Simulate API call
    const fetchStocks = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
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
      // Calculate sector summaries
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
    // Simulate refresh
    setTimeout(() => {
      // Apply some random changes to stock prices
      const updatedStocks = stocks.map(stock => ({
        ...stock,
        currentPrice: stock.currentPrice * (0.95 + Math.random() * 0.1)
      }));
      setStocks(updatedStocks);
      setLoading(false);
    }, 1000);
  };

  // Get all unique sectors
  const sectors = [...new Set(stocks.map(stock => stock.sector))];

  // Calculate overall portfolio value
  const totalInvestment = stocks.reduce((sum, stock) => sum + (stock.purchasePrice * stock.quantity), 0);
  const currentValue = stocks.reduce((sum, stock) => sum + (stock.currentPrice * stock.quantity), 0);
  const overallGainLoss = currentValue - totalInvestment;
  const overallGainLossPercentage = (overallGainLoss / totalInvestment) * 100;

  // Prepare data for pie chart
  const pieChartData = sectorSummaries.map(summary => ({
    name: summary.sector,
    value: summary.currentValue
  }));

  if (loading && stocks.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <Header 
        onRefresh={handleRefresh} 
        onToggleCharts={() => setShowCharts(!showCharts)}
        showCharts={showCharts}
        loading={loading}
      />

      {/* Error Banner */}
      {error && <ErrorBanner message={error} />}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overall Portfolio Summary */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Overall Portfolio Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Total Investment</p>
              <p className="text-xl font-bold">{formatCurrency(totalInvestment)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Current Value</p>
              <p className="text-xl font-bold">{formatCurrency(currentValue)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Gain/Loss</p>
              <div className="flex items-center">
                {overallGainLoss > 0 ? (
                  <ArrowUpCircle className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <p className={`text-xl font-bold ${overallGainLoss > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatCurrency(Math.abs(overallGainLoss))}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Gain/Loss %</p>
              <div className="flex items-center">
                {overallGainLossPercentage > 0 ? (
                  <ArrowUpCircle className="h-5 w-5 text-green-500 mr-1" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-red-500 mr-1" />
                )}
                <p className={`text-xl font-bold ${overallGainLossPercentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {overallGainLossPercentage.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {showCharts && (
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Portfolio Visualization</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sector Distribution Pie Chart */}
              <div className="h-64">
                <h3 className="text-md font-medium text-gray-700 mb-2">Sector Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={sectorColors[entry.name as keyof typeof sectorColors] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              {/* Gain/Loss by Sector Bar Chart */}
              <div className="h-64">
                <h3 className="text-md font-medium text-gray-700 mb-2">Gain/Loss by Sector</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={sectorSummaries}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Line type="monotone" dataKey="currentValue" name="Current Value" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="totalInvestment" name="Investment" stroke="#6b7280" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Sector Groups */}
        {sectors.map(sector => {
          const sectorStocks = stocks.filter(stock => stock.sector === sector);
          const sectorSummary = sectorSummaries.find(summary => summary.sector === sector);
          
          if (!sectorSummary) return null;
          
          return (
            <SectorGroup 
              key={sector}
              sector={sector}
              stocks={sectorStocks}
              summary={sectorSummary}
            />
          );
        })}
      </div>
    </div>
  );
}