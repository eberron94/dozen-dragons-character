import { createSelector } from '@reduxjs/toolkit';
import { characterSelector } from '../character';
import { abilitySelector } from '../ability';

const selectSave = (state) => {
    return state.save;
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
    (label, modifierLabel) => (prof, potency, modifier) => ({
        label,
        proficiency: prof * 2,
        potency: prof > 0 ? potency : 0,
        modifier,
        modifierLabel,
        finalValue: modifier + (prof > 0 ? prof * 2 + potency : 0),
    });

const fortitudeProf = createSelector(
    [selectSave, characterSelector.level],
    (defense, level) =>
        getProf('fortitude', defense.fortClassLevel, defense.extra, level)
);

const fortitudeFinal = createSelector(
    [fortitudeProf, characterSelector.potency, abilitySelector.conModifier],
    getFinalData('fortitude', 'con')
);

const reflexProf = createSelector(
    [selectSave, characterSelector.level],
    (defense, level) =>
        getProf('reflex', defense.refClassLevel, defense.extra, level)
);

const reflexFinal = createSelector(
    [reflexProf, characterSelector.potency, abilitySelector.dexModifier],
    getFinalData('reflex', 'dex')
);

const willProf = createSelector(
    [selectSave, characterSelector.level],
    (defense, level) =>
        getProf('will', defense.willClassLevel, defense.extra, level)
);

const willFinal = createSelector(
    [willProf, characterSelector.potency, abilitySelector.wisModifier],
    getFinalData('will', 'wis')
);

const perceptionProf = createSelector(
    [selectSave, characterSelector.level],
    (defense, level) =>
        getProf('perception', defense.percClassLevel, defense.extra, level)
);

const perceptionFinal = createSelector(
    [perceptionProf, characterSelector.potency, abilitySelector.wisModifier],
    getFinalData('perception', 'wis')
);

// const reflexFinalValue = createSelector([characterSelector.])

export const saveSelector = {
    fortitudeProf,
    fortitudeFinal,
    reflexProf,
    reflexFinal,
    willProf,
    willFinal,
    perceptionProf,
    perceptionFinal,
};
