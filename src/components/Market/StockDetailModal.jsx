import { useEffect, useState } from 'react';
import { X, ExternalLink, RefreshCw } from 'lucide-react';
import { getStockDetails } from '../../services/stockService';
import { formatCurrency, formatDate, formatPercent, profitLossClass } from '../../utils/formatters';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import BuyStockForm from './BuyStockForm';

export default function StockDetailModal({ stockBase, onClose }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showBuy, setShowBuy] = useState(false);

  async function fetchDetail(symbol) {
    setLoading(true);
    setError('');
    try {
      const data = await getStockDetails(symbol);
      setDetail(data);
    } catch (err) {
      setError(err?.response?.data?.message ?? 'Failed to load stock details.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (stockBase?.symbol) {
      fetchDetail(stockBase.symbol);
    }
  }, [stockBase?.symbol]);

  // Escape key
  useEffect(() => {
    function handler(e) { if (e.key === 'Escape') onClose?.(); }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const stock = detail ?? stockBase;
  const change = stock?.changePercent ?? 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-5)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, background: 'var(--brand-dim)', border: '1px solid var(--brand-border)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--brand-hover)', fontSize: '0.9rem' }}>
                {stock?.symbol?.slice(0, 2)}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{stock?.symbol}</h2>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{stock?.name}</div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {loading && <LoadingSpinner label="Fetching live price…" />}
        {!loading && error && <ErrorAlert message={error} onRetry={() => fetchDetail(stockBase?.symbol)} />}

        {!loading && !error && detail && !showBuy && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            {/* Price section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: 'clamp(14px, 3vw, 20px)', background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
              <div>
                <div style={{ color: 'var(--text-subtle)', fontSize: '0.75rem', marginBottom: 4 }}>CURRENT PRICE</div>
                <div style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800, color: 'var(--text)' }}>
                  {formatCurrency(detail.currentPrice)}
                </div>
                {change !== 0 && (
                  <div className={`text-${profitLossClass(change)}`} style={{ fontSize: '0.875rem', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {formatPercent(change)} today
                  </div>
                )}
              </div>
              <button
                onClick={() => fetchDetail(detail.symbol)}
                style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}
              >
                <RefreshCw size={14} />
                Refresh
              </button>
            </div>

            {/* Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              {detail.exchange && (
                <div style={{ padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Exchange</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{detail.exchange}</div>
                </div>
              )}
              <div style={{ padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Last updated</div>
                <div style={{ fontWeight: 600, marginTop: 4, fontSize: '0.8125rem' }}>{formatDate(detail.lastUpdated)}</div>
              </div>
            </div>

            {/* Buy button */}
            <button
              id="open-buy-form-btn"
              className="btn btn-success btn-lg"
              onClick={() => setShowBuy(true)}
              style={{ width: '100%' }}
            >
              Buy {detail.symbol}
            </button>
          </div>
        )}

        {!loading && showBuy && (
          <div>
            <div style={{ marginBottom: 'var(--sp-5)' }}>
              <button
                onClick={() => setShowBuy(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                ← Back to details
              </button>
            </div>
            <h3 style={{ marginBottom: 'var(--sp-5)' }}>Buy {detail?.symbol}</h3>
            <BuyStockForm
              stock={detail}
              onSuccess={onClose}
              onCancel={() => setShowBuy(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
