import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { API_URL } from "../utils/api";
import { APP_TOKEN_NAME, setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/functions";
import {
  SetSystemSuccessMessageAction,
  UserRoleInterface,
} from "./system.action";
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

// export interface UserItemInterface {
//   full_name: string;
//   sex: string | null;
//   dob: string | null;
//   nid: string | null;
//   email: string | null;
//   phone_numbers: string;
//   user_id: string;
//   username: string;
//   created_by: string;
//   created_at: string;
//   updated_by: string | null;
//   updated_at: string;
//   status: string;
//   first_name: string | null;
//   middle_name: string | null;
//   last_name: string | null;
// }

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
export interface UserInterface {
  token: TokenInterface;
 user: UserItemInterface;
  role: UserRoleInterface | undefined ;
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
  user: UserInterface | null;
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
    token: string;
  };
}

export interface LogoutUser {
  type: ActionTypes.LOGOUT;
}

export interface FetchLoginDetails {
  type: ActionTypes.LOGIN_DETAILS;
  payload: Auth;
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

export const FC_Login = (
  data: {
    username: string;
    password: string;
  },
  CallbackFunc: Function
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<UserInterface>(
        `${API_URL}/user/account/login`,
        data
      );
      console.log({ data_after_login: res.data });
      localStorage.setItem(APP_TOKEN_NAME, res.data.token.access.token);
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: {
            token: res.data.token,
            role:
              res.data.role === undefined
                ? undefined
                : {
                  access: res.data.role.access?.toString().split(",") as UserAccessList[],
                    role_id: res.data.role?.role_id,
                    role: res.data.role?.role,
                  },
           user: res.data.user,
          },
          token: res.data.token.access.token,
        },
      });
      dispatch<SetSystemSuccessMessageAction>({
        type: ActionTypes.SET_SYSTEM_SUCCESS_MESSAGE,
        payload:
          "Welcome dear " +
          res.data.user.names +
          " You have successfully logged In",
      });
      CallbackFunc(true, "");
    } catch (error: any) {
      CallbackFunc(false, errorToText(error));
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
            role:
              res.data.role?.role === undefined
                ? undefined
                : {
                  access: res.data.role.access?.toString().split(",") as UserAccessList[],
                    role_id: res.data.role?.role_id,
                    role: res.data.role?.role,
                  },
           user: res.data.user,
          },
          token: token!,
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

