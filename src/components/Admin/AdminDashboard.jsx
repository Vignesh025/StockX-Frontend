import { useState } from 'react';
import UserManagementTable from './UserManagementTable';
import UserDetailModal from './UserDetailModal';
import { Users } from 'lucide-react';

export default function AdminDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'var(--sp-6)' }}>
        <div style={{ width: 40, height: 40, background: 'var(--brand-dim)', border: '1px solid var(--brand-border)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Users size={20} color="var(--brand-hover)" />
        </div>
        <div>
          <h2 style={{ margin: 0 }}>User Management</h2>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Manage registered users, roles, and status</p>
        </div>
      </div>

      <UserManagementTable onViewDetail={setSelectedUser} />

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
