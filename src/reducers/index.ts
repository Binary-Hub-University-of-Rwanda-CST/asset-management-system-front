import { combineReducers } from "redux";
import { Auth, System } from "../actions";
import { authReducer } from "./auth.reducer";
import { systemReducer } from "./system.reducer";
import assetReducer, { AssetState } from "./asset.reducer";
  import validationDataReducer,{ValidationDataState} from "./validationDataReducer";
  import specificationReducer, {SpecificationState} from "./specification.reducer";

// define the entire state into the entire side
export interface StoreState {
  auth: Auth;
  system: System;
  asset:AssetState;
  uploadSpecificaiton: SpecificationState
  validation: ValidationDataState
  
}

export const rootReducers = combineReducers<StoreState>({
  auth: authReducer,
  system: systemReducer,
  asset: assetReducer,
  uploadSpecificaiton: specificationReducer,
  validation: validationDataReducer
});
