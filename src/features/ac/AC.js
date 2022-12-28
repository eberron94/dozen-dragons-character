import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { acSelector } from './index';

export const AC = (props) => {
    const unarmoredFinal = useSelector(acSelector.unarmoredFinal);

    console.log(unarmoredFinal);

    return (
        <div className='ac'>
            <div>AC {unarmoredFinal.finalValue} </div>
        </div>
    );
};
