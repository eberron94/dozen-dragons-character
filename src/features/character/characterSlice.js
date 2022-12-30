import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Lord Mantil',
    level: 3,
    ancestry: 'human',
    background: 'gladiator',
    class: 'fighter',
    size: 'medium',
    landSpeed: 5,
    flySpeed: 0,
    burrowSpeed: 0,
};

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        name: (state, action) => {
            state.name = String(action.payload);
        },
        level: (state, action) => {
            state.level = Number(action.payload);
        },
        class:(state, action) => {
            state.class = String(action.payload);
        },
    },
});

export const characterAction = characterSlice.actions;
export const characterReducer = characterSlice.reducer;
