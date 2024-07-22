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

    const result = await response.json();

    if (!response.ok) {
      // The server returned an error status
      let errorMessage = "An error occurred while saving data to the backend";
      
      // Check if the server sent a specific error message
      if (result && result.message) {
        errorMessage = result.message;
      } else if (result && result.error) {
        errorMessage = result.error;
      }
      
      throw new Error(errorMessage);
    }

    dispatch({ type: SEND_VALIDATED_DATA_SUCCESS, payload: result });
    // Remove validated data from local storage upon success
    localStorage.removeItem("validatedAssetsData"); 
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";
    
    if (error instanceof Error) {
      errorMessage = error.message; 
    }
    
    dispatch({ type: SEND_VALIDATED_DATA_FAILURE, payload: errorMessage });
    throw error; // Ensure the error is re-thrown to be caught in the component
  }
}; 