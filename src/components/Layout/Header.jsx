import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { useWallet } from '../../context/WalletContext';

export default function Header({ title }) {
  const { user } = useAuth();
  const { balance } = useWallet();

  return (
    <header className="header">
      <span className="header-title">{title || 'StockX'}</span>
      <div className="header-right">
        {balance !== null && (
          <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Balance:{' '}
            <strong style={{ color: 'var(--green)' }}>{formatCurrency(balance)}</strong>
          </span>
        )}
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--r-full)', background: 'var(--brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: '0.8125rem',
        }}>
          {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
        </div>
      </div>
    </header>
  );
}
