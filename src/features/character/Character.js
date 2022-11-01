import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { characterAction } from './index';

export const Character = (props) => {
    const nameLabel = useSelector((state) => state.character.name);
    const dispatch = useDispatch();

    console.log(nameLabel);

    return (
        <div>
            <div>{nameLabel} name</div>
            <input
                value={nameLabel}
                onChange={(e) => {
                    console.log(e.target.value);
                    dispatch(characterAction.name(e.target.value));
                }}
            />
        </div>
    );
};
