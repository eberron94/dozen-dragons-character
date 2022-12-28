import { createSelector } from '@reduxjs/toolkit';
import { characterSelector } from '../character';

const defaultFeatSlots = [
    { type: 'ancestry', level: 1 },
    { type: 'paragon', level: 1 },

    { type: 'class', level: 2 },
    { type: 'skill', level: 2 },

    { type: 'general', level: 3 },
    { type: 'paragon', level: 3 },

    { type: 'class', level: 4 },
    { type: 'skill', level: 4 },

    { type: 'ancestry', level: 5 },
    { type: 'paragon', level: 5 },

    { type: 'class', level: 6 },
    { type: 'skill', level: 6 },

    { type: 'general', level: 7 },
    { type: 'paragon', level: 7 },

    { type: 'class', level: 8 },
    { type: 'skill', level: 8 },

    { type: 'ancestry', level: 9 },
    { type: 'paragon', level: 9 },

    { type: 'class', level: 10 },
    { type: 'skill', level: 10 },

    { type: 'general', level: 11 },
    { type: 'paragon', level: 11 },

    { type: 'class', level: 12 },
    { type: 'skill', level: 12 },

    { type: 'ancestry', level: 13 },
    { type: 'paragon', level: 13 },

    { type: 'class', level: 14 },
    { type: 'skill', level: 14 },

    { type: 'general', level: 15 },
    { type: 'paragon', level: 15 },

    { type: 'class', level: 16 },
    { type: 'skill', level: 16 },

    { type: 'ancestry', level: 17 },
    { type: 'paragon', level: 17 },

    { type: 'class', level: 18 },
    { type: 'skill', level: 18 },

    { type: 'general', level: 19 },
    { type: 'paragon', level: 19 },

    { type: 'class', level: 20 },
    { type: 'skill', level: 20 },
];

const selectFeat = (state) => state.feat;

const selectList = createSelector(selectFeat, (feat) => feat.list);

const selectClassSlots = createSelector(
    characterSelector.characterClass,
    (characterClass) => {
        switch (characterClass) {
            case 'alchemist':
            case 'barbarian':
            case 'champion':
            case 'fighter':
            case 'inventor':
            case 'monk':
            case 'ranger':
                return [{ type: 'class', level: 1 }];
            case 'rogue':
                return [
                    { type: 'class', level: 1 },
                    { type: 'skill', level: 1 },
                    { type: 'skill', level: 3 },
                    { type: 'skill', level: 5 },
                    { type: 'skill', level: 7 },
                    { type: 'skill', level: 9 },
                    { type: 'skill', level: 11 },
                    { type: 'skill', level: 13 },
                    { type: 'skill', level: 15 },
                    { type: 'skill', level: 17 },
                    { type: 'skill', level: 19 },
                ];
            case 'swashbuckler':
                return [
                    { type: 'class', level: 1 },
                    { type: 'skill', level: 3 },
                    { type: 'skill', level: 7 },
                    { type: 'skill', level: 15 },
                ];
            default:
                return [];
        }
    }
);

const selectExtraSlots = createSelector(selectFeat, (feat) =>
    Array.isArray(feat.extraSlots) ? feat.extraSlots : []
);

const selectFeatSlots = createSelector(
    [selectClassSlots, selectExtraSlots],
    (classSlots, extraSlots) =>
        defaultFeatSlots
            .concat(classSlots)
            .concat(extraSlots)
            .map((slot, index, otherSlots) => ({
                ...slot,
                slot:
                    slot.slot ||
                    `${slot.type}|${slot.level}.${countSameSlotsBefore(
                        slot,
                        index,
                        otherSlots
                    )}`,
                feat: null,
                data: null,
            }))
);

const countSameSlotsBefore = (slot, index, otherSlots) => {
    const beforeSlots = otherSlots.slice(0, index);
    return beforeSlots.filter(
        (s) => s.type === slot.type && s.level === slot.level
    ).length;
};

export const featSelector = {
    list: selectList,
    featSlots: selectFeatSlots,
};
