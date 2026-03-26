export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '16px 32px',
      textAlign: 'center', color: 'var(--text-subtle)', fontSize: '0.8125rem',
    }}>
      StockX © {new Date().getFullYear()} — Stock Trading Simulation Platform
    </footer>
  );
}
