// src/actions/assetActions.ts
import { createAction } from '@reduxjs/toolkit';

export const addAsset = createAction<string>('asset/addAsset');
export const removeAsset = createAction<string>('asset/removeAsset');
