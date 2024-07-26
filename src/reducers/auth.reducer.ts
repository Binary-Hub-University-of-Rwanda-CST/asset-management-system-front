import { Auth, Action, ActionTypes } from "../actions";
import { APP_TOKEN_NAME } from "../utils/AxiosToken";




const getInitialState = (): Auth => {
  const token = localStorage.getItem(APP_TOKEN_NAME);
  const userData = localStorage.getItem('ams_userData');  

  if (token && userData) {
    const parsedUserData = JSON.parse(userData);
    return {
      user: parsedUserData.user,
      loading: false,
      isAuthenticated: true,
      token: token,
    };
  }

  return {
    user: null,
    loading: true,
    isAuthenticated: false,
    token: "",
  };
}; 

export const defaultState: Auth = getInitialState();

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
        token: action.payload.data.token?.access?.token || '', 
        loading: false,
        isAuthenticated: true,
      };
    case ActionTypes.LOGOUT:
      localStorage.removeItem(APP_TOKEN_NAME);
      localStorage.removeItem('ams_userData');
      return {
        ...defaultState,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};