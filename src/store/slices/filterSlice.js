import {createSlice} from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        filter: {},
        sort: "",
        search: "",
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
    },
});

export const {setFilter, setSort, setSearch} = filterSlice.actions;
export default filterSlice.reducer;
