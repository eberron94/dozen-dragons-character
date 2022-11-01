import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    level: 3,
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        name: (state, action) => {
            state.name = String(action.payload);
        },
        level: (state, action) => (state.level = Number(action.payload)),
    },
});

export const characterAction = characterSlice.actions;
export const characterReducer = characterSlice.reducer;
