import { useState, useCallback, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { searchStocks } from '../../services/stockService';
import LoadingSpinner from '../Common/LoadingSpinner';

export default function StockSearch({ onSelectStock }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef(null);

  const doSearch = useCallback(async (q) => {
    if (!q.trim() || q.trim().length < 1) { setResults([]); return; }
    setLoading(true);
    setError('');
    try {
      const data = await searchStocks(q.trim(), 20);
      setResults(data);
    } catch {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 350);
  }

  function clearSearch() {
    setQuery('');
    setResults([]);
    setError('');
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <Search
          size={18}
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }}
        />
        <input
          id="stock-search-input"
          type="text"
          className="form-input"
          placeholder="Search stocks by symbol or name…"
          value={query}
          onChange={handleChange}
          style={{ paddingLeft: 42, paddingRight: query ? 42 : 14 }}
          aria-label="Search stocks"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {(loading || results.length > 0 || error) && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50,
          background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-lg)', overflow: 'hidden', maxHeight: 360, overflowY: 'auto',
        }}>
          {loading && (
            <div style={{ padding: '12px 0' }}>
              <LoadingSpinner size={24} label="Searching…" />
            </div>
          )}
          {!loading && error && (
            <p style={{ padding: '16px', color: 'var(--red)', fontSize: '0.875rem' }}>{error}</p>
          )}
          {!loading && !error && results.length === 0 && query.trim() && (
            <p style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>No results found.</p>
          )}
          {!loading && results.map((stock) => (
            <button
              key={stock.symbol}
              style={{
                width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: '1px solid var(--border)', textAlign: 'left', transition: 'background 150ms',
              }}
              onClick={() => { onSelectStock?.(stock); clearSearch(); }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9375rem' }}>{stock.symbol}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 2 }}>{stock.name}</div>
              </div>
              {stock.exchange && (
                <span className="badge badge-muted" style={{ marginLeft: 8, flexShrink: 0 }}>{stock.exchange}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
