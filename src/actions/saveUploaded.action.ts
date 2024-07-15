import { Dispatch } from "redux";
import {
  SAVE_VALIDATED_DATA,
  SEND_VALIDATED_DATA_REQUEST,
  SEND_VALIDATED_DATA_SUCCESS,
  SEND_VALIDATED_DATA_FAILURE,
} from "./types";

import { API_URL } from "../utils/api"; 
 
export const saveValidatedData = (data: Record<string, any>[]) => {
  localStorage.setItem("validatedAssetsData", JSON.stringify(data));
  return {
    type: SAVE_VALIDATED_DATA,
    payload: data,
  };
};


export const sendValidatedData = (data: Record<string, any>[]) => async (dispatch: Dispatch) => {
  dispatch({ type: SEND_VALIDATED_DATA_REQUEST });

  try {
    const response = await fetch(`${API_URL}/asset/add`, { 
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to save data to backend");
    }

    const result = await response.json();
    dispatch({ type: SEND_VALIDATED_DATA_SUCCESS, payload: result });
      // Remove validated data from local storage upon success
      localStorage.removeItem("validatedAssetsData"); 
  } catch (error: unknown) {
    dispatch({ type: SEND_VALIDATED_DATA_FAILURE, payload: (error as Error).message });
    throw error; // Ensure the error is re-thrown to be caught in the component
  }
};
 
