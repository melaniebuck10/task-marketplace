import api from './api';

export const loadRating = async (id) => {
    const response = await api.get(`/rating/${id}`);
    const rating = response.data.rating
    console.log(rating);
    return rating;
  };

export const listRatings = async () => {
  const response = await api.get('/rating/list');
  return response.data.ratings;
};

export const createRating = async (data) => {
    const response = await api.post('/rating', data);
    return response.data.rating;
  };  

export const loadRatingIndividual = async (id) => {
  const response = await api.get(`/rating/${id}`);
  const { rating, ratingOfIndividual } = response.data;
  return { rating, ratingOfIndividual };
};