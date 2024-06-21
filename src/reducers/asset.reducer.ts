// reducers.ts
import { Assets } from '../actions/asset.action';
import { FETCH_ASSETS_REQUEST, FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE } from '../actions/types';

export interface AssetState {
  assets: Assets[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetState = {
  assets: [],
  loading: false,
  error: null,
};

const assetReducer = (state = initialState, action: any): AssetState => {
  switch (action.type) {
    case FETCH_ASSETS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}; 

export default assetReducer;
