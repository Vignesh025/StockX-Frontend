import api from './api';

export async function register(name, email, password) {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
}

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data; // { token, user: { id, name, email, role } }
}

export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data; // { id, name, email, role, walletBalance }
}
