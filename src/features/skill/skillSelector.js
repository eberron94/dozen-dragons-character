import { createSelector } from '@reduxjs/toolkit';
import characterSelector from '../character/characterSelector';
import abilitySelector from '../ability/abilitySelector';
import { capitalize } from 'lodash';

const skillList = [
    ['acrobatics', 'dex'],
    ['arcana', 'int'],
    ['athletics', 'str'],
    ['crafting', 'int'],
    ['deception', 'cha'],
    ['diplomacy', 'cha'],
    ['intimidation', 'cha'],
    ['medicine', 'wis'],
    ['nature', 'wis'],
    ['occultism', 'int'],
    ['performance', 'cha'],
    ['religion', 'wis'],
    ['society', 'int'],
    ['stealth', 'dex'],
    ['survival', 'wis'],
    ['thievery', 'dex'],
];

const selectSkill = (state) => {
    return state.skill;
};

const maxProf = (key) =>
    createSelector([selectSkill, characterSelector.level], (skill, level) => {
        let best = 0;
        const profIf = ({ id, prof }) => {
            if (id === key) best = Math.max(best, prof);
        };

        skill.classProf.forEach(profIf);
        skill.intProf.forEach(profIf);
        skill.extra.forEach(profIf);

        skill.levelX.filter((_, i) => i < level).forEach(profIf);

        console.log(skill, level, best);

        if (level <= 20) best = Math.min(4, best);
        if (level <= 14) best = Math.min(3, best);
        if (level <= 6) best = Math.min(2, best);
        if (level === 1) best = Math.min(1, best);

        return best;
    });

const getBaseData = (skillLabel) => (prof, potency) => ({
    skillLabel: capitalize(skillLabel),
    proficiency: prof * 2,
    potency: prof > 0 ? potency : 0,
    baseValue: prof > 0 ? prof * 2 + potency : 0,
});

const getFinalData = (modifierLabel) => (baseData, modifier) => ({
    ...baseData,
    modifierLabel,
    modifier,
    finalValue: baseData.baseValue + modifier,
});

const makeSkillBaseData = (skillKey) => () =>
    createSelector(
        [maxProf(skillKey), characterSelector.potency],
        getBaseData(skillKey)
    );

const makeSkillFinalData =
    ([skillKey, abilityKey], baseDataSelector) =>
    () =>
        createSelector(
            [baseDataSelector(), abilitySelector[abilityKey + 'Modifier']],
            getFinalData(abilityKey)
        );

const selectors = {};

skillList.forEach((skillArr) => {
    const skillId = skillArr[0];
    const baseDataSelector = makeSkillBaseData(skillId);
    const finalDataSelector = makeSkillFinalData(skillArr, baseDataSelector);

    selectors[skillId + 'Base'] = baseDataSelector();
    selectors[skillArr[0] + 'Final'] = finalDataSelector();
});

export default selectors;
