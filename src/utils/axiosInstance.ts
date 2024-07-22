import axios from 'axios';
import { API_URL } from './api';
import { APP_TOKEN_NAME } from './AxiosToken';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(APP_TOKEN_NAME); 
//   console.log(token); 
  

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
 