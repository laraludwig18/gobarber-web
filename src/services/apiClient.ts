import axios, { AxiosInstance } from 'axios';

import { useAuth } from '../context/auth';

export function useApiClient(): AxiosInstance {
  const { signOut, token } = useAuth();

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
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
