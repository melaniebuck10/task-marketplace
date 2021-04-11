import api from './api';

export const loadTaskOwner = async (id) => {
  const response = await api.get(`/taskowner/${id}`);
  const { taskowner, tasksOfOwner } = response.data;
  return { taskowner, tasksOfOwner };
};
