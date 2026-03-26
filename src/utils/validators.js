import { MIN_DEPOSIT, MAX_DEPOSIT } from './constants';

export function validateEmail(email) {
  if (!email) return 'Email is required.';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Invalid email address.';
  return null;
}

export function validatePassword(password) {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  return null;
}

export function validateName(name) {
  if (!name || name.trim().length === 0) return 'Name is required.';
  if (name.trim().length < 2) return 'Name must be at least 2 characters.';
  return null;
}

export function validateDepositAmount(amount) {
  const num = parseFloat(amount);
  if (isNaN(num) || amount === '') return 'Amount is required.';
  if (num < MIN_DEPOSIT) return `Minimum deposit is $${MIN_DEPOSIT}.`;
  if (num > MAX_DEPOSIT) return `Maximum deposit is $${MAX_DEPOSIT.toLocaleString()}.`;
  return null;
}

export function validateQuantity(quantity, maxQuantity = null) {
  const num = parseFloat(quantity);
  if (isNaN(num) || quantity === '') return 'Quantity is required.';
  if (num <= 0) return 'Quantity must be greater than 0.';
  if (maxQuantity !== null && num > maxQuantity) {
    return `You only own ${maxQuantity} shares.`;
  }
  return null;
}

export function validateSymbol(symbol) {
  if (!symbol || symbol.trim().length === 0) return 'Symbol is required.';
  const re = /^[A-Za-z0-9.\-]+$/;
  if (!re.test(symbol)) return 'Invalid stock symbol.';
  return null;
}
