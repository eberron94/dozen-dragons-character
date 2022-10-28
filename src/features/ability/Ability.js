import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import abilitySelector from './abilitySelector';

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
        <div>
            <div>
                {strScore} {strModifier}
            </div>
            <div>
                {dexScore} {dexModifier}
            </div>
            <div>
                {conScore} {conModifier}
            </div>
            <div>
                {intScore} {intModifier}
            </div>
            <div>
                {wisScore} {wisModifier}
            </div>
            <div>
                {chaScore} {chaModifier}
            </div>
        </div>
    );
};
