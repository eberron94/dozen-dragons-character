import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { groupBy, uniqueId } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchArray } from '../../util/hook';
import { stringUtil } from '../../util/stringUtil';
import { FeatSelectModal } from './FeatModal';
import { featSelector } from './featSelector';
import { featAction } from './featSlice';

const featURL =
    'https://raw.githubusercontent.com/eberron94/dozen-dragons-wiki/main/data/converted/feat.json';

const zipFeats = (slotList, featList, dataList = []) => {
    const comboList = slotList.map((slot) => {
        // slot.slot = `${slot.type}|${slot.level}.0`;

        if (Array.isArray(featList)) {
            slot.feat =
                slot.type === 'extra'
                    ? slot
                    : featList.find((feat) => {
                          return feat.slot === slot.slot;
                      });
        }

        if (slot.feat && Array.isArray(dataList)) {
            slot.data =
                dataList.find((feat) => feat.id === slot.feat.id) ||
                dataList[0];
        }

        return slot;
    });

    return groupBy(comboList, 'level');
};

export const Feat = (props) => {
    const featSlots = useSelector(featSelector.featSlots);
    const featList = useSelector(featSelector.list);
    const [dataList] = useFetchArray(featURL, 'featData', []);

    const [slotsByLevel, setSlotsByLevel] = useState(
        zipFeats(featSlots, featList, dataList)
    );

    useEffect(() => {
        if (dataList.length) {
            setSlotsByLevel(zipFeats(featSlots, featList, dataList));
        }
    }, [dataList, featList, featSlots]);

    const levelRows = Array(20)
        .fill(0)
        .map((_, i) =>
            slotsByLevel[i + 1].map((slot) => (
                <Slot key={slot.slot} {...slot} />
            ))
        )
        .map((row, i) => <Row key={i} row={row} level={i + 1} />);

    return (
        <div className='feat'>
            <div>
                <h1>Feats</h1>
            </div>

            <div className='feat-container'>{levelRows}</div>
        </div>
    );
};

const Row = ({ row, level }) => {
    const dispatch = useDispatch();

    const handleExtraFeat = (id) => {
        dispatch(
            featAction.addSlot({
                id,
                type: 'extra',
                level,
                note: '',
                slot: stringUtil.uuidv4(),
            })
        );
    };
    return (
        <div className='feat-row'>
            <div className='feat-row-level-label'>
                <span>Level {level}</span>
                <FeatSelectModal
                    level={level}
                    onFeatSelection={handleExtraFeat}
                >
                    <FontAwesomeIcon icon='fa-solid fa-plus' />
                </FeatSelectModal>
            </div>
            <div className='feat-row-slots'>{row}</div>
        </div>
    );
};

const Slot = ({ type = 'extra', level = 1, feat = {}, data = {}, slot }) => {
    const dispatch = useDispatch();

    const handleFeatSelection = (id) => {
        dispatch(featAction.addFeat({ id, type, slot, level, note: '' }));
    };

    const handleRemoveExtraFeat = () => {
        dispatch(featAction.removeSlot(slot));
    };

    let actionButton;

    if (type === 'extra') {
        actionButton = (
            <button onClick={handleRemoveExtraFeat}>
                <FontAwesomeIcon icon='fa-solid fa-trash-can' />
            </button>
        );
    } else {
        actionButton = (
            <FeatSelectModal
                type={type}
                level={level}
                onFeatSelection={handleFeatSelection}
            >
                <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
            </FeatSelectModal>
        );
    }

    return (
        <div className={'feat-slot feat-' + type}>
            <div className='feat-slot-type'>
                <span>{type.toUpperCase()}</span>
                <span>{level}</span>
            </div>
            <div className='feat-slot-display'>
                <button>
                    <FontAwesomeIcon icon='fa-solid fa-circle-info' />
                </button>
                <div className='feat-slot-title'>
                    {data?.name ||
                        data?.title ||
                        feat?.id ||
                        'No Feat Selected'}
                </div>
                {actionButton}
            </div>
        </div>
    );
};
