import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
export const getSports = async () => {
  const response = await api.get('/sports');
  return response.data;
};

export const getMatches = async (sportId) => {
  const response = await api.get(`/matches/${sportId}`);
  return response.data;
};

export const getMatchDetails = async (eventId) => {
  const response = await api.get(`/match/${eventId}`);
  return response.data;
};

export default api; 