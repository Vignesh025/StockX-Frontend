import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import PortfolioSummary from '../components/Portfolio/PortfolioSummary';
import PortfolioTable from '../components/Portfolio/PortfolioTable';
import HoldingCard from '../components/Portfolio/HoldingCard';
import SellStockForm from '../components/Portfolio/SellStockForm';
import { useQuery } from '../hooks/useQuery';
import { getPortfolio } from '../services/tradingService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorAlert from '../components/Common/ErrorAlert';
import { Briefcase, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

export default function PortfolioPage() {
  const [sellHolding, setSellHolding] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  const { data: portfolio, loading, error, refetch } = useQuery(
    () => getPortfolio(),
    [],
    { refetchInterval: 2 * 60 * 1000 }, // 2 min
  );

  const holdings = portfolio?.holdings ?? [];

  function handleSellSuccess() {
    setSellHolding(null);
    refetch();
  }

  return (
    <MainLayout title="My Stocks">
      <div className="page-container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, background: 'var(--brand-dim)', border: '1px solid var(--brand-border)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={20} color="var(--brand-hover)" />
              </div>
              <div>
                <h1 className="page-title" style={{ margin: 0, lineHeight: 1 }}>My Portfolio</h1>
                <p style={{ margin: 0 }}>Your current stock holdings</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('table')}
                aria-label="Table view"
              >
                <List size={14} />
              </button>
              <button
                className={`btn btn-sm ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setViewMode('cards')}
                aria-label="Card view"
              >
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>
        </div>

        {loading && <LoadingSpinner label="Loading portfolio…" />}
        {!loading && error && <ErrorAlert message={error} onRetry={refetch} />}

        {!loading && !error && portfolio && (
          <>
            <PortfolioSummary
              totalValue={portfolio.totalValue}
              totalCost={portfolio.totalCost}
              totalProfitLoss={portfolio.totalProfitLoss}
            />

            {holdings.length === 0 ? (
              <div className="empty-state">
                <Briefcase size={56} className="empty-state-icon" />
                <h3>No holdings yet</h3>
                <p className="empty-state-text">Start by buying stocks from the market.</p>
                <Link to={ROUTES.MARKET} className="btn btn-primary" style={{ marginTop: 8 }}>
                  Browse Market
                </Link>
              </div>
            ) : viewMode === 'table' ? (
              <PortfolioTable holdings={holdings} onSell={setSellHolding} />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 'var(--sp-5)' }}>
                {holdings.map((h) => (
                  <HoldingCard key={h.symbol} holding={h} onSell={setSellHolding} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Sell modal */}
      {sellHolding && (
        <div className="modal-overlay" onClick={() => setSellHolding(null)}>
          <div className="modal" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 'var(--sp-5)' }}>Sell {sellHolding.symbol}</h3>
            <SellStockForm
              holding={sellHolding}
              onSuccess={handleSellSuccess}
              onCancel={() => setSellHolding(null)}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
}
