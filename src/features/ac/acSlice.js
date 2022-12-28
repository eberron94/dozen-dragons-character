import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    unarmoredClassLevel: [1, 2, 100, 100],
    lightClassLevel: [100, 100, 100, 100],
    mediumClassLevel: [1, 1, 100, 100],
    heavyClassLevel: [100, 100, 100, 100],
    itemBonus: 0,
    dexCap: 10,
    armorPenalty: 0,
    type: 'unarmoered',
    extra: [{ id: 'heavy', prof: 2 }],
};

const acSlice = createSlice({
    name: 'ac',
    initialState,
    reducers: {
        unarmoredClassLevel: (state, action) => {
            state.unarmoredClassLevel = action.payload;
        },
        lightClassLevel: (state, action) => {
            state.lightClassLevel = action.payload;
        },
        mediumClassLevel: (state, action) => {
            state.mediumClassLevel = action.payload;
        },
        heavyClassLevel: (state, action) => {
            state.heavyClassLevel = action.payload;
        },
        extraDefense: (state, action) => {
            state.extra = action.payload;
        },
    },
});

export const acAction = acSlice.actions;
export const acReducer = acSlice.reducer;
