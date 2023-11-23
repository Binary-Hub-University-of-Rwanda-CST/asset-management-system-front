// combination of Reducers 
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import assetReducer from './assetReducer';

const rootReducer = combineReducers({
  user: userReducer,
  asset: assetReducer,
  // Add other reducers here as our project grows
});

export default rootReducer;
