import { useQuery } from '../../hooks/useQuery';
import { getTopStocks } from '../../services/stockService';
import { formatCurrency, formatPercent, profitLossClass, formatLargeNumber } from '../../utils/formatters';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function TopStocks({ onSelectStock }) {
  const { data: stocks, loading, error, refetch } = useQuery(
    () => getTopStocks(15),
    [],
    { refetchInterval: 10 * 60 * 1000 }, // 10 min
  );

  if (loading) return <LoadingSpinner label="Fetching top stocks…" />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;
  if (!stocks?.length) return <p className="text-muted" style={{ textAlign: 'center' }}>No top stocks available.</p>;

  return (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 'var(--sp-4)',
      }}>
        {stocks.map((stock) => {
          const change = stock.changePercent ?? 0;
          const cls = profitLossClass(change);
          const isPositive = change >= 0;
          return (
            <div
              key={stock.symbol}
              className="card"
              style={{ cursor: 'pointer', transition: 'transform 200ms, border-color 200ms' }}
              onClick={() => onSelectStock?.(stock)}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              role="button"
              tabIndex={0}
              aria-label={`${stock.name} — ${formatCurrency(stock.currentPrice)}`}
              onKeyDown={(e) => e.key === 'Enter' && onSelectStock?.(stock)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{stock.symbol}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }} title={stock.name}>
                    {stock.name?.length > 24 ? stock.name.slice(0, 24) + '…' : stock.name}
                  </div>
                </div>
                <span className={`badge ${isPositive ? 'badge-green' : 'badge-red'}`}>
                  {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {formatPercent(change)}
                </span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>
                {formatCurrency(stock.currentPrice)}
              </div>
              {stock.marketCap && (
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 6 }}>
                  Mkt cap: {formatLargeNumber(stock.marketCap)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
