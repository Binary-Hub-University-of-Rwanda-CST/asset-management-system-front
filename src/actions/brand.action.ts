
import { Dispatch } from 'redux';
import { FETCH_BRANDS_REQUEST, FETCH_BRANDS_SUCCESS, FETCH_BRANDS_FAILURE } from './types';
import { API_URL } from '../utils/api';

export interface Brand {
  id: string;
  name: string;
}

export const fetchBrands = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_BRANDS_REQUEST });

  try {
    const response = await fetch(`${API_URL}/asset/brand/all`); 

    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }

    const data: Brand[] = await response.json();
    dispatch({ type: FETCH_BRANDS_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: FETCH_BRANDS_FAILURE, payload: (error as Error).message });
  }
};
