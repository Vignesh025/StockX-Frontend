import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercent, profitLossClass } from '../../utils/formatters';

/**
 * @param {{ stock: object, onClick: Function }} props
 */
export default function StockCard({ stock, onClick }) {
  const change = stock.changePercent ?? 0;
  const isPositive = change >= 0;

  return (
    <div
      className="card"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
      aria-label={`${stock.name} stock card`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: 'var(--text)' }}>{stock.symbol}</span>
        {stock.exchange && (
          <span className="badge badge-muted">{stock.exchange}</span>
        )}
      </div>
      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 12, minHeight: 20 }}>
        {stock.name}
      </div>
      {stock.currentPrice != null && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{formatCurrency(stock.currentPrice)}</span>
          <span className={`text-${profitLossClass(change)}`} style={{ fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatPercent(change)}
          </span>
        </div>
      )}
    </div>
  );
}
