// components/Header.tsx
import { RefreshCw, PieChart, Loader2 } from 'lucide-react';

interface HeaderProps {
  onRefresh: () => void;
  onToggleCharts: () => void;
  showCharts: boolean;
  loading: boolean;
}

export default function Header({ onRefresh, onToggleCharts, showCharts, loading }: HeaderProps) {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Dynamic Portfolio Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onToggleCharts}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <PieChart className="h-5 w-5 mr-2" />
              {showCharts ? 'Hide Charts' : 'Show Charts'}
            </button>
            <button 
              onClick={onRefresh} 
              disabled={loading}
              className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}