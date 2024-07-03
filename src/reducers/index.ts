import { combineReducers } from "redux";
import { Auth, System } from "../actions";
import { authReducer } from "./auth.reducer";
import { systemReducer } from "./system.reducer";
import assetReducer, { AssetState } from "./asset.reducer";
// import categoryReducer, {CategoryState} from "./category.reducer";
// import stockReducer, {StockState} from "./stock.reducer";
// import brandReducer, {BrandState} from "./brand.reducer";
  import validationDataReducer,{ValidationDataState} from "./validationDataReducer";

// define the entire state into the entire side
export interface StoreState {
  auth: Auth;
  system: System;
  asset:AssetState;
  // category: CategoryState
  // stock: StockState
  // brand: BrandState
  validation: ValidationDataState
  
}

export const rootReducers = combineReducers<StoreState>({
  auth: authReducer,
  system: systemReducer,
  asset: assetReducer,
  // category:categoryReducer, 
  // stock: stockReducer,
  // brand: brandReducer,
  validation: validationDataReducer
});
