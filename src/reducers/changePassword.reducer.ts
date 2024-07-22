import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  RESET_CHANGE_PASSWORD_STATE,
} from "../actions/types";

export interface ChangePasswrdState {
  success: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ChangePasswrdState = {
  loading: false,
  success: false,
  error: null,
};

const changePasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, success: true, error: null };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    // In your changePassword.reducer.ts file
    case RESET_CHANGE_PASSWORD_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default changePasswordReducer;
