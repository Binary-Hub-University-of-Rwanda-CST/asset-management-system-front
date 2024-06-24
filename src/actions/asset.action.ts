import { Dispatch } from 'redux';
import { FETCH_ASSETS_REQUEST, FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE } from './types';
import { API_URL } from '../utils/api';


// export interface Asset {
//     asset_id: string;
//     category_id: string;
//     brand_id: string;
//     stock_id: string;
//     supplier_id: string;
//     purchase_order_number: string;
//     value: number;
//     life_span_years: number;
//     date_in: string;
//     category: AssetCategory;
//     brand: Brand;
//     stock: Stock;
//     supplier: Supplier;
//   }
  
//   export interface AssetCategory {
//     asset_category_id: string;
//     category_name: string;
//     specifications: Specification[];
//   }
  
//   export interface Specification {
//     id: string;
//     name: string;
//     values: string[];
//     category_id: string;
//   }
  
//   export interface Brand {
//     id: string;
//     name: string;
//   }
  
//   export interface Stock {
//     id: string;
//     name: string;
//   }
  
//   export interface Supplier {
//     id: string;
//     name: string;
//   }


  /**
 * * ****************************** ASSET INTERFACES *****************************
 */
  export interface AssetCategory {
    id: string;
    name: string;
}

export interface AssetSpecification {
    name: string;
    value: string;
}

export interface Asset {
  [key: string]: string ; 
}

export interface Stock {
    id: string;
    name: string;
    location: string;
    asset: Asset[];
}

export interface Assets {
    category: AssetCategory;
    stock: Stock[];
}

//  asset actions.ts


export const fetchAssets = () => async (dispatch: Dispatch) => {
  dispatch({ type: FETCH_ASSETS_REQUEST });

  try {
    const response = await fetch(`${API_URL}/asset/customized`); 
    // console.log(response); 
    
    if (!response.ok) {
      throw new Error('Failed to fetch assets');
    }
    const data = await response.json();
    dispatch({ type: FETCH_ASSETS_SUCCESS, payload: data });
  } catch (error: unknown) {
    dispatch({ type: FETCH_ASSETS_FAILURE, payload: (error as Error).message });
  }
};

 