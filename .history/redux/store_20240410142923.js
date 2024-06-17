// store.js
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './reducers';

const store = configureStore({
  reducer: bookingReducer,
});

export default store;
