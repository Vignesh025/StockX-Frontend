import { formatCurrency, formatPercent, profitLossClass } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function PortfolioTable({ holdings, onSell }) {
  if (!holdings?.length) return null;

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Shares</th>
            <th>Avg Cost</th>
            <th>Cur. Price</th>
            <th>Market Value</th>
            <th>P/L</th>
            <th>P/L %</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => {
            const cls = profitLossClass(h.profitLoss);
            return (
              <tr key={h.symbol}>
                <td>
                  <div style={{ fontWeight: 700 }}>{h.symbol}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.name}</div>
                </td>
                <td>{h.quantity}</td>
                <td>{formatCurrency(h.avgCostBasis)}</td>
                <td>{formatCurrency(h.currentPrice)}</td>
                <td style={{ fontWeight: 600 }}>{formatCurrency(h.currentValue)}</td>
                <td className={`text-${cls}`} style={{ fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {cls === 'positive' ? <TrendingUp size={13} /> : cls === 'negative' ? <TrendingDown size={13} /> : <Minus size={13} />}
                    {formatCurrency(Math.abs(h.profitLoss))}
                    {h.profitLoss < 0 && ' loss'}
                  </span>
                </td>
                <td className={`text-${cls}`}>{formatPercent(h.profitLossPercent ?? 0)}</td>
                <td>
                  <button
                    id={`table-sell-btn-${h.symbol}`}
                    className="btn btn-danger btn-sm"
                    onClick={() => onSell?.(h)}
                  >
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
