import api from './api';

export const loadTaskOwner = async (id) => {
  const response = await api.get(`/taskowner/${id}`);
  return response.data.taskowner;
};
