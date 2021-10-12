import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './reducers/querySlice';
import imageDataReducer from './reducers/imageDataSlice';

const store = configureStore({
  reducer: {
    query: queryReducer,
    data: imageDataReducer
  }
});

export default store;