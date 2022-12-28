import { createSelector } from '@reduxjs/toolkit';
import { characterSelector } from '../character';
import { abilitySelector } from '../ability';

const selectWeapon = (state) => {
    return state.weapon;
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

const getFinalData = (label) => (prof, potency, modifierArray) =>
    [
        {
            label: label + 'Melee',
            proficiency: prof * 2,
            potency: prof > 0 ? potency : 0,
            modifier: modifierArray[0],
            modifierLabel: 'str',
            baseValue: prof > 0 ? prof * 2 + potency : 0,
            finalValue: modifierArray[0] + (prof > 0 ? prof * 2 + potency : 0),
        },
        {
            label: label + 'Ranged',
            proficiency: prof * 2,
            potency: prof > 0 ? potency : 0,
            modifier: modifierArray[1],
            modifierLabel: 'dex',
            baseValue: prof > 0 ? prof * 2 + potency : 0,
            finalValue: modifierArray[1] + (prof > 0 ? prof * 2 + potency : 0),
        },
    ];

const unarmedProf = createSelector(
    [selectWeapon, characterSelector.level],
    (weapon, level) =>
        getProf('unarmed', weapon.unarmedClassLevel, weapon.extra, level)
);

const unarmedFinal = createSelector(
    [unarmedProf, characterSelector.potency, abilitySelector.modifierArray],
    getFinalData('unarmed')
);

const simpleProf = createSelector(
    [selectWeapon, characterSelector.level],
    (weapon, level) =>
        getProf('simple', weapon.simpleClassLevel, weapon.extra, level)
);

const simpleFinal = createSelector(
    [simpleProf, characterSelector.potency, abilitySelector.modifierArray],
    getFinalData('simple')
);

const martialProf = createSelector(
    [selectWeapon, characterSelector.level],
    (weapon, level) =>
        getProf('martial', weapon.martialClassLevel, weapon.extra, level)
);

const martialFinal = createSelector(
    [martialProf, characterSelector.potency, abilitySelector.modifierArray],
    getFinalData('martial')
);

const advancedProf = createSelector(
    [selectWeapon, characterSelector.level],
    (weapon, level) =>
        getProf('advanced', weapon.advancedClassLevel, weapon.extra, level)
);

const advancedFinal = createSelector(
    [advancedProf, characterSelector.potency, abilitySelector.modifierArray],
    getFinalData('advanced')
);

const specialProf = createSelector(
    [selectWeapon, characterSelector.level],
    (weapon, level) =>
        getProf('special', weapon.specialClassLevel, weapon.extra, level)
);

const specialFinal = createSelector(
    [specialProf, characterSelector.potency, abilitySelector.modifierArray],
    getFinalData('special')
);

export const weaponSelector = {
    unarmedProf,
    unarmedFinal,
    simpleProf,
    simpleFinal,
    martialProf,
    martialFinal,
    advancedProf,
    advancedFinal,
    specialProf,
    specialFinal,
};
