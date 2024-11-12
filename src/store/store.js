import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice.js';
import filterReducer from './slices/filterSlice.js';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filters: filterReducer,
    },
});
