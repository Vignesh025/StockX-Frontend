import { useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { usePagination } from '../../hooks/usePagination';
import { getAdminUsers, updateUserActivation, updateUserRole } from '../../services/adminService';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { useNotification } from '../../context/NotificationContext';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function UserManagementTable({ onViewDetail }) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { notify } = useNotification();
  const { page, limit, nextPage, prevPage, reset } = usePagination(1, 20);

  const { data, loading, error, refetch } = useQuery(
    () => getAdminUsers(page, limit, debouncedSearch),
    [page, limit, debouncedSearch],
  );

  const users = data?.users ?? data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? Math.ceil(total / limit);

  let searchTimer;
  function handleSearchChange(e) {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { setDebouncedSearch(val); reset(); }, 400);
  }

  async function toggleActive(user) {
    try {
      await updateUserActivation(user.userId ?? user.id, !user.isActive);
      notify.success(`User ${user.email} ${user.isActive ? 'deactivated' : 'activated'}.`);
      refetch();
    } catch {
      notify.error('Failed to update user status.');
    }
  }

  async function toggleRole(user) {
    const newRole = user.role === 'Admin' ? 'NormalUser' : 'Admin';
    try {
      await updateUserRole(user.userId ?? user.id, newRole);
      notify.success(`User ${user.email} role updated to ${newRole}.`);
      refetch();
    } catch {
      notify.error('Failed to update user role.');
    }
  }

  return (
    <div>
      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 'var(--sp-5)', maxWidth: 360 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
        <input
          id="admin-user-search"
          className="form-input"
          placeholder="Search by email…"
          value={search}
          onChange={handleSearchChange}
          style={{ paddingLeft: 38 }}
        />
      </div>

      {loading && <LoadingSpinner label="Loading users…" />}
      {!loading && error && <ErrorAlert message={error} onRetry={refetch} />}

      {!loading && !error && (
        <>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name / Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px 16px' }}>
                      No users found.
                    </td>
                  </tr>
                ) : users.map((u) => (
                  <tr key={u.userId ?? u.id}>
                    <td data-label="User">
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{u.email}</div>
                    </td>
                    <td data-label="Role">
                      <span className={`badge ${u.role === 'Admin' ? 'badge-brand' : 'badge-muted'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td data-label="Status">
                      <span className={`badge ${u.isActive ? 'badge-green' : 'badge-red'}`}>
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td data-label="Joined" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {formatDate(u.createdAt)}
                    </td>
                    <td data-label="">
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button
                          id={`admin-view-user-${u.userId ?? u.id}`}
                          className="btn btn-secondary btn-sm"
                          onClick={() => onViewDetail?.(u)}
                        >
                          View
                        </button>
                        <button
                          id={`admin-toggle-active-${u.userId ?? u.id}`}
                          className={`btn btn-sm ${u.isActive ? 'btn-danger' : 'btn-success'}`}
                          onClick={() => toggleActive(u)}
                        >
                          {u.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          id={`admin-toggle-role-${u.userId ?? u.id}`}
                          className="btn btn-ghost btn-sm"
                          onClick={() => toggleRole(u)}
                        >
                          {u.role === 'Admin' ? '→ User' : '→ Admin'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--sp-5)', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Page {page} of {totalPages} · {total} users
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn btn-secondary btn-sm btn-icon"
                  onClick={prevPage}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="btn btn-secondary btn-sm btn-icon"
                  onClick={nextPage}
                  disabled={page >= totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
