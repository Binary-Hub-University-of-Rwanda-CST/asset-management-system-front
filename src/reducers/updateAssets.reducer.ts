// reducers/updateAsset.reducer.ts
import { 
  UPDATE_ASSET_REQUEST, 
  UPDATE_ASSET_SUCCESS, 
  UPDATE_ASSET_FAILURE,
  CLEAR_UPDATE_ERROR,
  UpdateAssetActionTypes 
} from '../actions/updateAssets.action';
import { ApiError, UpdateAssetResponse } from '../actions/updateAssets.action'; 

export interface UpdateAssetState {
  loading: boolean;
  error: ApiError | null;
  data: UpdateAssetResponse | null;
  lastUpdated: number | null;
}

const initialState: UpdateAssetState = {
  loading: false,
  error: null,
  data: null,
  lastUpdated: null
};

export const updateAssetReducer = (
  state = initialState, 
  action: UpdateAssetActionTypes
): UpdateAssetState => {
  switch (action.type) {
    case UPDATE_ASSET_REQUEST:
      return { 
        ...state, 
        loading: true,
        error: null 
      };

    case UPDATE_ASSET_SUCCESS:
      return { 
        ...state, 
        loading: false,
        error: null,
        data: action.payload,
        lastUpdated: Date.now()
      };

    case UPDATE_ASSET_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload,
        data: null
      };

    case CLEAR_UPDATE_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};