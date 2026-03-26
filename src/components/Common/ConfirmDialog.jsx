import { AlertTriangle, X } from 'lucide-react';

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {string} props.title
 * @param {string} props.message
 * @param {string} props.confirmLabel
 * @param {string} props.cancelLabel
 * @param {'danger'|'warning'} props.variant
 * @param {Function} props.onConfirm
 * @param {Function} props.onCancel
 * @param {boolean} props.loading
 */
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  const color = variant === 'danger' ? 'var(--red)' : 'var(--amber)';
  const bgColor = variant === 'danger' ? 'var(--red-dim)' : 'var(--amber-dim)';

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, background: bgColor, borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AlertTriangle size={20} color={color} />
          </div>
          <h3 className="modal-title" style={{ margin: 0 }}>{title}</h3>
          <button
            onClick={onCancel}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>
        {message && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>{message}</p>}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </button>
          <button
            className={`btn ${variant === 'danger' ? 'btn-danger' : 'btn-primary'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
