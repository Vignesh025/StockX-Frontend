import { TOKEN_KEY, USER_KEY } from './constants';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // silently fail
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // silently fail
  }
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {
    // silently fail
  }
}

export function removeStoredUser() {
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    // silently fail
  }
}

export function clearAuthStorage() {
  removeToken();
  removeStoredUser();
}
