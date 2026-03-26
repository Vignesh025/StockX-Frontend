export const API_URL = import.meta.env.VITE_API_URL || '/api';

export const TOKEN_KEY = 'stockx_token';
export const USER_KEY = 'stockx_user';

export const ROLES = {
  ADMIN: 'Admin',
  NORMAL_USER: 'NormalUser',
};

export const TRANSACTION_TYPES = {
  DEPOSIT: 'Deposit',
  STOCK_BUY: 'StockBuy',
  STOCK_SELL: 'StockSell',
};

export const TRANSACTION_STATUS = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  FAILED: 'Failed',
};

export const MIN_DEPOSIT = 10;
export const MAX_DEPOSIT = 10000;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MARKET: '/market',
  PORTFOLIO: '/portfolio',
  WALLET: '/wallet',
  WALLET_SUCCESS: '/wallet/deposit/success',
  WALLET_CANCEL: '/wallet/deposit/cancel',
  ADMIN: '/admin',
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/unauthorized',
};
