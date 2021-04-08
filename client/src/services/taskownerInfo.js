import api from './api';

export const loadTaskOwner = async (id) => {
  const response = await api.get(`/taskowner/${id}`);
  const body = response.data;
  return body;
};

// export const verify = async () => {
//   const response = await api.get('/authentication/verify');
//   return response.data.user;
// };
