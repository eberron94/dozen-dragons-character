import { createSelector } from '@reduxjs/toolkit';

const level = (state) => state.character.level;

const potency = createSelector(level, (level) => {
    if (level < 4) return 0;
    if (level < 10) return 1;
    if (level < 16) return 2;

    return 3;
});

const selectors = { level, potency };

export default selectors;
