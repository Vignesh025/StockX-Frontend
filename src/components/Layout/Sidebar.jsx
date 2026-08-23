import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Briefcase, Wallet, Users, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { formatCurrency } from '../../utils/formatters';
import { ROUTES, ROLES } from '../../utils/constants';
import { useEffect } from 'react';

const navItems = [
  { to: ROUTES.HOME,      icon: LayoutDashboard, label: 'Home' },
  { to: ROUTES.MARKET,    icon: TrendingUp,      label: 'Market' },
  { to: ROUTES.PORTFOLIO, icon: Briefcase,       label: 'My Stocks' },
  { to: ROUTES.WALLET,    icon: Wallet,          label: 'Wallet' },
];

const adminItems = [
  { to: ROUTES.ADMIN, icon: Users, label: 'Admin' },
];

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();
  const { balance, fetchBalance } = useWallet();

  useEffect(() => {
    if (user) fetchBalance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? '?';

  return (
    <aside className="sidebar">
      <Link to={ROUTES.HOME} className="sidebar-brand">
        <img src="/stockx.svg" alt="StockX" className="sidebar-brand-icon" />
        <span className="sidebar-brand-name">StockX</span>
      </Link>

      <nav className="sidebar-nav">
        <div className="sidebar-section">Navigation</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.HOME}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Icon size={18} />
            {label}
            {false && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.4 }} />}
          </NavLink>
        ))}

        {isAdmin && (
          <>
            <div className="sidebar-section" style={{ marginTop: 16 }}>Admin</div>
            {adminItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initial}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name ?? 'User'}</div>
            <div className="sidebar-user-email">{user?.email ?? ''}</div>
          </div>
        </div>
        {balance !== null && (
          <div className="sidebar-balance">
            Balance: <span>{formatCurrency(balance)}</span>
          </div>
        )}
        <button
          id="sidebar-logout-btn"
          className="btn btn-ghost btn-sm"
          onClick={logout}
          style={{ width: '100%', justifyContent: 'flex-start', gap: 8 }}
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </aside>
  );
}
