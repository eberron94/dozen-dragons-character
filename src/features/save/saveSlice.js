import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    percClassLevel: [100, 100, 100, 100],
    fortClassLevel: [100, 100, 100, 100],
    refClassLevel: [100, 100, 100, 100],
    willClassLevel: [100, 100, 100, 100],
    extra: [{ id: 'fortitude', prof: 2 }],
};

export const defenseSlice = createSlice({
    name: 'defense',
    initialState,
    reducers: {
        percClassLevel: (state, action) => {
            state.percClassLevel = action.payload;
        },
        fortClassLevel: (state, action) => {
            state.fortClassLevel = action.payload;
        },
        refClassLevel: (state, action) => {
            state.refClassLevel = action.payload;
        },
        willClassLevel: (state, action) => {
            state.willClassLevel = action.payload;
        },
        extraDefense: (state, action) => {
            state.extra = action.payload;
        },
    },
});

export const {
    percClassLevel,
    fortClassLevel,
    refClassLevel,
    willClassLevel,
    extraDefense,
} = defenseSlice.actions;

export default defenseSlice.reducer;
