import { CheckCircle } from 'lucide-react';

export default function SuccessAlert({ message }) {
  if (!message) return null;
  return (
    <div
      role="status"
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        padding: '14px 16px', background: 'var(--green-dim)',
        border: '1px solid var(--green)', borderRadius: 'var(--r-md)',
      }}
    >
      <CheckCircle size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: 1 }} />
      <p style={{ color: 'var(--green)', fontSize: '0.875rem', margin: 0 }}>{message}</p>
    </div>
  );
}
