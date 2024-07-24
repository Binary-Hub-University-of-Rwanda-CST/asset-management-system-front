
import axios from 'axios';
import { API_URL } from '../utils/api';
import axiosInstance from '../utils/axiosInstance';
import { 
  REQUEST_RESET_CODE, 
  VERIFY_RESET_CODE, 
  UPDATE_PASSWORD 
} from './types'; 

export const requestResetCode = (email: string) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/resetPassword`, { email });
    dispatch({
      type: REQUEST_RESET_CODE,
      payload: response.data
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const verifyResetCode = (email: string, userCode: string) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/verify-email/${email}`, { userCode });
    dispatch({
      type: VERIFY_RESET_CODE,
      payload: response.data
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = (token: string, newPassword: string) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/updatePassword/${token}`, { newPassword });
    dispatch({
      type: UPDATE_PASSWORD,
      payload: response.data
    });
    return response;
  } catch (error) {
    throw error;
  }
};