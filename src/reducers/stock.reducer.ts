// src/reducers/stock.reducer.ts
import {
    FETCH_STOCKS_REQUEST,
    FETCH_STOCKS_SUCCESS,
    FETCH_STOCKS_FAILURE,
  } from '../actions/types';
   import { Stock } from '../actions/stock.action'; 
   
  export interface StockState {
    stocks: Stock[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: StockState = {
    stocks: [],
    loading: false,
    error: null,
  };
  
  const stockReducer = (state = initialState, action: any): StockState => {
    switch (action.type) {
      case FETCH_STOCKS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_STOCKS_SUCCESS:
        return {
          ...state,
          stocks: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_STOCKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default stockReducer;
  