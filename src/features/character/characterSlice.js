import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    level: 3,
};

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        name: (state, action) => {
            state.name = String(action.payload);
        },
        level: (state, action) => (state.level = Number(action.payload)),
        
    },
});

export const { name } = characterSlice.actions;

export default characterSlice.reducer;
