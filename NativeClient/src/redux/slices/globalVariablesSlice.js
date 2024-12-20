import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scrollingDown: false,
};

const globalVariablesSlice = createSlice({
    name: "globalVariables",
    initialState,
    reducers: {
        setScrollingDown: (state, { payload }) => {
            state.scrollingDown = payload;
        },
    },
});

export const { setScrollingDown } = globalVariablesSlice.actions;
export default globalVariablesSlice.reducer;