import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchStoreAProducts = createAsyncThunk('storeA/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data
});

export const fetchStoreBProducts = createAsyncThunk('storeB/fetchProducts', async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await response.json();
    return data
});