import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    unarmedClassLevel: [1, 2, 100, 100],
    simpleClassLevel: [100, 100, 100, 100],
    martialClassLevel: [1, 1, 100, 100],
    advancedClassLevel: [100, 100, 100, 100],
    specialClassLevel: [100, 100, 100, 100],
    extra: [{ id: 'simple', prof: 2 }],
};

const weaponSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {},
});

export const weaponAction = weaponSlice.actions;
export const weaponReducer = weaponSlice.reducer;
