import React from 'react';
import { Character } from './features/character';
import { Ability } from './features/ability';
import { Skill } from './features/skill';
import { Save } from './features/save';

function App() {
    return (
        <div className='App'>
            <Ability />
            <Skill />
            <Character />
            <Save />
        </div>
    );
}

export default App;
