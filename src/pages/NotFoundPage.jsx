import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '8rem', fontWeight: 900, color: 'var(--brand)', lineHeight: 1, marginBottom: 16 }}>
          404
        </div>
        <h1 style={{ marginBottom: 12 }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
          The page you are looking for does not exist.
        </p>
        <Link to={ROUTES.HOME} className="btn btn-primary">
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
