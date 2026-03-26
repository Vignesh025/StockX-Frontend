import api from './api';

export async function getAdminUsers(page = 1, limit = 20, search = '') {
  const res = await api.get('/admin/users', {
    params: { page, limit, ...(search ? { search } : {}) },
  });
  return res.data; // { users: [...], total, page, totalPages }
}

export async function getAdminUserDetail(userId) {
  const res = await api.get(`/admin/users/${userId}`);
  return res.data;
}

export async function updateUserActivation(userId, isActive) {
  const res = await api.put(`/admin/users/${userId}/activate`, { isActive });
  return res.data;
}

export async function updateUserRole(userId, role) {
  const res = await api.put(`/admin/users/${userId}/role`, { role });
  return res.data;
}
