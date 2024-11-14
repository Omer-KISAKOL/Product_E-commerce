import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        filter: {},
        sort: "",
        search: "",
        discountSort: "",
        stockSort: "",
        addedDateSort: "",
        brand: "",
    },
    reducers: {
        setFilter(state, action) {
            const {type, value} = action.payload;
            state.filter[type] = value;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setSearch(state, action) {
            state.search = action.payload;
        },
        setDiscountSort(state, action) {
            state.discountSort = action.payload;
        },
        setStockSort(state, action) {
            state.stockSort = action.payload;
        },
        setAddedDateSort(state, action) {
            state.addedDateSort = action.payload;
        },
        setBrand(state, action) {
            state.brand = action.payload;
        },
    },
});

export const {setBrand, setFilter, setSort, setSearch, setDiscountSort, setAddedDateSort, setStockSort} = filterSlice.actions;
export default filterSlice.reducer;
