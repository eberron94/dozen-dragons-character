import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lost: 0,
    temp: 0,
    resistance: [],
    weakness: [],
    immunity: [],
    ancestry: 6,
    perLevel: 6,
};

const hpSlice = createSlice({
    name: 'hp',
    initialState,
    reducers: {
        lost: (state, action) => (state.lost = action.payload),
        temp: (state, action) => (state.lost = action.payload),
    },
});

export const hpAction = hpSlice.actions;
export const hpReducer = hpSlice.reducer;
