import { 
  UPDATE_ASSET_REQUEST, 
  UPDATE_ASSET_SUCCESS, 
  UPDATE_ASSET_FAILURE, 
  UpdateAssetActionTypes 
} from '../actions/updateAssets.action';

interface AssetState {
  loading: boolean;
  error: string | null;
  asset: any | null;
}

const initialState: AssetState = {
  loading: false,
  error: null,
  asset: null,
};

export const assetReducer = (
  state = initialState, 
  action: UpdateAssetActionTypes
): AssetState => {
  switch (action.type) {
    case UPDATE_ASSET_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ASSET_SUCCESS:
      return { ...state, loading: false, asset: action.payload };
    case UPDATE_ASSET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}; 