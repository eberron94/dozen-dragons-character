const abilityKey2ArrayIndex = (key) => {
    switch (key) {
        case 'str':
            return 0;
        case 'dex':
            return 1;
        case 'con':
            return 2;
        case 'int':
            return 3;
        case 'wis':
            return 4;
        case 'cha':
            return 5;
        default:
            return 0;
    }
};

const characterClasses = [
    'alchemist',
    'barbarian',
    'bard',
    'champion',
    'cleric',
    'druid',
    'fighter',
    'gunslinger',
    'inventor',
    'investigator',
    'magus',
    'monk',
    'oracle',
    'psychic',
    'ranger',
    'rogue',
    'sorcerer',
    'summoner',
    'swashbuckler',
    'thaumaturge',
    'witch',
    'wizard',
];

export const rpgUtil = {abilityKey2ArrayIndex, characterClasses};
