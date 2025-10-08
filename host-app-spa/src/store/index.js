import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import productsReducer from './productsSlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products : productsReducer
  },
});
