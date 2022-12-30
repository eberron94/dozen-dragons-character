import React from 'react';
import { Character } from './features/character';
import { Feat } from './features/feat';

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
