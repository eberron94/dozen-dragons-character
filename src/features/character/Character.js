import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rpgUtil } from '../../util/rpgUtil';
import { characterAction, characterSelector } from './index';

export const Character = (props) => {
    // const nameLabel = useSelector((state) => state.character.name);
    const level = useSelector(characterSelector.level);
    // const ancestry = useSelector(characterSelector.ancestry);
    const characterClass = useSelector(characterSelector.characterClass);

    const dispatch = useDispatch();

    return (
        <div className='character'>
            {/* <input
                className='name'
                placeholder={'Character Name'}
                value={nameLabel}
                onChange={(e) => {
                    dispatch(characterAction.name(e.target.value));
                }}
            /> */}

            <div className='level'>
                <div>Level</div>
                <select
                    value={level}
                    onChange={(e) =>
                        dispatch(characterAction.level(e.target.value))
                    }
                >
                    {Array(20)
                        .fill(0)
                        .map((_, i) => (
                            <option key={i} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                </select>
            </div>

            <div className='class'>
                <label htmlFor='classSelect'>Class</label>
                <select
                    name='classSelect'
                    value={characterClass}
                    onChange={(e) => dispatch(characterAction.class(e.target.value))}
                >
                    {rpgUtil.characterClasses.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                    <option value=''>None</option>
                </select>
            </div>

            {/* <input className='ancestry' placeholder={'ancestry'} /> */}
            {/* <input className='background' placeholder={'background'} /> */}
            {/* <input className='class' placeholder={'class'} /> */}
            {/* <input className='culture' placeholder={'culture'} /> */}
            {/* <input className='devotion' placeholder={'devotion'} /> */}
            <button className='devotion' 
            onClick={()=>{
                window.localStorage.clear('character');
                window.location.reload();
            }}>Reset</button>
        </div>
    );
};
