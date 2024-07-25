
import axios from 'axios';
import { API_URL } from '../utils/api';
import axiosInstance from '../utils/axiosInstance';
import { AppDispatch } from '../app/store'; 
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

export const verifyResetCode = (email: string | null, userCode: string) => {
  return async (dispatch: AppDispatch) => {
    if (!email) {
      throw new Error("Email is required");
    }
    try {
      console.log('Sending request with:', { email, userCode });
      const response = await axiosInstance.post(`${API_URL}/auth/verify-email/${email}`, { userCode });
      console.log('Response:', response);
      dispatch({
        type: VERIFY_RESET_CODE,
        payload: response.data
      });
      return response;
    } catch (error: any) {
      console.error('Error details:', error.response || error);
      throw error;
    }
  };
};
export const updatePassword = (values: { newPassword: string; confirmPassword: string }, token: string) => async (dispatch: any) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/auth/updatePassword/${token}`, { 
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword
    });
    dispatch({
      type: UPDATE_PASSWORD,
      payload: response.data
    });
    return response;
  } catch (error) {
    throw error;
  }
}; 