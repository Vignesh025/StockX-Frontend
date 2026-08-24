import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import StockSearch from '../components/Market/StockSearch';
import StockDetailModal from '../components/Market/StockDetailModal';
import { TrendingUp } from 'lucide-react';

export default function MarketPage() {
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <MainLayout title="Market">
      <div className="page-container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: 'var(--brand-dim)', border: '1px solid var(--brand-border)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} color="var(--brand-hover)" />
            </div>
            <div>
              <h1 className="page-title" style={{ margin: 0, lineHeight: 1 }}>Stock Market</h1>
              <p style={{ margin: 0 }}>Search and browse tradable stocks</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ maxWidth: 'min(720px, 100%)' }}>
          <h3 style={{ marginBottom: 'var(--sp-4)' }}>Search Stocks</h3>
          <p style={{ fontSize: '0.875rem', marginBottom: 'var(--sp-5)' }}>
            Type a stock symbol (e.g. AAPL) or company name to find stocks. Click any result to view price and buy.
          </p>
          <StockSearch onSelectStock={setSelectedStock} />

          <div className="divider" />

          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            {['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'META'].map((sym) => (
              <button
                key={sym}
                className="badge badge-brand"
                style={{ cursor: 'pointer', border: 'none', padding: '6px 14px', fontSize: '0.8rem' }}
                onClick={() => setSelectedStock({ symbol: sym, name: sym })}
              >
                {sym}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', marginTop: 8 }}>Quick picks — click to open</p>
        </div>
      </div>

      {selectedStock && (
        <StockDetailModal
          stockBase={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </MainLayout>
  );
}
