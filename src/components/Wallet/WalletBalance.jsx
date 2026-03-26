import { useEffect } from 'react';
import { useWallet } from '../../context/WalletContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Wallet, RefreshCw } from 'lucide-react';

export default function WalletBalance({ compact = false }) {
  const { balance, loadingBalance, fetchBalance } = useWallet();

  useEffect(() => {
    fetchBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Wallet size={16} color="var(--green)" />
        <span style={{ fontWeight: 600, color: 'var(--green)' }}>
          {loadingBalance ? '…' : formatCurrency(balance ?? 0)}
        </span>
      </div>
    );
  }

  return (
    <div className="stat-card" style={{ border: '1px solid var(--green)', maxWidth: 320 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-subtle)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          <Wallet size={14} />
          Wallet Balance
        </div>
        <button
          onClick={fetchBalance}
          disabled={loadingBalance}
          style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}
          aria-label="Refresh balance"
        >
          <RefreshCw size={14} style={{ animation: loadingBalance ? 'spin 0.8s linear infinite' : 'none' }} />
        </button>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--green)' }}>
        {loadingBalance ? '…' : formatCurrency(balance ?? 0)}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 4 }}>
        Available for trading
      </div>
    </div>
  );
}
