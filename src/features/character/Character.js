import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { name } from './characterSlice';

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
                    dispatch(name(e.target.value));
                }}
            />
        </div>
    );
};