import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import { useNotification } from '../../context/NotificationContext';
import { sellStock } from '../../services/tradingService';
import { formatCurrency } from '../../utils/formatters';
import { validateQuantity } from '../../utils/validators';
import ErrorAlert from '../Common/ErrorAlert';
import { TrendingDown, DollarSign } from 'lucide-react';

export default function SellStockForm({ holding, onSuccess, onCancel }) {
  const { fetchBalance } = useWallet();
  const { notify } = useNotification();

  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const qty = parseFloat(quantity) || 0;
  const total = qty * (holding?.currentPrice ?? 0);
  const maxQty = holding?.quantity ?? 0;

  function validate() {
    const err = validateQuantity(quantity, maxQty);
    setQuantityError(err || '');
    return !err;
  }

  async function handleSell(e) {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const result = await sellStock(holding.symbol, parseFloat(quantity));
      await fetchBalance();
      notify.success(`Sold ${quantity} share(s) of ${holding.symbol} for ${formatCurrency(total)}`);
      onSuccess?.(result);
    } catch (err) {
      const msg = err?.response?.data?.message ?? err?.response?.data ?? 'Sell failed. Please try again.';
      setApiError(typeof msg === 'string' ? msg : 'Sell failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSell} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      {/* Stock info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 16px', background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
        <div>
          <div style={{ fontWeight: 700, color: 'var(--text)' }}>{holding?.symbol}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{holding?.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: 4 }}>
            You own: <strong>{maxQty}</strong> shares
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>{formatCurrency(holding?.currentPrice)}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>current price</div>
        </div>
      </div>

      {/* Quantity */}
      <div className="form-group">
        <label className="form-label" htmlFor="sell-quantity">Quantity to sell</label>
        <input
          id="sell-quantity" type="number" min="0.01" step="0.01" max={maxQty}
          className={`form-input${quantityError ? ' error' : ''}`}
          value={quantity}
          onChange={(e) => { setQuantity(e.target.value); if (quantityError) setQuantityError(''); }}
          placeholder={`Max: ${maxQty}`}
        />
        {quantityError && <span className="form-error">{quantityError}</span>}
        <span className="form-hint">Max: {maxQty} shares</span>
      </div>

      {/* Summary */}
      {qty > 0 && (
        <div style={{ padding: '14px 16px', background: 'var(--red-dim)', borderRadius: 'var(--r-md)', border: '1px solid var(--red)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>You will receive</span>
            <span style={{ fontWeight: 700, color: 'var(--green)' }}>
              <DollarSign size={14} style={{ display: 'inline' }} />{formatCurrency(total).replace('$', '')}
            </span>
          </div>
        </div>
      )}

      {apiError && <ErrorAlert message={apiError} />}

      <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'flex-end' }}>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
        <button
          id="sell-stock-submit-btn"
          type="submit"
          className="btn btn-danger"
          disabled={loading || !qty || qty > maxQty}
        >
          <TrendingDown size={16} />
          {loading ? 'Processing…' : `Sell ${qty > 0 ? qty : ''} Shares`}
        </button>
      </div>
    </form>
  );
}
