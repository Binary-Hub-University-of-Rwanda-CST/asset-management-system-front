import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { API_URL } from "../utils/api";
import { APP_TOKEN_NAME, setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/functions";
// import { SetSystemSuccessMessageAction, UserRoleInterface,} from "./system.action";
import { UserAccessList } from "../config/userAccess";

/**
 * * ****************************** INTERFACES *****************************
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
    building: { id: string; name: string };
    room: { id: string; name: string };
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
  role: userRoleInterface | undefined ;
}
export interface TokenInterface{
  access: Access
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
 * * ****************************** ACTIONS *****************************
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
      const res = await axios.post<UserInterface>(`${API_URL}/auth/login`, data);
      console.log("Login Response:", res.data); // Log the response data

      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: {
            token: res.data.token,
            user: res.data.user,
            role: res.data.role === undefined ? undefined : {
              access: res.data.role.access?.toString().split(",") as UserAccessList[],
              id: res.data.role?.id,
              name: res.data.role.name,
            },
          },
        },
      });

      callback(true, "");
    } catch (error: any) {
      console.error("Login Error:", error); // Log the error for debugging
      callback(false, errorToText(error));
    }
  };
};


/**
 * @description Check if the user is logged in based on the logged in account
 * @param account
 * @param MsgHandler return the error from the API
 * @returns
 */
export const FC_CheckLoggedIn = (callBack: (status: boolean) => void) => {
  callBack(false);
  return async (dispatch: Dispatch) => {
    if (token === null) {
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
      callBack(true);
      return false;
    }
    try {
      setAxiosToken();
      const res = await axios.get<UserInterface>(
        `${API_URL}/auth/login`
      );
      console.log({ logged_user_details: res.data });
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: {
            token: res.data.token,
            role: res.data.role?.name === undefined
              ? undefined
              : {
                  access: res.data.role.access?.toString().split(",") as UserAccessList[],
                  id: res.data.role?.id,
                  name: res.data.role.name,
                },
            user: res.data.user,
          },
        },
      });
      callBack(true);
    } catch (error: any) {
      callBack(true);
      console.log("User not: ", { ...error });
      dispatch<LogoutUser>({
        type: ActionTypes.LOGOUT,
      });
    }
  };
};

/**
 * @description Logout the user into the system
 * @returns null
 */
export const FC_Logout = () => {
  return (dispatch: Dispatch) => {
    dispatch<LogoutUser>({
      type: ActionTypes.LOGOUT,
    });
  };
};

