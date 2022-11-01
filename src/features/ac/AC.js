import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { acSelector } from './index';

export const AC = (props) => {
    const reflexData = useSelector(acSelector.reflexFinal);

    console.log(reflexData);

    return (
        <div>
            <div>REFLEX {reflexData.finalValue} </div>
        </div>
    );
};
