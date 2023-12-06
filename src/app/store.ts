// 
import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers';
import { reducers } from '../reducers';

const store = configureStore({
  reducer: reducers,
  // Other store configurations...
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
