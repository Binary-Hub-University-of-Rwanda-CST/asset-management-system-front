// specification.actions.ts

import { Dispatch } from 'redux';
import { API_URL } from '../utils/api';
import { AssetSpecification } from '../utils/uploadSpecification';
import { FETCH_UPLOAD_SPECIFICATION_REQUEST, FETCH_UPLOAD_SPECIFICATION_FAILURE, FETCH_UPLOAD_SPECIFICATION_SUCCESS } from './types';

// Local asset specifications
import assetSpecifications from '../utils/uploadSpecification';// Adjust the path based on your file structure

// Action creators
export const fetchSpecifications = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: FETCH_UPLOAD_SPECIFICATION_REQUEST });

        try {
            let data: AssetSpecification[] = [];

            // Use local specifications first
            data = assetSpecifications;

            // Simulate API delay (remove this in production)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Optionally, fetch from API if needed
            // const response = await fetch(`${API_URL}/specification/all`);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch specifications');
            // }
            // data = await response.json();

            dispatch({ type: FETCH_UPLOAD_SPECIFICATION_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_UPLOAD_SPECIFICATION_FAILURE,  payload: (error as Error).message });
        }
    };
};
