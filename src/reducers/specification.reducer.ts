// specification.reducer.ts

import { AssetSpecification } from '../utils/uploadSpecification';
import { FETCH_UPLOAD_SPECIFICATION_REQUEST, FETCH_UPLOAD_SPECIFICATION_SUCCESS, FETCH_UPLOAD_SPECIFICATION_FAILURE } from '../actions';

export interface SpecificationState {
    specifications: AssetSpecification[];
    loading: boolean;
    error: string | null;
}

const initialState: SpecificationState = {
    specifications: [],
    loading: false,
    error: null,
};

const specificationReducer = (state = initialState, action: any): SpecificationState => {
    switch (action.type) {
        case FETCH_UPLOAD_SPECIFICATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_UPLOAD_SPECIFICATION_SUCCESS:
            return {
                ...state,
                specifications: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_UPLOAD_SPECIFICATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default specificationReducer;
