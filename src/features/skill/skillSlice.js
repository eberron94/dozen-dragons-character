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

export const { classProf, intProf, levelXProf, extraProf } = skillSlice.actions;

export default skillSlice.reducer;
