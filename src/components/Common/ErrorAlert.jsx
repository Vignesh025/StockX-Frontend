import { AlertCircle } from 'lucide-react';

export default function ErrorAlert({ message, onRetry }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 16px', background: 'var(--red-dim)',
        border: '1px solid var(--red)', borderRadius: 'var(--r-md)',
      }}
    >
      <AlertCircle size={18} color="var(--red)" style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ flex: 1 }}>
        <p style={{ color: 'var(--red)', fontSize: '0.875rem', margin: 0 }}>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            style={{
              marginTop: 8, background: 'none', border: 'none', padding: 0,
              color: 'var(--red)', fontSize: '0.8125rem', cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
