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

/*
                *UPLOAD  SPECIFICATION  DATA  TYPES
                @codeWithEdison
                
*/
export const FETCH_UPLOAD_SPECIFICATION_REQUEST = 'FETCH_UPLOAD_SPECIFICATION_REQUEST';
export const FETCH_UPLOAD_SPECIFICATION_SUCCESS = 'FETCH_UPLOAD_SPECIFICATION_SUCCESS';
export const FETCH_UPLOAD_SPECIFICATION_FAILURE = 'FETCH_UPLOAD_SPECIFICATION_FAILURE';

/*
                *UPLOAD  SPECIFICATION  DATA  TYPES
                @codeWithEdison
                
*/
export const SAVE_VALIDATED_DATA = "SAVE_VALIDATED_DATA";
export const DELETE_ALL_VALIDATED_ASSETS = "DELETE_ALL_VALIDATED_ASSETS";
export const SEND_VALIDATED_DATA_REQUEST = "SEND_VALIDATED_DATA_REQUEST";
export const SEND_VALIDATED_DATA_SUCCESS = "SEND_VALIDATED_DATA_SUCCESS";
export const SEND_VALIDATED_DATA_FAILURE = "SEND_VALIDATED_DATA_FAILURE";
export const RESET_CHANGE_PASSWORD_STATE = 'RESET_CHANGE_PASSWORD_STATE';


/*
                *CHange password 
                @codeWithEdison
                
*/

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

/*
                *RESET PASSWORD
                @codeWithEdison
                
*/

export const REQUEST_RESET_CODE = 'REQUEST_RESET_CODE';
export const VERIFY_RESET_CODE = 'VERIFY_RESET_CODE';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'; 
export const REQUEST_RESET_CODE_ERROR = 'REQUEST_RESET_CODE_ERROR'; 