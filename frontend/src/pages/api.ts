import { api } from '../api/apiClient';

export const activateUser = async (userId: number) => {
  return await api.post(`/activate/${userId}`);
};

export const deactivateUser = async (userId: number) => {
  return await api.post(`/deactivate/${userId}`);
};

export const promoteToAdmin = async (userId: number) => {
  return await api.post(`/promote-to-admin/${userId}`);
};

export const getUsers = async () => {
  return await api.get(`/user`);
};