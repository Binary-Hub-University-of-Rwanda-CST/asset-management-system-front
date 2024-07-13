// validatedData.reducer.ts
import {
    SAVE_VALIDATED_DATA,
    SEND_VALIDATED_DATA_REQUEST,
    SEND_VALIDATED_DATA_SUCCESS,
    SEND_VALIDATED_DATA_FAILURE,
  } from "../actions/types";
  
  export interface ValidatedDataState {
    validatedData: Record<string, any>[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ValidatedDataState = {
    validatedData: [],
    loading: false,
    error: null,
  };
  
  const validatedDataReducer = (state = initialState, action: any): ValidatedDataState => {
    switch (action.type) {
      case SAVE_VALIDATED_DATA:
        return {
          ...state,
          validatedData: action.payload,
        };
      case SEND_VALIDATED_DATA_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SEND_VALIDATED_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
        };
      case SEND_VALIDATED_DATA_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default validatedDataReducer;
  