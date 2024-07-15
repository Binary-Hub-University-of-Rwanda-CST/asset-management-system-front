import { Dispatch } from 'redux';
import { FETCH_ASSETS_REQUEST, FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE } from './types';
import { API_URL } from '../utils/api';




  /**
 * * ****************************** ASSET INTERFACES *****************************
 */
  export interface Identifiable {
    id: string;
    name: string;
}

export interface AssetCategory extends Identifiable {}

export interface Asset {
    current_value: number;
    [specification: string]: string | number ; 
}

export interface Room extends Identifiable {
    floor: string;
    assets: Asset[];
}

export interface Building extends Identifiable {
    rooms: Room[];
}

export interface Assets {
    category: AssetCategory;
    buildings: Building[];
}

 
//  asset actions.ts

export const fetchAssets = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ASSETS_REQUEST });

  try {
    const response = await fetch(`${API_URL}/asset/all`); 
    
    if (!response.ok) {
      throw new Error('Failed to fetch assets');
    }
    
    const data = await response.json();
    dispatch({ type: FETCH_ASSETS_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: FETCH_ASSETS_FAILURE, payload: (error as Error).message });
  }
};


 
