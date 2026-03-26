import { useQuery } from '../../hooks/useQuery';
import { getAdminUserDetail } from '../../services/adminService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { X, User, Wallet, Briefcase } from 'lucide-react';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';

export default function UserDetailModal({ user, onClose }) {
  const userId = user?.userId ?? user?.id;

  const { data: detail, loading, error, refetch } = useQuery(
    () => getAdminUserDetail(userId),
    [userId],
    { immediate: !!userId },
  );

  // Escape key
  function handleKeyDown(e) { if (e.key === 'Escape') onClose?.(); }

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={handleKeyDown}>
      <div className="modal" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-6)' }}>
          <h2 className="modal-title" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={20} />
            User Detail
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {loading && <LoadingSpinner label="Loading user details…" />}
        {!loading && error && <ErrorAlert message={error} onRetry={refetch} />}

        {!loading && !error && detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            {/* Basic info */}
            <div style={{ padding: '16px', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: 'var(--r-full)', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>
                {detail.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{detail.user?.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{detail.user?.email}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <span className={`badge ${detail.user?.role === 'Admin' ? 'badge-brand' : 'badge-muted'}`}>{detail.user?.role}</span>
                  <span className={`badge ${detail.user?.isActive ? 'badge-green' : 'badge-red'}`}>{detail.user?.isActive ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>

            {/* Wallet */}
            <div style={{ padding: '16px', background: 'var(--green-dim)', borderRadius: 'var(--r-md)', border: '1px solid var(--green)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Wallet size={20} color="var(--green)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Wallet Balance</div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--green)' }}>
                  {formatCurrency(detail.walletBalance ?? 0)}
                </div>
              </div>
            </div>

            {/* Portfolio summary */}
            {detail.portfolioSummary && (
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-subtle)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Briefcase size={14} />
                  Portfolio Summary
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Total Value', value: formatCurrency(detail.portfolioSummary.totalValue) },
                    { label: 'Total Cost', value: formatCurrency(detail.portfolioSummary.totalCost) },
                    { label: 'P/L', value: formatCurrency(detail.portfolioSummary.totalProfitLoss) },
                  ].map((item) => (
                    <div key={item.label} style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>{item.label}</div>
                      <div style={{ fontWeight: 600, marginTop: 2, fontSize: '0.9375rem' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent transactions */}
            {detail.recentTransactions?.length > 0 && (
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-subtle)', marginBottom: 8 }}>Recent Transactions</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflowY: 'auto' }}>
                  {detail.recentTransactions.map((tx) => (
                    <div key={tx.transactionId ?? tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: 'var(--r-sm)', fontSize: '0.8125rem' }}>
                      <span>
                        <span className={`badge badge-${tx.type === 'Deposit' || tx.type === 'StockSell' ? 'green' : 'red'}`}>{tx.type}</span>
                        {tx.stockSymbol && <span style={{ marginLeft: 8, color: 'var(--text-muted)' }}>{tx.stockSymbol}</span>}
                      </span>
                      <span style={{ color: tx.amount > 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
              Joined: {formatDate(detail.user?.createdAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
