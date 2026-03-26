import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { ShieldOff } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', padding: 24 }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, background: 'var(--red-dim)', borderRadius: 'var(--r-full)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldOff size={36} color="var(--red)" />
          </div>
        </div>
        <h1 style={{ marginBottom: 12 }}>Access Denied</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
          You don&apos;t have permission to access this page.
        </p>
        <Link to={ROUTES.HOME} className="btn btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
