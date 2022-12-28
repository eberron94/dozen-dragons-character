import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveSelector } from './index';

export const Save = (props) => {
    const reflexData = useSelector(saveSelector.reflexFinal);

    console.log(reflexData);

    return (
        <div className='save'>
            <div>REFLEX {reflexData.finalValue.signed()} </div>
        </div>
    );
};
