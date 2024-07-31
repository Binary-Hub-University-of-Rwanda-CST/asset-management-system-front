import axios from 'axios';
import { Dispatch, Action } from 'redux';

export const UPDATE_ASSET_REQUEST = 'UPDATE_ASSET_REQUEST';
export const UPDATE_ASSET_SUCCESS = 'UPDATE_ASSET_SUCCESS';
export const UPDATE_ASSET_FAILURE = 'UPDATE_ASSET_FAILURE';

interface UpdateAssetRequestAction extends Action {
  type: typeof UPDATE_ASSET_REQUEST;
}

interface UpdateAssetSuccessAction extends Action {
  type: typeof UPDATE_ASSET_SUCCESS;
  payload: any;
}

interface UpdateAssetFailureAction extends Action {
  type: typeof UPDATE_ASSET_FAILURE;
  payload: string;
}

export const updateAssetRequest = (): UpdateAssetRequestAction => ({
  type: UPDATE_ASSET_REQUEST
});

export const updateAssetSuccess = (data: any): UpdateAssetSuccessAction => ({
  type: UPDATE_ASSET_SUCCESS,
  payload: data
});

export const updateAssetFailure = (error: string): UpdateAssetFailureAction => ({
  type: UPDATE_ASSET_FAILURE,
  payload: error
});

export type UpdateAssetActionTypes = 
  | UpdateAssetRequestAction
  | UpdateAssetSuccessAction
  | UpdateAssetFailureAction;

export const updateAsset = (assetData: Record<string, any>) => {
  return async (dispatch: Dispatch<UpdateAssetActionTypes>) => {
    dispatch(updateAssetRequest());
    try {
      const response = await axios.put(
        'https://ur-assets-management-system-backend.onrender.com/api/v1/asset/update',
        assetData
      );
      dispatch(updateAssetSuccess(response.data));
    } catch (error) {
      dispatch(updateAssetFailure((error as Error).message));
    }
  };
}; 