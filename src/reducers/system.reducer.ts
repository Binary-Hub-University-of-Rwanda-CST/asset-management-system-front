import { Action, ActionTypes, System } from "../actions";
// default state
const defaultState: System = {
  access_details: null,
  error: "",
  success: "",
  roles: null,
  side_nav: false,
};

/**
 * this is the
 * @param state
 * @param action
 * @returns
 */
export const systemReducer = (state: System = defaultState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_SYSTEM_SUCCESS_MESSAGE:
      return {
        ...state,
        success: action.payload,
      };
    case ActionTypes.SET_SYSTEM_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...defaultState,
        loading: false,
      };
    default:
      return state;
  }
};
