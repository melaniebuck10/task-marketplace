import api from './api';

export const createRating = async (data) => {
  const response = await api.post('/rating/create', data);
  const { rating } = response.data;
  return { rating };
};

export const loadRating = async (id) => {
  const response = await api.get(`/rating/${id}`);
  const ratings = response.data.ratings;
  return ratings;
};

export const listRatings = async () => {
  const response = await api.get('/rating/list');
  return response.data.ratings;
};
