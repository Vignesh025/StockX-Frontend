import { useState } from 'react';
import { X, DollarSign, ExternalLink } from 'lucide-react';
import { initiateDeposit } from '../../services/walletService';
import { validateDepositAmount } from '../../utils/validators';
import { MIN_DEPOSIT, MAX_DEPOSIT } from '../../utils/constants';
import ErrorAlert from '../Common/ErrorAlert';

export default function DepositModal({ onClose }) {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Escape key
  function handleKeyDown(e) { if (e.key === 'Escape') onClose?.(); }

  function validate() {
    const err = validateDepositAmount(amount);
    setAmountError(err || '');
    return !err;
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
    if (amountError) setAmountError('');
  }

  async function handleDeposit(e) {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const { checkoutUrl } = await initiateDeposit(parseFloat(amount));
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      setApiError(err?.response?.data?.message ?? 'Failed to initiate deposit. Please try again.');
      setLoading(false);
    }
  }

  const presets = [50, 100, 250, 500, 1000];

  return (
    <div className="modal-overlay" onClick={onClose} onKeyDown={handleKeyDown}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-6)' }}>
          <div>
            <h2 className="modal-title" style={{ margin: 0 }}>Deposit Funds</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>
              Add money to your trading wallet
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', cursor: 'pointer' }} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleDeposit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
          {/* Preset amounts */}
          <div>
            <div className="form-label" style={{ marginBottom: 8 }}>Quick amounts</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {presets.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`btn btn-sm ${amount == p ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => { setAmount(String(p)); if (amountError) setAmountError(''); }}
                >
                  ${p}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div className="form-group">
            <label className="form-label" htmlFor="deposit-amount">
              <DollarSign size={14} style={{ display: 'inline' }} /> Custom amount (USD)
            </label>
            <input
              id="deposit-amount"
              type="number"
              min={MIN_DEPOSIT}
              max={MAX_DEPOSIT}
              step="0.01"
              className={`form-input${amountError ? ' error' : ''}`}
              placeholder={`$${MIN_DEPOSIT} – $${MAX_DEPOSIT.toLocaleString()}`}
              value={amount}
              onChange={handleAmountChange}
            />
            {amountError && <span className="form-error">{amountError}</span>}
            <span className="form-hint">Minimum ${MIN_DEPOSIT} · Maximum ${MAX_DEPOSIT.toLocaleString()}</span>
          </div>

          {/* Stripe info */}
          <div style={{ padding: '12px 16px', background: 'var(--brand-dim)', borderRadius: 'var(--r-md)', border: '1px solid var(--brand-border)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <ExternalLink size={13} style={{ display: 'inline', marginRight: 6 }} />
            You&apos;ll be redirected to Stripe Checkout (test mode). Use card <strong style={{ color: 'var(--text)' }}>4242 4242 4242 4242</strong> for success.
          </div>

          {apiError && <ErrorAlert message={apiError} />}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button
              id="deposit-confirm-btn"
              type="submit"
              className="btn btn-primary"
              disabled={loading || !amount}
            >
              {loading ? 'Redirecting…' : `Deposit $${amount || '0'}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
