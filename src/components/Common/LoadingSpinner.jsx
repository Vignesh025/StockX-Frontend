export default function LoadingSpinner({ size = 32, label = 'Loading…' }) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 32 }}
      role="status"
      aria-label={label}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: 'spin 0.8s linear infinite' }}
      >
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <circle cx="12" cy="12" r="10" stroke="var(--border)" strokeWidth="3" />
        <path
          d="M12 2 a10 10 0 0 1 10 10"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</span>
    </div>
  );
}
