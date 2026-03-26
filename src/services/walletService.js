import api from './api';

export async function getBalance() {
  const res = await api.get('/wallet/balance');
  return res.data; // { balance, lastUpdated }
}

export async function initiateDeposit(amount) {
  const res = await api.post('/wallet/deposit/initiate', { amount });
  return res.data; // { checkoutUrl, paymentIntentId }
}

export async function getTransactions(type = 'all', limit = 50, offset = 0) {
  const res = await api.get('/transactions', {
    params: { type, limit, offset },
  });
  return res.data;
}
