// AuthService.ts
import axios from 'axios';

const API_BASE_URL = 'api_base_url';

export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
  return response.data;
};

export const getUserInfo = async () => {
  const response = await axios.get(`${API_BASE_URL}/user`);
  return response.data;
};
