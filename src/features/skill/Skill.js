import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import skillSelector from './skillSelector';

export const Skill = (props) => {
    const arcanaData = useSelector(skillSelector.arcanaFinal);

    console.log(arcanaData);

    return (
        <div>
            <div>{arcanaData.skillLabel} {arcanaData.finalValue}</div>
        </div>
    );
};
