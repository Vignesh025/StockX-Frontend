import { formatCurrency, formatPercent, profitLossClass } from '../../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PortfolioSummary({ totalValue, totalCost, totalProfitLoss }) {
  const pct = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;
  const cls = profitLossClass(totalProfitLoss);

  return (
    <div className="stat-grid" style={{ marginBottom: 'var(--sp-6)' }}>
      <div className="stat-card">
        <div className="stat-label">Portfolio Value</div>
        <div className="stat-value">{formatCurrency(totalValue)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Total Cost</div>
        <div className="stat-value">{formatCurrency(totalCost)}</div>
      </div>
      <div className="stat-card" style={{ border: `1px solid ${totalProfitLoss >= 0 ? 'var(--green)' : 'var(--red)'}` }}>
        <div className="stat-label">Total P/L</div>
        <div className={`stat-value text-${cls}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {totalProfitLoss >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          {formatCurrency(Math.abs(totalProfitLoss))}
        </div>
        <div className={`stat-change text-${cls}`}>{formatPercent(pct)}</div>
      </div>
    </div>
  );
}
