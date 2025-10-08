import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import productsAReducer from './productsASlice.js';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    storeAproducts : productsAReducer
  },
});
