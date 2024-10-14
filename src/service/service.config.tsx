
import axios, { AxiosInstance } from 'axios';

// Configuración general de axios
const service: AxiosInstance = axios.create({
baseURL: `${import.meta.env.VITE_SERVER_URL}/api`
});

// Interceptores de solicitud
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
