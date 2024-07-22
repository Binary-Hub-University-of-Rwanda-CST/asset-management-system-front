import axios  from 'axios';
import { Dispatch } from 'redux';
import axiosInstance from "../utils/axiosInstance";
import { CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, RESET_CHANGE_PASSWORD_STATE } from './types';

export const changePasswordRequest = () => ({ type: CHANGE_PASSWORD_REQUEST });
export const changePasswordSuccess = (message: string) => ({ type: CHANGE_PASSWORD_SUCCESS, payload: message });
export const changePasswordFailure = (error: string) => ({ type: CHANGE_PASSWORD_FAILURE, payload: error });

export const changePassword = (oldPassword: string, newPassword: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(changePasswordRequest());
    try {
      const response = await axiosInstance.post(
        "/auth/changePassword",
        { oldPassword, newPassword } 
      );
      const message = response.data.message; // Extract message from response
      dispatch(changePasswordSuccess(message));
    } catch (error) {
      let errorMessage = 'Something went wrong';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage; // Extract message from error response
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(changePasswordFailure(errorMessage));
    }
  };
};

export const resetChangePasswordState = () => ({
  type: RESET_CHANGE_PASSWORD_STATE
});
