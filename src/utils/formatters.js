/**
 * Format a number as USD currency.
 */
export function formatCurrency(value, digits = 2) {
  if (value == null || isNaN(value)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/**
 * Format a percentage value with sign.
 */
export function formatPercent(value, digits = 2) {
  if (value == null || isNaN(value)) return '0.00%';
  const sign = value >= 0 ? '+' : '';
  return `${sign}${Number(value).toFixed(digits)}%`;
}

/**
 * Format a large number with abbreviation (K, M, B, T).
 */
export function formatLargeNumber(value) {
  if (value == null || isNaN(value)) return '—';
  const abs = Math.abs(value);
  if (abs >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value}`;
}

/**
 * Format a date/timestamp to a readable local string.
 */
export function formatDate(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a date without time.
 */
export function formatDateOnly(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Returns a relative time string (e.g. "5 minutes ago").
 */
export function formatRelativeTime(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;
  return formatDateOnly(value);
}

/**
 * Map transaction type enum value to a display label.
 */
export function formatTransactionType(type) {
  const map = {
    Deposit: 'Deposit',
    StockBuy: 'Buy',
    StockSell: 'Sell',
  };
  return map[type] ?? type;
}

/**
 * Returns 'positive' | 'negative' | 'neutral' CSS class hint.
 */
export function profitLossClass(value) {
  if (value > 0) return 'positive';
  if (value < 0) return 'negative';
  return 'neutral';
}
