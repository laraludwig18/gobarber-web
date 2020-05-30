import axios, { AxiosInstance } from 'axios';

import { useAuth } from '../context/auth';

export function useApiClient(): AxiosInstance {
  const { signOut, token } = useAuth();

  const api = axios.create({
    baseURL: 'http://localhost:3333',
  });

  api.interceptors.request.use((config) => {
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && token) {
        signOut();
      }
      return Promise.reject(error);
    },
  );

  return api;
}
