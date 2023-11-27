import { LoginSuccessDetails, LogoutUser } from "./auth.action";
import {
  SetSystemErrorMessageAction,
  SetSystemSuccessMessageAction,
} from "./system.action";

export enum ActionTypes {
  LOGIN_DETAILS = "LOGIN_DETAILS",
  USER_LOGIN_SUCCESS_DATA = "USER_LOGIN_SUCCESS_DATA",
  LOGOUT = "LOGOUT",
  SET_SYSTEM_ERROR_MESSAGE = "SET_SYSTEM_ERROR_MESSAGE",
  SET_SYSTEM_SUCCESS_MESSAGE = "SET_SYSTEM_SUCCESS_MESSAGE",
}

export type Action =
  | LoginSuccessDetails
  | LogoutUser
  | SetSystemErrorMessageAction
  | SetSystemSuccessMessageAction;
