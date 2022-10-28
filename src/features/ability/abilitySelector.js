import { createSelector } from '@reduxjs/toolkit';
import characterSelector from '../character/characterSelector';

const selectAbility = (state) => state.ability;

const countBoosts = (key) =>
    createSelector(
        [selectAbility, characterSelector.level],
        (ability, level) => {
            let count = 0;
            const boostIf = (b) => {
                if (b === key) count++;
            };
            const flawIf = (f) => {
                if (f === key) count--;
            };

            ability.keyAbility.forEach(boostIf);
            ability.ancestryBoost.forEach(boostIf);
            ability.ancestryFlaw.forEach(flawIf);
            ability.backgroundBoost.forEach(boostIf);
            ability.level1.forEach(boostIf);
            ability.extra.forEach(boostIf);
            ability.flaw.forEach(flawIf);

            ability.levelX.filter((_, i) => i < level).forEach(boostIf);

            if (level <= 20) count = Math.min(8, count);
            if (level <= 14) count = Math.min(7, count);
            if (level <= 9) count = Math.min(6, count);
            if (level <= 4) count = Math.min(5, count);
            if (level === 1) count = Math.min(4, count);

            return count;
        }
    );

const calcScoreFromBoost = (boosts) =>
    10 + Math.min(8, boosts * 2) + Math.max(0, boosts - 4);

const calcModifierFromScore = (score) => Math.floor((score - 10) / 2);

const signed = (modifier) => (modifier >= 0 ? '+' + modifier : modifier);

const strBoosts = countBoosts('str');
const dexBoosts = countBoosts('dex');
const conBoosts = countBoosts('con');
const intBoosts = countBoosts('int');
const wisBoosts = countBoosts('wis');
const chaBoosts = countBoosts('cha');

const strScore = createSelector(strBoosts, calcScoreFromBoost);
const dexScore = createSelector(dexBoosts, calcScoreFromBoost);
const conScore = createSelector(conBoosts, calcScoreFromBoost);
const intScore = createSelector(intBoosts, calcScoreFromBoost);
const wisScore = createSelector(wisBoosts, calcScoreFromBoost);
const chaScore = createSelector(chaBoosts, calcScoreFromBoost);

const scoreArray = createSelector(
    [strScore, dexScore, conScore, intScore, wisScore, chaScore],
    (str, dex, con, int, wis, cha) => [str, dex, con, int, wis, cha]
);

const strModifier = createSelector(strScore, calcModifierFromScore);
const dexModifier = createSelector(dexScore, calcModifierFromScore);
const conModifier = createSelector(conScore, calcModifierFromScore);
const intModifier = createSelector(intScore, calcModifierFromScore);
const wisModifier = createSelector(wisScore, calcModifierFromScore);
const chaModifier = createSelector(chaScore, calcModifierFromScore);

const strModifierStr = createSelector(strModifier, signed);
const dexModifierStr = createSelector(dexModifier, signed);
const conModifierStr = createSelector(conModifier, signed);
const intModifierStr = createSelector(intModifier, signed);
const wisModifierStr = createSelector(wisModifier, signed);
const chaModifierStr = createSelector(chaModifier, signed);

const modifierArray = createSelector(
    [
        strModifierStr,
        dexModifierStr,
        conModifierStr,
        intModifierStr,
        wisModifierStr,
        chaModifierStr,
    ],
    (str, dex, con, int, wis, cha) => [str, dex, con, int, wis, cha]
);

const selectors = {
    strBoosts,
    dexBoosts,
    conBoosts,
    intBoosts,
    wisBoosts,
    chaBoosts,
    strScore,
    dexScore,
    conScore,
    intScore,
    wisScore,
    chaScore,
    scoreArray,
    strModifier,
    dexModifier,
    conModifier,
    intModifier,
    wisModifier,
    chaModifier,
    strModifierStr,
    dexModifierStr,
    conModifierStr,
    intModifierStr,
    wisModifierStr,
    chaModifierStr,
    modifierArray,
};

export default selectors;
