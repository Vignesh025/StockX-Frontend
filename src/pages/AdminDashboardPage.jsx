import MainLayout from '../components/Layout/MainLayout';
import AdminDashboard from '../components/Admin/AdminDashboard';
import { Shield } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <MainLayout title="Admin">
      <div className="page-container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: 'var(--amber-dim)', border: '1px solid var(--amber)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={20} color="var(--amber)" />
            </div>
            <div>
              <h1 className="page-title" style={{ margin: 0, lineHeight: 1 }}>Admin Dashboard</h1>
              <p style={{ margin: 0 }}>Platform management and user oversight</p>
            </div>
          </div>
        </div>
        <AdminDashboard />
      </div>
    </MainLayout>
  );
}
