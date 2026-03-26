import api from './api';

export async function searchStocks(query, limit = 10) {
  const res = await api.get('/stock/search', { params: { query, limit } });
  return res.data; // [{ symbol, name, exchange }]
}

export async function getTopStocks(limit = 15) {
  const res = await api.get('/stock/top', { params: { limit } });
  return res.data; // [{ symbol, name, currentPrice, marketCap, changePercent }]
}

export async function getStockDetails(symbol) {
  const res = await api.get(`/stock/${symbol}`);
  return res.data; // { symbol, name, currentPrice, exchange, lastUpdated }
}
