
import { Dispatch } from 'redux';
import axios from 'axios';
import { API_URL } from '../utils/api'; 

import {
  FETCH_STOCKS_REQUEST,
  FETCH_STOCKS_SUCCESS,
  FETCH_STOCKS_FAILURE,
} from './types';

export interface Stock {
  id: string;
  name: string;
  location: string;
  created_at: string;
  updated_at: string;
}

export const fetchStocks = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_STOCKS_REQUEST });

  try {
    const response = await axios.get(`${API_URL}/asset/stock/all`); 
    dispatch({ type: FETCH_STOCKS_SUCCESS, payload: response.data });
  } catch (error: unknown) {
    dispatch({ type: FETCH_STOCKS_FAILURE, payload: (error as Error).message });
  }
};
