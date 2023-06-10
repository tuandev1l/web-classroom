import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // config.withCredentials = true;
  return config;
});

instance.interceptors.response.use((config) => {
  if (config.data) {
    config.data = config.data;
  }
  return config;
});

export default instance;
