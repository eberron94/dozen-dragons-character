import { createSelector } from '@reduxjs/toolkit';

const selectCharacter = (state) => state.character;

const name = createSelector(selectCharacter, (character) => character.name);

const level = createSelector(selectCharacter, (character) => character.level);
const ancestry = createSelector(
    selectCharacter,
    (character) => character.ancestry
);
const characterClass = createSelector(
    selectCharacter,
    (character) => character.class
);

const potency = createSelector(level, (level) => {
    if (level < 4) return 0;
    if (level < 10) return 1;
    if (level < 16) return 2;

    return 3;
});

const damageDice = createSelector(level, (level) => {
    if (level < 4) return 1;
    if (level < 12) return 2;
    if (level < 19) return 3;

    return 4;
});

export const characterSelector = {
    name,
    level,
    potency,
    damageDice,
    ancestry,
    characterClass,
};
