// specification.actions.ts

import { Dispatch } from "redux";
import { API_URL } from "../utils/api";
import {
  FETCH_UPLOAD_SPECIFICATION_REQUEST,
  FETCH_UPLOAD_SPECIFICATION_FAILURE,
  FETCH_UPLOAD_SPECIFICATION_SUCCESS,
} from "./types";


export interface AssetSpecification {
  name: string;
  type: string;
  required: boolean;
  unique?: boolean;
  allowedValues?: string[];
}

export const fetchSpecifications = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_UPLOAD_SPECIFICATION_REQUEST });

    try {
      let data: AssetSpecification[] = [];
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await fetch(`${API_URL}/asset/validationData`);
      if (!response.ok) {
        throw new Error("Failed to fetch specifications");
      }
      data = await response.json();

      dispatch({ type: FETCH_UPLOAD_SPECIFICATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FETCH_UPLOAD_SPECIFICATION_FAILURE,
        payload: (error as Error).message,
      });
    }
  };
};
