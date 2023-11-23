// User Action
import { createAction } from '@reduxjs/toolkit';

export const setUser = createAction<string>('user/setUser');
export const clearUser = createAction('user/clearUser');
