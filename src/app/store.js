import { throttle } from 'lodash';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import characterReducer from '../features/character/characterSlice';
import abilityReducer from '../features/ability/abilitySlice';
import skillReducer from '../features/skill/skillSlice';
import saveReducer from '../features/save/saveSlice';

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
    // preloadedState: loadState(),
    reducer: {
        counter: counterReducer,
        character: characterReducer,
        ability: abilityReducer,
        skill: skillReducer,
        save: saveReducer,
    },
});

store.subscribe(
    throttle(() => {
        // console.log('saving to local storage');
        saveState(store.getState());
    }, 1000)
);