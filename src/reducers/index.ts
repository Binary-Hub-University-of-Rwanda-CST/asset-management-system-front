import { combineReducers } from "redux";
import { Auth, System } from "../actions";
import { authReducer } from "./auth.reducer";
import { systemReducer } from "./system.reducer";
import assetReducer, { AssetState } from "./asset.reducer";
import specificationReducer, {
  SpecificationState,
} from "./specification.reducer";
import validatedDataReducer, { ValidatedDataState } from "./saveUpload.reducer";
import changePasswordReducer, {
  ChangePasswrdState,
} from "./changePassword.reducer";
import passwordResetReducer, {PasswordResertState} from "./passwordReset.reducer";
import { updateAssetReducer,UpdateAssetState  } from "./updateAssets.reducer";

// define the entire state into the entire side
export interface StoreState {
  auth: Auth;
  system: System;
  asset: AssetState;
  uploadSpecificaiton: SpecificationState;
  validatedData: ValidatedDataState;
  changePassword: ChangePasswrdState;
  passwordReset: PasswordResertState;
  updateAsset: UpdateAssetState
}

export const rootReducers = combineReducers<StoreState>({
  auth: authReducer,
  system: systemReducer,
  asset: assetReducer,
  uploadSpecificaiton: specificationReducer,
  validatedData: validatedDataReducer,
  changePassword: changePasswordReducer,
  passwordReset: passwordResetReducer,
  updateAsset : updateAssetReducer
}); 