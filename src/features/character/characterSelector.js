import { createSelector } from '@reduxjs/toolkit';

const selectCharacter = (state) => state.character;

const name = createSelector(selectCharacter, (character) => character.name);

const level = createSelector(selectCharacter, (character) => character.level);

const potency = createSelector(level, (level) => {
    if (level < 4) return 0;
    if (level < 10) return 1;
    if (level < 16) return 2;

    return 3;
});

export const characterSelector = { name, level, potency };
