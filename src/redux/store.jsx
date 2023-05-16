import { configureStore } from '@reduxjs/toolkit';
import animaliReducer from './animaliSlice';

const store = configureStore({
  reducer: {
    animali: animaliReducer,
  },
});

export default store;