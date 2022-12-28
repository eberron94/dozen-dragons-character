import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { skillSelector } from './index';

export const Skill = (props) => {
    const arcanaData = useSelector(skillSelector.arcanaFinal);
    const loreData = useSelector(skillSelector.loresBase);

    return (
        <div className='skill'>
            <div>
                {arcanaData.label} {arcanaData.finalValue.signed()}
            </div>
        </div>
    );
};
