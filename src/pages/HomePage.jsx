import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import TopStocks from '../components/Market/TopStocks';
import StockDetailModal from '../components/Market/StockDetailModal';
import WalletBalance from '../components/Wallet/WalletBalance';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TrendingUp, Briefcase, Wallet } from 'lucide-react';
import { ROUTES } from '../utils/constants';

export default function HomePage() {
  const { user } = useAuth();
  const [selectedStock, setSelectedStock] = useState(null);

  return (
    <MainLayout title="Home">
      <div className="page-container">
        {/* Welcome banner */}
        <div style={{
          padding: 'clamp(20px, 4vw, 32px)', borderRadius: 'var(--r-xl)', marginBottom: 'var(--sp-8)',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(16,185,129,0.1) 100%)',
          border: '1px solid var(--brand-border)',
        }}>
          <h1 style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)', marginBottom: 8 }}>
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 'clamp(0.8125rem, 2vw, 1rem)' }}>
            Here&apos;s a snapshot of today&apos;s top performing stocks.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            <Link className="btn btn-primary" to={ROUTES.MARKET}>
              <TrendingUp size={16} /> Explore Market
            </Link>
            <Link className="btn btn-secondary" to={ROUTES.PORTFOLIO}>
              <Briefcase size={16} /> My Portfolio
            </Link>
            <Link className="btn btn-secondary" to={ROUTES.WALLET}>
              <Wallet size={16} /> My Wallet
            </Link>
          </div>
        </div>

        {/* Wallet summary */}
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <WalletBalance />
        </div>

        {/* Top stocks */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-5)', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
            <div>
              <h2 style={{ margin: 0 }}>Trending Today</h2>
              <p style={{ margin: '4px 0 0', fontSize: '0.875rem' }}>Top 15 most traded stocks — click to view details</p>
            </div>
            <Link to={ROUTES.MARKET} className="btn btn-ghost btn-sm">
              View all →
            </Link>
          </div>
          <TopStocks onSelectStock={setSelectedStock} />
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
