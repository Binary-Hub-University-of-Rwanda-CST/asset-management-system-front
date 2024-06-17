import { combineReducers } from "redux";
import { Auth, System } from "../actions";
import { authReducer } from "./auth.reducer";
import { systemReducer } from "./system.reducer";
import { Asset } from "../actions";
import assetReducer, { AssetState } from "./asset.reducer";

// define the entire state into the entire side
export interface StoreState {
  auth: Auth;
  system: System;
  asset:AssetState;
}

export const rootReducers = combineReducers<StoreState>({
  auth: authReducer,
  system: systemReducer,
  asset: assetReducer
});
