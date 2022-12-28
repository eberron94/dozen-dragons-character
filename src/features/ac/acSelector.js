import { createSelector } from '@reduxjs/toolkit';
import { characterSelector } from '../character';
import { abilitySelector } from '../ability';

const selectAC = (state) => {
    return state.ac;
};

const getProf = (key, classLevelArr, extra, level) => {
    let best = classLevelArr.filter(
        (eLevel) => typeof eLevel === 'number' && eLevel && level >= eLevel
    ).length;

    extra.forEach(
        ({ id, prof, level: eLevel }) =>
            (best = level >= eLevel && id === key ? Math.max(best, prof) : best)
    );

    return best;
};

const getFinalData =
    (label) =>
    (prof, potency, dexModifier, { type, itemBonus, dexCap }) => ({
        label,
        active: label === type,
        proficiency: prof * 2,
        potency: prof > 0 ? potency : 0,
        type,
        itemBonus,
        dexCap,
        modifier: Math.min(dexModifier, dexCap),
        modifierLabel: 'dex',
        baseValue: 10 + (prof > 0 ? prof * 2 + potency : 0),
        finalValue:
            10 +
            Math.min(dexModifier, dexCap) +
            itemBonus +
            (prof > 0 ? prof * 2 + potency : 0),
    });

const getArmor = createSelector([selectAC], ({ itemBonus, dexCap, type }) => ({
    type,
    itemBonus,
    dexCap,
}));

const unarmoredProf = createSelector(
    [selectAC, characterSelector.level],
    (defense, level) =>
        getProf('unarmored', defense.unarmoredClassLevel, defense.extra, level)
);

const unarmoredFinal = createSelector(
    [
        unarmoredProf,
        characterSelector.potency,
        abilitySelector.dexModifier,
        getArmor,
    ],
    getFinalData('unarmored')
);

const lightProf = createSelector(
    [selectAC, characterSelector.level],
    (defense, level) =>
        getProf('light', defense.lightClassLevel, defense.extra, level)
);

const lightFinal = createSelector(
    [
        lightProf,
        characterSelector.potency,
        abilitySelector.dexModifier,
        getArmor,
    ],
    getFinalData('light')
);

const mediumProf = createSelector(
    [selectAC, characterSelector.level],
    (defense, level) =>
        getProf('medium', defense.mediumClassLevel, defense.extra, level)
);

const mediumFinal = createSelector(
    [
        mediumProf,
        characterSelector.potency,
        abilitySelector.dexModifier,
        getArmor,
    ],
    getFinalData('medium')
);

const heavyProf = createSelector(
    [selectAC, characterSelector.level],
    (defense, level) =>
        getProf('heavy', defense.heavyClassLevel, defense.extra, level)
);

const heavyFinal = createSelector(
    [
        heavyProf,
        characterSelector.potency,
        abilitySelector.dexModifier,
        getArmor,
    ],
    getFinalData('heavy')
);

export const acSelector = {
    unarmoredProf,
    unarmoredFinal,
    lightProf,
    lightFinal,
    mediumProf,
    mediumFinal,
    heavyProf,
    heavyFinal,
};
