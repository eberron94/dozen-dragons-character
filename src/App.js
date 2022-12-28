import React from 'react';
import { Character } from './features/character';
import { Ability } from './features/ability';
import { Skill } from './features/skill';
import { Save } from './features/save';
import { AC } from './features/ac';
import { Feat } from './features/feat';
import { Weapon } from './features/weapon';
import { HP } from './features/hp';

function App() {
    // return <Feat />;
    return (
        <div className='App'>
            <Character />
            {/* <Ability /> */}
            {/* <Skill /> */}
            {/* <HP /> */}

            {/* <Save /> */}
            {/* <AC /> */}
            <Feat />
            {/* <Weapon /> */}
        </div>
    );
}

export default App;
