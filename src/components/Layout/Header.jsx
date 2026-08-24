import { Moon, Sun, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import { useWallet } from '../../context/WalletContext';
import { useTheme } from '../../context/ThemeContext';

export default function Header({ title, onToggleSidebar }) {
  const { user } = useAuth();
  const { balance } = useWallet();
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <span className="header-title">{title || 'StockX'}</span>
      </div>
      <div className="header-right">
        <button
          type="button"
          className="btn btn-ghost btn-icon theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
          title={`Switch to ${isLightMode ? 'dark' : 'light'} mode`}
        >
          {isLightMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        {balance !== null && (
          <span className="header-balance-text" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Balance:{' '}
            <strong style={{ color: 'var(--green)' }}>{formatCurrency(balance)}</strong>
          </span>
        )}
        <div style={{
          width: 32, height: 32, borderRadius: 'var(--r-full)', background: 'var(--brand)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-inverse)', fontWeight: 700, fontSize: '0.8125rem',
        }}>
          {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
        </div>
      </div>
    </header>
  );
}
