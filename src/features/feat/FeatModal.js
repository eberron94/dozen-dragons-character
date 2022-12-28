import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { groupBy, kebabCase } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useFetchArray, useSessionStorage } from '../../util/hook';
import { featSelector } from './featSelector';
import Modal from 'react-modal';
import Paginate from 'react-paginate';
import { arrayUtil } from '../../util/arrayUtil';

export const FeatSelectModal = ({
    children,

    slot,
    currentFeat,
    isCustom,
    dataList,
    onFeatSelection = (f) => console.log(f),
    ...props
}) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleSelect = (id) => {
        onFeatSelection(id);
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>{children || 'Open Modal'}</button>
            <Modal
                className='feat-modal'
                overlayClassName='feat-overlay'
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <FilteringPaginatedItems
                    onSelect={handleSelect}
                    {...props}
                />
            </Modal>
        </div>
    );
};

const FilteringPaginatedItems = ({ type, level, ...props }) => {
    const [allItems] = useSessionStorage('featData', []);
    const [typeFilter, setTypeFilter] = useState(type || '');
    const [nameFilter, setNameFilter] = useState('');
    const [minLevel, setMinLevel] = useState(1);
    const [maxLevel, setMaxLevel] = useState(level);
    const [tagFilter, setTagFilter] = useState('');

    const [filteredItems, setFilteredItems] = useState(allItems);

    useEffect(() => {
        let newFilteredList = allItems;

        if (typeFilter === 'paragon') {
            newFilteredList = newFilteredList.filter(
                ({ id }) =>
                    id.includes('feat.skill') ||
                    id.includes('feat.dragonmark') ||
                    id.includes('feat.archetype')
            );
        } else {
            newFilteredList = newFilteredList.filter(({ id }) =>
                id.includes(`feat.${typeFilter}`)
            );
        }

        if (nameFilter) {
            newFilteredList = newFilteredList.filter(({ name }) => {
                const stubs = nameFilter.split(/ /).filter((e) => e);
                return stubs.every((stub) => name.includesIgnoreCase(stub));
            });
        }

        if (minLevel) {
            const minNum = Number(minLevel);
            newFilteredList = newFilteredList.filter(
                ({ level }) => level >= minNum
            );
        }

        if (maxLevel) {
            const maxNum = Number(maxLevel);
            newFilteredList = newFilteredList.filter(
                ({ level }) => level <= maxLevel
            );
        }

        if (tagFilter) {
            const tags = tagFilter
                .split(/[,|;]/)
                .map((e) => e.trim())
                .filter((e) => e);
            const keep = tags.filter((t) => !t.startsWith('!')).map(kebabCase);
            const skip = tags.filter((t) => t.startsWith('!')).map(kebabCase);
            newFilteredList = newFilteredList.filter(
                ({ filtering }) =>
                    arrayUtil.isSubset(filtering, keep) &&
                    arrayUtil.notSubset(filtering, skip)
            );
        }

        setFilteredItems(newFilteredList.sort(sortItems));
    }, [allItems, typeFilter, nameFilter, tagFilter, minLevel, maxLevel]);

    return (
        <>
            <div className='modal-filtering'>
                <div>
                    <label htmlFor='typeFilter'>Select a Type:</label>

                    <select
                        name='typeFilter'
                        id='typeFilter'
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <option value=''>All Feats</option>
                        <option value='ancestry'>ancestry</option>
                        <option value='class'>class</option>
                        <option value='general'>general</option>
                        <option value='skill'>skill</option>
                        <option value='archetype'>archetype</option>
                        <option value='dragonmark'>dragonmark</option>
                        <option value='paragon'>paragon</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='nameFilter'>Filter by Name:</label>
                    <input
                        name='nameFilter'
                        type='search'
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='minLevelFilter'>Min Level:</label>
                    <input
                        name='minLevelFilter'
                        value={minLevel}
                        onChange={(e) => setMinLevel(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='maxLevelFilter'>Max Level:</label>
                    <input
                        name='maxLevelFilter'
                        value={maxLevel}
                        onChange={(e) => setMaxLevel(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='tagFilter'>Filter by Tags:</label>
                    <input
                        name='tagFilter'
                        type='search'
                        value={tagFilter}
                        onChange={(e) => setTagFilter(e.target.value)}
                    />
                </div>
            </div>
            <PaginatedItems items={filteredItems} {...props} />
        </>
    );
};

const PaginatedItems = ({ items, itemsPerPage = 25, onSelect, ...props }) => {
    const [pageOffset, setPageOffset] = useState(0);

    const endOffset = pageOffset + 1;
    const currentItems = items.slice(
        pageOffset * itemsPerPage,
        endOffset * itemsPerPage
    );
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        setPageOffset(event.selected);
    };

    useEffect(() => {
        setPageOffset(0);
    }, [items]);

    return (
        <>
            <PageItems currentItems={currentItems} onSelect={onSelect} />
            <Paginate
                forcePage={pageOffset}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel='<'
                nextLabel='>'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
                renderOnZeroPageCount={null}
                {...props}
            />
        </>
    );
};

const PageItems = ({ currentItems, ...props }) => {
    const pageEl = useRef(null);
    useEffect(() => {
        pageEl.current.scrollTop = 0;
    }, [currentItems]);

    return (
        <div className='paged-items' ref={pageEl}>
            {currentItems &&
                currentItems.map((item) => (
                    <PageItem key={item.id} item={item} {...props} />
                ))}
        </div>
    );
};

const PageItem = ({ item, onSelect }) => {
    const handleClick = () => {
        if (typeof onSelect === 'function') onSelect(item.id);
        else console.log('clicked', item.id);
    };

    return (
        <div className='item' onClick={handleClick}>
            <div className='item-title'>
                <h3>{item.name}</h3>
                <span>{item.code}</span>
            </div>
            <ul className='item-traits'>
                {item.filtering
                    .filter(
                        (i) => !i.includesIgnoreCase('feat') && i !== 'common'
                    )
                    .map((i) => (
                        <li key={i} className={`trait t-${i}`}>
                            {i}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const sortItems = (a, b) => {
    if (a?.level < b?.level) return -1;
    if (a?.level > b?.level) return 1;

    if (a?.name < b?.name) return -1;
    if (a?.name > b?.name) return 1;

    if (a?.id < b?.id) return -1;
    if (a?.id > b?.id) return 1;

    return 0;
};
