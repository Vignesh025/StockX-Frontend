import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import WalletBalance from '../components/Wallet/WalletBalance';
import DepositModal from '../components/Wallet/DepositModal';
import TransactionHistory from '../components/Wallet/TransactionHistory';
import { Wallet, PlusCircle, CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SuccessAlert from '../components/Common/SuccessAlert';
import ErrorAlert from '../components/Common/ErrorAlert';
import { useEffect } from 'react';
import { useWallet } from '../context/WalletContext';

export default function WalletPage() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [params, setParams] = useSearchParams();
  const { fetchBalance } = useWallet();

  // After Stripe redirect
  const isSuccess = params.get('success') === 'true';
  const isCanceled = params.get('canceled') === 'true';

  useEffect(() => {
    if (isSuccess) {
      fetchBalance();
      // Remove the query param after 5 seconds
      const t = setTimeout(() => setParams({}), 5000);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <MainLayout title="Wallet">
      <div className="page-container">
        <div className="page-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, background: 'var(--green-dim)', border: '1px solid var(--green)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color="var(--green)" />
              </div>
              <div>
                <h1 className="page-title" style={{ margin: 0, lineHeight: 1 }}>My Wallet</h1>
                <p style={{ margin: 0 }}>Manage your trading balance</p>
              </div>
            </div>
            <button
              id="open-deposit-modal-btn"
              className="btn btn-primary"
              onClick={() => setShowDeposit(true)}
            >
              <PlusCircle size={16} />
              Deposit Funds
            </button>
          </div>
        </div>

        {/* Stripe redirect feedback */}
        {isSuccess && (
          <div style={{ marginBottom: 'var(--sp-5)' }}>
            <SuccessAlert message="Deposit successful! Your balance has been updated." />
          </div>
        )}
        {isCanceled && (
          <div style={{ marginBottom: 'var(--sp-5)' }}>
            <ErrorAlert message="Deposit was cancelled. No funds were added." />
          </div>
        )}

        {/* Wallet balance card */}
        <div style={{ marginBottom: 'var(--sp-8)' }}>
          <WalletBalance />
        </div>

        {/* Info card */}
        <div className="card" style={{ marginBottom: 'var(--sp-8)', maxWidth: 560 }}>
          <h3 style={{ marginBottom: 'var(--sp-3)' }}>How your wallet works</h3>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.875rem', paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>Your balance is calculated from your complete transaction history.</li>
            <li>Deposits add to your balance via Stripe (test mode).</li>
            <li>Buying stocks deducts from your balance.</li>
            <li>Selling stocks adds the proceeds back.</li>
          </ul>
        </div>

        {/* Transaction history */}
        <div>
          <h2 style={{ marginBottom: 'var(--sp-5)' }}>Transaction History</h2>
          <TransactionHistory limit={100} />
        </div>
      </div>

      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}
    </MainLayout>
  );
}
