import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ROUTES, ROLES } from './utils/constants';

import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import HomePage from './pages/HomePage';
import MarketPage from './pages/MarketPage';
import PortfolioPage from './pages/PortfolioPage';
import WalletPage from './pages/WalletPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import LoadingSpinner from './components/Common/LoadingSpinner';

// ── Route guards ──────────────────────────────────────────────
function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner label="Authenticating…" />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner label="Checking permissions…" />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  if (!isAdmin) return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  return children;
}

function GuestOnly({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;
  return children;
}

// ── Deposit success / cancel redirect pages ───────────────────
function DepositSuccess() {
  return <Navigate to={`${ROUTES.WALLET}?success=true`} replace />;
}
function DepositCancel() {
  return <Navigate to={`${ROUTES.WALLET}?canceled=true`} replace />;
}

// ── Router ────────────────────────────────────────────────────
export default function Router() {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.LOGIN} element={<GuestOnly><LoginForm /></GuestOnly>} />
      <Route path={ROUTES.REGISTER} element={<GuestOnly><RegisterForm /></GuestOnly>} />
      <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

      {/* Stripe redirect helpers */}
      <Route path="/wallet/deposit/success" element={<RequireAuth><DepositSuccess /></RequireAuth>} />
      <Route path="/wallet/deposit/cancel"  element={<RequireAuth><DepositCancel /></RequireAuth>} />

      {/* Protected */}
      <Route path={ROUTES.HOME} element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path={ROUTES.MARKET} element={<RequireAuth><MarketPage /></RequireAuth>} />
      <Route path={ROUTES.PORTFOLIO} element={<RequireAuth><PortfolioPage /></RequireAuth>} />
      <Route path={ROUTES.WALLET} element={<RequireAuth><WalletPage /></RequireAuth>} />

      {/* Admin only */}
      <Route path={ROUTES.ADMIN} element={<RequireAdmin><AdminDashboardPage /></RequireAdmin>} />

      {/* Default */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
