import { formatCurrency, formatPercent, profitLossClass } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function HoldingCard({ holding, onSell }) {
  const cls = profitLossClass(holding.profitLoss);
  const pct = holding.profitLossPercent ?? 0;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
          <div style={{
            width: 44, height: 44, background: 'var(--brand-dim)', border: '1px solid var(--brand-border)',
            borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, color: 'var(--brand-hover)', fontSize: '0.8rem', flexShrink: 0,
          }}>
            {holding.symbol.slice(0, 2)}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{holding.symbol}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{holding.name}</div>
          </div>
        </div>
        <span className={`badge ${cls === 'positive' ? 'badge-green' : cls === 'negative' ? 'badge-red' : 'badge-muted'}`}>
          {cls === 'positive' ? <TrendingUp size={11} /> : cls === 'negative' ? <TrendingDown size={11} /> : <Minus size={11} />}
          {formatPercent(pct)}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Shares</div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>{holding.quantity}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg cost</div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>{formatCurrency(holding.avgCostBasis)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Current price</div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>{formatCurrency(holding.currentPrice)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Market value</div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>{formatCurrency(holding.currentValue)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Profit / Loss</div>
          <div className={`text-${cls}`} style={{ fontWeight: 700 }}>{formatCurrency(holding.profitLoss)}</div>
        </div>
        <button
          id={`sell-btn-${holding.symbol}`}
          className="btn btn-danger btn-sm"
          onClick={() => onSell?.(holding)}
        >
          Sell
        </button>
      </div>
    </div>
  );
}
