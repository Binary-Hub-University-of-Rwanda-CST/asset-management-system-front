import { Auth, Action, ActionTypes } from "../actions";
import { APP_TOKEN_NAME } from "../utils/AxiosToken";

 export const defaultState: Auth = {
  user: null,
  loading: true,
  isAuthenticated: true,   
  token: "",
};

/**
 * this is the
 * @param state
 * @param action
 * @returns
 */
export const authReducer = (state: Auth = defaultState, action: Action): Auth => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN_SUCCESS_DATA:
      return {
        ...state,
        user: action.payload.data.user,
        token: action.payload.data.token.access.token,
        loading: false,
        isAuthenticated: true, // Set isAuthenticated based on login success
      };
    case ActionTypes.LOGOUT:
      localStorage.removeItem(APP_TOKEN_NAME);
      return {
        ...defaultState,
        loading: false,
      };
    default:
      return state;
  }
};
