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


 /*
                *ASSET  TYPES
                @codeWithEdison
*/
export const FETCH_ASSETS_REQUEST = 'FETCH_ASSETS_REQUEST';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';


/*
                *CATEGORY TYPES
                @codeWithEdison
                
*/
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

/*
                *STOCKS TYPES
                 @codeWithEdison
*/
export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST';
export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';

/*
                *BRAND TYPES
                @codeWithEdison
                
*/
export const FETCH_BRANDS_REQUEST = 'FETCH_BRANDS_REQUEST';
export const FETCH_BRANDS_SUCCESS = 'FETCH_BRANDS_SUCCESS';
export const FETCH_BRANDS_FAILURE = 'FETCH_BRANDS_FAILURE';

/*
                *VALIDATION DATA  TYPES
                @codeWithEdison
                
*/
export const FETCH_VALIDATION_DATA_REQUEST = 'FETCH_VALIDATION_DATA_REQUEST';
export const FETCH_VALIDATION_DATA_SUCCESS = 'FETCH_VALIDATION_DATA_SUCCESS';
export const FETCH_VALIDATION_DATA_FAILURE = 'FETCH_VALIDATION_DATA_FAILURE';
