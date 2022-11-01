import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    classProf: [{ id: 'arcana', prof: 1 }],
    intProf: [],
    levelX: [],
    extra: [],
};

export const skillSlice = createSlice({
    name: 'skill',
    initialState,
    reducers: {
        classProf: (state, action) => {
            state.classProf = action.payload;
        },
        intProf: (state, action) => {
            state.intProf = action.payload;
        },
        levelXProf: (state, action) => {
            state.levelX = action.payload;
        },
        extraProf: (state, action) => {
            state.extra = action.payload;
        },
    },
});

export const skillAction = skillSlice.actions;
export const skillReducer = skillSlice.reducer;
