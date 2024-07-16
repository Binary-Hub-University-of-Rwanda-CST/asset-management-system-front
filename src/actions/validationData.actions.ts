import { Dispatch } from 'redux';
import { FETCH_VALIDATION_DATA_REQUEST, FETCH_VALIDATION_DATA_SUCCESS, FETCH_VALIDATION_DATA_FAILURE } from './types';
import { API_URL } from '../utils/api';

export interface Specification {
  name: string;
  values: string[];
}

export interface Category {
  id: string;
  name: string;
  specification: Specification[];
}

export interface Room {
  id: string;
  name: string;
  floor: string;
}

export interface Building {
  id: string;
  name: string;
  rooms: Room[];
}

export interface ValidationData {
  category: Category[];
  building: Building[];
}

export const fetchValidationData = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_VALIDATION_DATA_REQUEST });

  try {
    const response = await fetch(`${API_URL}/asset/validationData`);

    if (!response.ok) {
      throw new Error('Failed to fetch validation data');
    }

    const data: ValidationData = await response.json();
    dispatch({ type: FETCH_VALIDATION_DATA_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: FETCH_VALIDATION_DATA_FAILURE, payload: (error as Error).message });
  }
};
