// components/SectorGroup.tsx
import { Stock, SectorSummary } from '../interfaces';
import SectorSummaryComponent from './SectorSummary';
import PortfolioTable from './PortfolioTable';

interface SectorGroupProps {
  sector: string;
  stocks: Stock[];
  summary: SectorSummary;
}

export default function SectorGroup({ sector, stocks, summary }: SectorGroupProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Sector Group: {sector}
      </h2>
      
      {/* Sector Summary */}
      <SectorSummaryComponent summary={summary} />
      
      {/* Portfolio Table */}
      <PortfolioTable stocks={stocks} />
    </div>
  );
}