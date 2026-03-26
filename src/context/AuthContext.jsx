import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../services/authService';
import { getToken, setToken, setStoredUser, getStoredUser, clearAuthStorage } from '../utils/localStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [loading, setLoading] = useState(!!getToken()); // true only if token exists

  // On mount, validate the stored token by fetching /auth/me
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getMe()
      .then((me) => {
        setUser(me);
        setStoredUser(me);
      })
      .catch(() => {
        clearAuthStorage();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiLogin(email, password);
    setToken(data.token);
    const me = await getMe();
    setStoredUser(me);
    setUser(me);
    return me;
  }, []);

  const register = useCallback(async (name, email, password) => {
    return await apiRegister(name, email, password);
  }, []);

  const logout = useCallback(() => {
    clearAuthStorage();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
      setStoredUser(me);
      return me;
    } catch {
      // silently ignore
    }
  }, []);

  const isAdmin = user?.role === 'Admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, isAdmin, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;
