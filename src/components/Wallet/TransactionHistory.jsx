import { useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import { getTransactions } from '../../services/walletService';
import { formatCurrency, formatDate, formatTransactionType } from '../../utils/formatters';
import { TRANSACTION_TYPES } from '../../utils/constants';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorAlert from '../Common/ErrorAlert';
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, RefreshCw } from 'lucide-react';

function TxIcon({ type }) {
  switch (type) {
    case 'Deposit':   return <ArrowDownCircle size={18} color="var(--green)" />;
    case 'StockBuy':  return <TrendingUp size={18} color="var(--red)" />;
    case 'StockSell': return <ArrowUpCircle size={18} color="var(--green)" />;
    default:          return <RefreshCw size={18} color="var(--text-muted)" />;
  }
}

function TxBadge({ type }) {
  switch (type) {
    case 'Deposit':   return <span className="badge badge-green">Deposit</span>;
    case 'StockBuy':  return <span className="badge badge-red">Buy</span>;
    case 'StockSell': return <span className="badge badge-green">Sell</span>;
    default:          return <span className="badge badge-muted">{type}</span>;
  }
}

export default function TransactionHistory({ limit = 50 }) {
  const [filter, setFilter] = useState('all');

  const { data: transactions, loading, error, refetch } = useQuery(
    () => getTransactions(filter, limit, 0),
    [filter, limit],
  );

  const filters = [
    { value: 'all',       label: 'All' },
    { value: 'deposit',   label: 'Deposits' },
    { value: 'stock_buy', label: 'Buys' },
    { value: 'stock_sell',label: 'Sells' },
  ];

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--sp-5)', flexWrap: 'wrap' }}>
        {filters.map((f) => (
          <button
            key={f.value}
            className={`btn btn-sm ${filter === f.value ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading && <LoadingSpinner label="Loading transactions…" />}
      {!loading && error && <ErrorAlert message={error} onRetry={refetch} />}
      {!loading && !error && (!transactions?.length) && (
        <div className="empty-state">
          <RefreshCw size={48} className="empty-state-icon" />
          <p className="empty-state-text">No transactions yet.</p>
        </div>
      )}

      {!loading && !error && transactions?.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Stock</th>
                <th>Qty</th>
                <th>Price/Share</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.transactionId ?? tx.id}>
                  <td data-label="Type">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <TxIcon type={tx.type} />
                      <TxBadge type={tx.type} />
                    </div>
                  </td>
                  <td data-label="Date" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    {formatDate(tx.timestamp)}
                  </td>
                  <td data-label="Stock">
                    {tx.stockSymbol ? (
                      <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{tx.stockSymbol}</span>
                    ) : (
                      <span style={{ color: 'var(--text-subtle)' }}>—</span>
                    )}
                  </td>
                  <td data-label="Qty">
                    {tx.quantity ?? <span style={{ color: 'var(--text-subtle)' }}>—</span>}
                  </td>
                  <td data-label="Price/Share">
                    {tx.pricePerShare != null ? formatCurrency(tx.pricePerShare) : <span style={{ color: 'var(--text-subtle)' }}>—</span>}
                  </td>
                  <td data-label="Amount" style={{ fontWeight: 700 }}>
                    <span className={tx.amount > 0 ? 'text-positive' : 'text-negative'}>
                      {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td data-label="Status">
                    <span className={`badge ${tx.status === 'Completed' ? 'badge-green' : tx.status === 'Failed' ? 'badge-red' : 'badge-amber'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
