import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { API_URL } from "../utils/api";
import { APP_TOKEN_NAME, setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/functions";
import { UserAccessList } from "../config/userAccess";
import { AnyAction } from "redux"; 
import axiosInstance from "../utils/axiosInstance";
import { ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

/**
 * * ******************************  AUTH INTERFACES *****************************
 */

export enum BooleanEnum {
  TRUE = "TRUE",
  FALSE = "FALSE",
}

export enum UserActiveStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}

export enum GenderEnum {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum MartialStatusEnum {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
}

export interface PermissionInterface {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
  export: boolean;
}


const token = localStorage.getItem(APP_TOKEN_NAME);


interface UserItemInterface {
  id: string;
  names: string;
  phone: string;
  email: string;
  password: string;
  location: {
    building: 
    { 
      id: string; 
      name: string
     };
    room: {
       id: string; 
       name: string 
      };
    status: 'ACTIVE' | 'INACTIVE';
  }[];
  
  is_line_manager: boolean;
  occupation_address: {
    id: string;
    name: string;
    type: 'DEPARTMENT' | 'SCHOOL' | 'COLLEGE' | 'CAMPUS' | 'UR';
    parent_id: string | null;
  };
  report_to: string;
  role: {
    id: string;
    name: string;
    access: string[];
  };
  custom_access: string[];
}


// export interface UserInterface {
//   token: string;
//  user: UserItemInterface;
//   role: UserRoleInterface | undefined ;
// }
export interface userRoleInterface{
id:string,
name:string
access:any
}
export interface UserInterface {
  token: TokenInterface;
  user: UserItemInterface;
  role?: userRoleInterface;
}

export interface TokenInterface {
  access?: {
    token: string;
    expires: Date;
  }
} 
export interface Access{
  token: string;
  expires: Date;
}

export interface Auth {
  loading: boolean;
  isAuthenticated: boolean;
  token: string;
  user: UserItemInterface | null;
}

//* ********************** ACTION TYPE INTERCACES ********************** */
export interface FetchLoginDetails {
  type: ActionTypes.LOGIN_DETAILS;
  payload: Auth;
}

export interface LoginSuccessDetails {
  type: ActionTypes.USER_LOGIN_SUCCESS_DATA;
  payload: {
    data: UserInterface;
    // token: string;
  };
}

export interface LogoutUser {
  type: ActionTypes.LOGOUT;
} 
 
/**
 * * ****************************** AUTH  ACTIONS *****************************
 */

/**
 * @description Register the account to the api
 * @param account
 * @param MsgHandler return the error from the API
 * @returns
 */



export const FC_Login = (data: { email: string; password: string }, callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<{ message: string; data: UserInterface }>(`${API_URL}/auth/login`, data);
      console.log("Login Response:", res.data);

      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {data: res.data.data} 
      });

      // Store token in localStorage (adjust this based on the actual token structure)
      localStorage.setItem(APP_TOKEN_NAME, res.data.data.token.access?.token || '');

        // Store user data in localStorage
        localStorage.setItem('ams_userData', JSON.stringify(res.data.data)); 

      callback(true, "");
    } catch (error: any) {
      console.error("Login Error:", error);
      callback(false, errorToText(error));
    }
  };
}; 

/**
 * @description Check if the user is logged in based on the token stored in local storage
 * @param callBack Callback function to handle authentication status
 * @returns ThunkAction for Redux
 */
export const FC_CheckLoggedIn = (callBack: (status: boolean) => void): ThunkAction<void, RootState, unknown, any> => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem(APP_TOKEN_NAME);

    if (!token) {
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
      callBack(false);
      return;
    }

    try {
      setAxiosToken(); // Set the Authorization header for axios
      const res = await axiosInstance.post<UserInterface>(`${API_URL}/auth/current`); // Adjust the endpoint based on your API
      console.log({ logged_user_details: res.data });

      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: {
            token: res.data.token,
            role: res.data.role,
            user: res.data.user,
          },
        },
      });
      callBack(true);
    } catch (error: any) {
      console.log("User not logged in: ", error);
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
      callBack(false);
    }
  };
};
/**
 * @description Logout the user from the system
 * @returns null
 */
export const FC_Logout = (): AnyAction => {
  localStorage.removeItem(APP_TOKEN_NAME);
  localStorage.removeItem('ams_userData'); 
  return { type: ActionTypes.LOGOUT };
};