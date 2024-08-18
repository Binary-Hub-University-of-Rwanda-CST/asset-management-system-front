import axios from 'axios';
import { Dispatch, Action } from 'redux';
import { API_URL } from '../utils/api';
import axiosInstance from '../utils/axiosInstance';
import { AssetInterface } from '../containers/StockManagement/Components/DataTable';

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

export const updateAsset = (assets: AssetInterface[]) => {
  return async (dispatch: Dispatch<UpdateAssetActionTypes>) => {
    dispatch(updateAssetRequest());
    try {
      const response = await axiosInstance.put(
        `${API_URL}/asset/update`,
        assets // Send array of AssetInterface objects
      );
      dispatch(updateAssetSuccess(response.data));
    } catch (error) {
      dispatch(updateAssetFailure((error as Error).message));
    }
  };
}; 
 