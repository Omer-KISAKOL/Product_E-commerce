import {createSlice} from "@reduxjs/toolkit";
import {getLocal, setLocal} from "@/utils/LocalStorage.js";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        totalAmount: 0,
    },
    reducers: {
        setCart(state, action) {
            state.items = action.payload.items;
            state.totalAmount = action.payload.totalAmount;
        },
        addToCart(state, action) {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
            state.totalAmount += action.payload.price;

            setLocal("cartItems", state.items);
            setLocal("totalAmount", state.totalAmount);
        },
        removeFromCart(state, action) {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.items = state.items.filter((i) => i.id !== action.payload.id);
            }
            state.totalAmount = Math.max(0, state.totalAmount - action.payload.price);

            setLocal("cartItems", state.items);
            setLocal("totalAmount", state.totalAmount);
        },
    },
});

export const {setCart,addToCart, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;