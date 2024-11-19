// actions/updateAssets.action.ts
import { Dispatch } from 'redux';
import { API_URL } from '../utils/api';
import axiosInstance from '../utils/axiosInstance';
import { AssetInterface } from '../containers/StockManagement/Components/DataTable';
import axios from 'axios';

// types/asset.types.ts
export interface UpdateAssetResponse {
  success: boolean;
  message: string;
  data?: AssetInterface[];
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
} 

// Action Types
export const UPDATE_ASSET_REQUEST = 'UPDATE_ASSET_REQUEST';
export const UPDATE_ASSET_SUCCESS = 'UPDATE_ASSET_SUCCESS';
export const UPDATE_ASSET_FAILURE = 'UPDATE_ASSET_FAILURE';
export const CLEAR_UPDATE_ERROR = 'CLEAR_UPDATE_ERROR';

// Action Interfaces
interface UpdateAssetRequestAction {
  type: typeof UPDATE_ASSET_REQUEST;
}

interface UpdateAssetSuccessAction {
  type: typeof UPDATE_ASSET_SUCCESS;
  payload: UpdateAssetResponse;
}

interface UpdateAssetFailureAction {
  type: typeof UPDATE_ASSET_FAILURE;
  payload: ApiError;
}

interface ClearUpdateErrorAction {
  type: typeof CLEAR_UPDATE_ERROR;
}

// Action Creators
export const updateAssetRequest = (): UpdateAssetRequestAction => ({
  type: UPDATE_ASSET_REQUEST
});

export const updateAssetSuccess = (data: UpdateAssetResponse): UpdateAssetSuccessAction => ({
  type: UPDATE_ASSET_SUCCESS,
  payload: data
});

export const updateAssetFailure = (error: ApiError): UpdateAssetFailureAction => ({
  type: UPDATE_ASSET_FAILURE,
  payload: error
});

export const clearUpdateError = (): ClearUpdateErrorAction => ({
  type: CLEAR_UPDATE_ERROR
});

export type UpdateAssetActionTypes = 
  | UpdateAssetRequestAction
  | UpdateAssetSuccessAction
  | UpdateAssetFailureAction
  | ClearUpdateErrorAction;



// Thunk Action
export const updateAsset = (assets: Pick<AssetInterface, Exclude<keyof AssetInterface, 'current_value'>>[]) => {
  return async (dispatch: Dispatch<UpdateAssetActionTypes>) => {
    dispatch(updateAssetRequest());

    try {
      // Remove current_value from each asset
      const cleanedAssets = assets.map(({ current_value, ...assetData }) => assetData);
      
      const response = await axiosInstance.put<UpdateAssetResponse>(
        `${API_URL}/asset/update`,
        cleanedAssets,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: '*/*'
          }
        }
      );

      dispatch(updateAssetSuccess(response.data));
      return response.data;
    } catch (error) {
      let errorMessage: ApiError = {
        message: 'An unexpected error occurred'
      };

      if (axios.isAxiosError(error)) {
        errorMessage = {
          message: error.response?.data?.message || 'Failed to update asset',
          status: error.response?.status,
          errors: error.response?.data?.errors
        };
      }

      dispatch(updateAssetFailure(errorMessage));
      throw errorMessage; // Throw for component-level handling
    }
  };
}; 