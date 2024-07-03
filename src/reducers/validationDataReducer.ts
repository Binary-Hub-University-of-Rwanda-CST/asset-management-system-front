import { FETCH_VALIDATION_DATA_REQUEST, FETCH_VALIDATION_DATA_SUCCESS, FETCH_VALIDATION_DATA_FAILURE } from '../actions/types';
import { ValidationData } from '../actions/validationData.actions';

export interface ValidationDataState {
  validationData: ValidationData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ValidationDataState = {
  validationData: null,
  loading: false,
  error: null,
};

const validationDataReducer = (state = initialState, action: any): ValidationDataState => {
  switch (action.type) {
    case FETCH_VALIDATION_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VALIDATION_DATA_SUCCESS:
      return {
        ...state,
        validationData: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_VALIDATION_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default validationDataReducer;
