import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { API_URL, DISTRICTS_LOCATION } from "../utils/api";
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

export interface DistrictLocationItem {
  district_code: string;
  district_name: string;
  province_id: string;
  province_code: string;
  _id: string;
}
export interface ProvinceLocationItem {
  province_code: string;
  province_name: string;
  _id: string;
}
export interface SectorLocationItem {
  district_id: string;
  sector_code: string;
  sector_name: string;
  district_code: string;
  _id: string;
}
export interface CountryLocationItem {
  country_code: string;
  country_name: string;
  code: string;
}
export interface LocationAPI {
  districts: DistrictLocationItem[];
  provinces: ProvinceLocationItem[];
  sectors: SectorLocationItem[];
  countries: CountryLocationItem[];
}

export interface SchoolInterface {
  school_code: string;
  school_name: string;
}

const token = localStorage.getItem(APP_TOKEN_NAME);

export interface UserItemInterface {
  full_name: string;
  sex: string | null;
  dob: string | null;
  marital_status: string | null;
  nid: string | null;
  email: string | null;
  phone_numbers: string;
  user_id: string;
  username: string;
  created_by: string;
  created_at: string;
  updated_by: string | null;
  updated_at: string;
  archive: string;
  archive_by: string | null;
  archive_at: string | null;
  status: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
}

export interface UserInterface {
  jwt: string;
  user_info: UserItemInterface;
  role: UserRoleInterface | undefined;
  country: CountryLocationItem | null;
  district: DistrictLocationItem | null;
  sector: SectorLocationItem | null;
  school: any | null;
  stakeholder: any | null;
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
      localStorage.setItem(APP_TOKEN_NAME, res.data.jwt);
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: {
            country: res.data.country,
            district: res.data.district,
            jwt: res.data.jwt,
            role:
              res.data.role === undefined
                ? undefined
                : {
                    access: res.data.role.access
                      .toString()
                      .split(",") as UserAccessList[],
                    role_id: res.data.role?.role_id,
                    role: res.data.role?.role,
                  },
            school: res.data.school,
            sector: res.data.sector,
            stakeholder: res.data.stakeholder,
            user_info: res.data.user_info,
          },
          token: res.data.jwt,
        },
      });
      dispatch<SetSystemSuccessMessageAction>({
        type: ActionTypes.SET_SYSTEM_SUCCESS_MESSAGE,
        payload:
          "Welcome dear " +
          res.data.user_info.first_name +
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
        `${API_URL}/user/current/info`
      );
      console.log({ logged_user_details: res.data });
      dispatch<LoginSuccessDetails>({
        type: ActionTypes.USER_LOGIN_SUCCESS_DATA,
        payload: {
          data: {
            country: res.data.country,
            district: res.data.district,
            jwt: res.data.jwt,
            role:
              res.data.role === undefined
                ? undefined
                : {
                    access: res.data.role.access
                      .toString()
                      .split(",") as UserAccessList[],
                    role_id: res.data.role?.role_id,
                    role: res.data.role?.role,
                  },
            school: res.data.school,
            sector: res.data.sector,
            stakeholder: res.data.stakeholder,
            user_info: res.data.user_info,
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

export const FC_GetLocationsDetails = async (
  callBack: (
    loading: boolean,
    res: {
      data: LocationAPI | null;
      type: "Error" | "Success";
      msg: string;
    } | null
  ) => void
) => {
  // callBack(true, null);
  try {
    const res = await axios.get<LocationAPI>(`${DISTRICTS_LOCATION}`);
    callBack(false, {
      data: res.data,
      msg: "",
      type: "Success",
    });
  } catch (error: any) {
    callBack(false, {
      data: null,
      msg: errorToText(error),
      type: "Error",
    });
  }
};
