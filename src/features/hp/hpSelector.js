import { createSelector } from '@reduxjs/toolkit';
import { characterSelector } from '../character';
import { abilitySelector } from '../ability';

const selectHP = (state) => state.hp;

const hpTotal = createSelector(
    [selectHP, characterSelector.level, abilitySelector.conModifier],
    ({ ancestry, perLevel }, level, conMod) =>
        ancestry + level * (perLevel + conMod)
);

export const hpSelector = {
    hpTotal,
};
