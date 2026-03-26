import api from './api';

export async function buyStock(symbol, quantity) {
  const res = await api.post('/trading/buy', { symbol, quantity });
  return res.data; // { success, transaction, newBalance, message }
}

export async function sellStock(symbol, quantity) {
  const res = await api.post('/trading/sell', { symbol, quantity });
  return res.data;
}

export async function getPortfolio() {
  const res = await api.get('/portfolio');
  return res.data; // { holdings: [...], totalValue, totalCost, totalProfitLoss }
}
