// src/redux/reducers/passwordResetReducer.ts

import { 
    REQUEST_RESET_CODE, 
    VERIFY_RESET_CODE, 
    UPDATE_PASSWORD,
    REQUEST_RESET_CODE_ERROR
  } from '../actions/types'; 

  export interface PasswordResertState{
    resetCodeRequested: boolean,
    resetCodeVerified:boolean,
    passwordUpdated:boolean,
    token: null |String ,
    error: null | String
  }
  
  const initialState: PasswordResertState = {
    resetCodeRequested: false,
    resetCodeVerified: false,
    passwordUpdated: false,
    token: null,
    error: null
  };
  
  const passwordResetReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case REQUEST_RESET_CODE:
        return {
          ...state,
          resetCodeRequested: true,
          error: null
        };
      case VERIFY_RESET_CODE:
        return {
          ...state,
          resetCodeVerified: true,
          token: action.payload.token,
          error: null
        };
      case UPDATE_PASSWORD:
        return {
          ...state,
          passwordUpdated: true,
          error: null
        };
        case REQUEST_RESET_CODE_ERROR:
      return {
        ...state,
        resetCodeRequested: false,
        error: action.payload
      }; 
      default:
        return state;
    }
  };
  
  export default passwordResetReducer;