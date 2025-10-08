import { createSlice } from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { fetchProducts } from './apis.js';


const initialState = { products: [] };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('products/fetchProducts/fulfilled', (state, action) => {
        console.log('Fetched products:', action.payload);
        state.products = action.payload;
      }).addCase('products/fetchProducts/rejected', (state, action) => {
        console.error('Failed to fetch products:', action.error);
      }); 
  },
});

export const { addToCart, removeFromCart, clearCart } = productsSlice.actions;
export default productsSlice.reducer;
