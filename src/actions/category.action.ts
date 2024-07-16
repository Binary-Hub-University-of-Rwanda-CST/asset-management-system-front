
import { Dispatch } from 'redux';
import axios from 'axios';
import { API_URL } from '../utils/api';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from './types';

export interface Category {
  id: string;
  name: string;
  specifications: any[];
}

export const fetchCategories = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });

  try {
    const response = await axios.get(`${API_URL}/asset/category/all`);  
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data });
  } catch (error: unknown) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: (error as Error).message });
  }
};
