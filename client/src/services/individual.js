import api from './api';

export const loadIndividual = async (id) => {
  const response = await api.get(`/individual/${id}`);
  return response.data.individual;
};

export const saveQualities = async (data) => {
  const response = await api.patch('/individual/qualities', data);
  return response.data.user;
};
