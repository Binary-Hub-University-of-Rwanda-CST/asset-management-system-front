
import { Dispatch } from "redux";
import {
  SAVE_VALIDATED_DATA,
  SEND_VALIDATED_DATA_REQUEST,
  SEND_VALIDATED_DATA_SUCCESS,
  SEND_VALIDATED_DATA_FAILURE,
} from "./types";
import { API_URL } from "../utils/api";

export const saveValidatedData = (data: Record<string, any>[]) => ({
  type: SAVE_VALIDATED_DATA,
  payload: data,
});

export const sendValidatedData = (data: Record<string, any>[]) => async (dispatch: Dispatch) => {
  dispatch({ type: SEND_VALIDATED_DATA_REQUEST });

  try {
    const response = await fetch(`${API_URL}/asset`, {
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
  } catch (error: unknown) {
    dispatch({ type: SEND_VALIDATED_DATA_FAILURE, payload: (error as Error).message });
  }
};
 