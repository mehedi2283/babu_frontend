import axios from 'axios';

// Use the production URL if deployed, otherwise fallback to /api for local proxy
const isProd = import.meta.env.PROD;
const api = axios.create({
  baseURL: isProd ? 'https://babu-server.vercel.app/api' : '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
