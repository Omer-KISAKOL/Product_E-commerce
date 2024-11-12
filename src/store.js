import {configureStore} from '@reduxjs/toolkit';
import cartReducer from './store/slices/cartSlice.js';
import filterReducer from './store/slices/filterSlice.js';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filters: filterReducer,
    },
});
