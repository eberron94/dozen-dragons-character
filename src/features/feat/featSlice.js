import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
    ],
    extraSlots: [],
};

const featSlice = createSlice({
    name: 'feat',
    initialState,
    reducers: {
        addFeat: (state, action) => {
            state.list = state.list
                .filter((feat) => feat.slot !== action.payload.slot)
                .concat([action.payload]);
        },
        removeFeat: (state, action) => {
            state.list = state.list.filter(
                (feat) => feat.slot !== action.payload
            );
        },
        addSlot: (state, action) => {
            state.extraSlots.push(action.payload);
        },
        removeSlot: (state, action) => {
            state.extraSlots = state.extraSlots.filter(
                (feat) => feat.slot !== action.payload
            );
        },
        updateNote: (state, action) => {
            const { note, slot } = action.payload;
            const feat2Change =
                state.list.find((f) => f.slot === slot) ||
                state.extraSlots.find((f) => f.slot === slot);

            feat2Change.note = note;
        },
    },
});

export const featAction = featSlice.actions;
export const featReducer = featSlice.reducer;
