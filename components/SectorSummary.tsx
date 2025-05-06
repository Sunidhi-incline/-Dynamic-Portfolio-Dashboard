// components/SectorSummary.tsx
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { SectorSummary as SectorSummaryType } from '../interfaces';
import { formatCurrency } from '../utils/formatters';

interface SectorSummaryProps {
  summary: SectorSummaryType;
}

export default function SectorSummary({ summary }: SectorSummaryProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Investment</p>
          <p className="text-md font-bold">{formatCurrency(summary.totalInvestment)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Value</p>
          <p className="text-md font-bold">{formatCurrency(summary.currentValue)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gain/Loss</p>
          <div className="flex items-center">
            {summary.gainLoss > 0 ? (
              <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={`text-md font-bold ${summary.gainLoss > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatCurrency(Math.abs(summary.gainLoss))}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Gain/Loss %</p>
          <div className="flex items-center">
            {summary.gainLossPercentage > 0 ? (
              <ArrowUpCircle className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ArrowDownCircle className="h-4 w-4 text-red-500 mr-1" />
            )}
            <p className={`text-md font-bold ${summary.gainLossPercentage > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {summary.gainLossPercentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}