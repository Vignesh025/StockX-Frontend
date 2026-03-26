import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotification } from '../../context/NotificationContext';
import { buyStock } from '../../services/tradingService';
import { formatCurrency } from '../../utils/formatters';
import { validateQuantity } from '../../utils/validators';
import ErrorAlert from '../Common/ErrorAlert';
import { ShoppingCart, DollarSign } from 'lucide-react';

export default function BuyStockForm({ stock, onSuccess, onCancel }) {
  const { balance, fetchBalance } = useWallet();
  const { notify } = useNotification();

  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const qty = parseFloat(quantity) || 0;
  const total = qty * (stock?.currentPrice ?? 0);
  const canAfford = balance !== null ? total <= balance : true;

  function validate() {
    const err = validateQuantity(quantity);
    setQuantityError(err || '');
    return !err;
  }

  async function handleBuy(e) {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    if (!canAfford) {
      setApiError('Insufficient wallet balance.');
      return;
    }

    setLoading(true);
    try {
      const result = await buyStock(stock.symbol, parseFloat(quantity));
      await fetchBalance();
      notify.success(`Bought ${quantity} share(s) of ${stock.symbol} at ${formatCurrency(stock.currentPrice)}`);
      onSuccess?.(result);
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data ?? 'Buy failed. Please try again.';
      setApiError(typeof msg === 'string' ? msg : 'Buy failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleBuy} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      {/* Stock info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{stock?.symbol}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{stock?.name}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>{formatCurrency(stock?.currentPrice)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>per share</div>
        </div>
      </div>

      {/* Quantity */}
      <div className="form-group">
        <label className="form-label" htmlFor="buy-quantity">Quantity (shares)</label>
        <input
          id="buy-quantity" type="number" min="0.01" step="0.01"
          className={`form-input${quantityError ? ' error' : ''}`}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
            if (quantityError) setQuantityError('');
          }}
          placeholder="Enter number of shares"
        />
        {quantityError && <span className="form-error">{quantityError}</span>}
      </div>

      {/* Summary */}
      {qty > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 16px', background: 'var(--brand-dim)', borderRadius: 'var(--r-md)', border: '1px solid var(--brand-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Total cost</span>
            <span style={{ fontWeight: 600, color: canAfford ? 'var(--text)' : 'var(--red)' }}>{formatCurrency(total)}</span>
          </div>
          {balance !== null && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
              <span style={{ color: 'var(--text-subtle)' }}>Available balance</span>
              <span style={{ color: 'var(--text-muted)' }}>{formatCurrency(balance)}</span>
            </div>
          )}
          {!canAfford && (
            <div style={{ color: 'var(--red)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              <DollarSign size={14} /> Insufficient balance
            </div>
          )}
        </div>
      )}

      {apiError && <ErrorAlert message={apiError} />}

      <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button
          id="buy-stock-submit-btn"
          type="submit"
          className="btn btn-success"
          disabled={loading || !qty || !canAfford}
        >
          <ShoppingCart size={16} />
          {loading ? 'Processing…' : `Buy ${qty > 0 ? qty : ''} Shares`}
        </button>
      </div>
    </form>
  );
}
