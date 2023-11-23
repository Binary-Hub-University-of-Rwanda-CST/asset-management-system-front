// src/reducers/assetReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssetState {
  assets: string[];
}

const initialState: AssetState = {
  assets: [],
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<string>) => {
      state.assets.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter((asset) => asset !== action.payload);
    },
  },
});

export const { addAsset, removeAsset } = assetSlice.actions;
export default assetSlice.reducer;
