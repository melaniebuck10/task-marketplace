import api from './api';

export const loadMessages = async () => {
  const response = await api.get(`/messenger`);
  return response;
};
