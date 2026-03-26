import { createContext, useContext, useState, useCallback } from 'react';
import { getBalance as apiFetchBalance } from '../services/walletService';
import { useAuth } from './AuthContext';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const fetchBalance = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoadingBalance(true);
    try {
      const data = await apiFetchBalance();
      setBalance(data.balance);
      return data.balance;
    } catch {
      // silently fail
    } finally {
      setLoadingBalance(false);
    }
  }, [isAuthenticated]);

  const updateBalance = useCallback((newBalance) => {
    setBalance(newBalance);
  }, []);

  return (
    <WalletContext.Provider value={{ balance, loadingBalance, fetchBalance, updateBalance }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
}

export default WalletContext;
