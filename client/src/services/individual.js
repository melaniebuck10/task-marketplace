import api from './api';

export const loadIndividual = async (id) => {
  const response = await api.get(`/individual/${id}`);
  return response.data.individual;
};

export const editProfileName = async (id, data) => {
  const response = await api.patch(
    `http://localhost:3000/individual/${id}`,
    data
  );
  const body = response.data;
  const profileName = body.profileName;
  return profileName;
};

export const loadTasksAppliedIndividual = async (id) => {
  const response = await api.get(`/individual/${id}`);
  const { individual, tasksApplied } = response.data;
  return { individual, tasksApplied };
};

export const loadAppliedTasks = async (id) => {
  const response = await api.get(`/individual/${id}/myapplications`);
  return response;
};
