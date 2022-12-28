import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { abilitySelector } from './index';

export const Ability = (props) => {
    const [strScore, dexScore, conScore, intScore, wisScore, chaScore] =
        useSelector(abilitySelector.scoreArray);

    const [
        strModifier,
        dexModifier,
        conModifier,
        intModifier,
        wisModifier,
        chaModifier,
    ] = useSelector(abilitySelector.modifierArray);

    return (
        <div className='ability'>
            <div>
                {strScore} {strModifier.signed()}
            </div>
            <div>
                {dexScore} {dexModifier.signed()}
            </div>
            <div>
                {conScore} {conModifier.signed()}
            </div>
            <div>
                {intScore} {intModifier.signed()}
            </div>
            <div>
                {wisScore} {wisModifier.signed()}
            </div>
            <div>
                {chaScore} {chaModifier.signed()}
            </div>
        </div>
    );
};
