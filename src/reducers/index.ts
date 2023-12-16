import { combineReducers } from "redux";
import { Auth, System } from "../actions";
import { authReducer } from "./auth.reducer";
import { systemReducer } from "./system.reducer";

// define the entire state into the entire side
export interface StoreState {
  auth: Auth;
  system: System;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  system: systemReducer,
});
