import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { UserAccessList } from "../config/userAccess";

/**
 * * ****************************** INTERFACES *****************************
 */

export interface UserRoleInterface {
  access: UserAccessList[];
  role_id: string;
  role: string;
}

export interface AccessListDetails {
  access_key: UserAccessList;
  access_name: string;
}

export interface System {
  side_nav: boolean;
  access_details: AccessListDetails[] | null;
  error: string;
  success: string;
  roles: UserRoleInterface[] | null;
}

//* ********************** ACTION TYPE INTERCACES ********************** */

export interface SetSystemErrorMessageAction {
  type: ActionTypes.SET_SYSTEM_ERROR_MESSAGE;
  payload: string;
}
export interface SetSystemSuccessMessageAction {
  type: ActionTypes.SET_SYSTEM_SUCCESS_MESSAGE;
  payload: string;
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

export const FC_SetError = (msg: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<SetSystemErrorMessageAction>({
      type: ActionTypes.SET_SYSTEM_ERROR_MESSAGE,
      payload: msg,
    });
  };
};
export const FC_SetSuccess = (msg: string) => {
  return async (dispatch: Dispatch) => {
    dispatch<SetSystemSuccessMessageAction>({
      type: ActionTypes.SET_SYSTEM_SUCCESS_MESSAGE,
      payload: msg,
    });
  };
};
