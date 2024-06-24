
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
  } from '../actions/types';
  import { Category } from '../actions/category.action'; 
  
  export interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action: any): CategoryState => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          categories: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  