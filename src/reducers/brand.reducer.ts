
import { FETCH_BRANDS_REQUEST, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_FAILURE } from '../actions/types';
import { Brand } from '../actions/brand.action';

export interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandState = {
  brands: [],
  loading: false,
  error: null,
};

const brandReducer = (state = initialState, action: any): BrandState => {
  switch (action.type) {
    case FETCH_BRANDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        brands: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BRANDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducer;
