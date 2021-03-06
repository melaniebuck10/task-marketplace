import api from './api';

export const createTask = async (data) => {
  const response = await api.post('/task', data);
  return response.data.task;
};

export const listTasks = async () => {
  const response = await api.get('/task/list');
  return response.data.tasks;
};

export const loadTask = async (id) => {
  const response = await api.get(`/task/${id}`);
  const task = response.data.task;
  const application = response.data.application;
  return { task, application };
};

export const editTask = async (id, data) => {
  const response = await api.patch(`/task/${id}/edit`, data);
  return response.data.task;
};

export const deleteTask = async (id) => {
  await api.delete(`/task/${id}`);
};

export const applyTask = async (id) => {
  const response = await api.post(`/task/${id}/apply`);
  return response.data.application;
};

export const assignTask = async (id, data) => {
  const response = await api.patch(`/task/${id}/assignTask`, data);
  
  return response.data.assignedTask;
};

export const updatedApplications = async (id, data) => {
  const response = await api.patch(`task/${id}/updateapplications`, data);
  return response.data;
};
