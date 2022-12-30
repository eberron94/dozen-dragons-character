import { throttle } from 'lodash';
import { configureStore } from '@reduxjs/toolkit';
import { characterReducer } from '../features/character';
import { abilityReducer } from '../features/ability';
import { skillReducer } from '../features/skill';
import { saveReducer } from '../features/save';
import { acReducer } from '../features/ac';
import { featReducer } from '../features/feat';
import { weaponReducer } from '../features/weapon';

const saveState = (state) => {
    try {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('character', JSON.stringify(state));
        }
    } catch (err) {}
};

const loadState = () => {
    try {
        if (typeof window !== 'undefined') {
            const string = window.localStorage.getItem('character');
            if (string === null) return undefined;
            return JSON.parse(string);
        }
        return undefined;
    } catch (err) {
        return undefined;
    }
};

export const store = configureStore({
    preloadedState: loadState(),
    reducer: {
        character: characterReducer,
        ability: abilityReducer,
        skill: skillReducer,
        save: saveReducer,
        ac: acReducer,
        feat: featReducer,
        weapon: weaponReducer,
    },
});

store.subscribe(
    throttle(() => {
        // console.log('saving to local storage');
        saveState(store.getState());
    }, 1000)
);
