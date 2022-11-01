import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keyAbility: ['str'],
    ancestryBoost: ['str'],
    ancestryFlaw: ['int'],
    backgroundBoost: ['str', 'con'],
    level1: ['con', 'int'],
    levelX: ['str', 'con', 'wis', 'str'],
    extra: [],
    flaw: ['int', 'cha'],
};

const abilitySlice = createSlice({
    name: 'ability',
    initialState,
    reducers: {
        keyAbility: (state, action) => {
            state.keyAbility = action.payload;
        },
        ancestryBoost: (state, action) => {
            state.ancestryBoost = action.payload;
        },
        ancestryFlaw: (state, action) => {
            state.ancestryFlaw = action.payload;
        },
        backgroundBoost: (state, action) => {
            state.backgroundBoost = action.payload;
        },
        level1Boost: (state, action) => {
            state.level1 = action.payload;
        },
        levelXBoost: (state, action) => {
            state.levelX[action.payload.level] = action.payload.boost;
        },
        extraBoost: (state, action) => {
            state.extra = action.payload;
        },
    },
});

export const abilityAction = abilitySlice.actions;
export const abilityReducer = abilitySlice.reducer;
