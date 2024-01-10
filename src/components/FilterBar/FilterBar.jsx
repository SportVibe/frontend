import styles from './FilterBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PriceBox, SizeBox, ColorBox, GenreBox, Sort, SearchResults } from '../../helpers/filterComponents.jsx';
import Sports from './FilterBoxes/Sports/Sports';
import Brands from './FilterBoxes/Brands/Brands';
import { useEffect, useState } from 'react';
import { genreFilterAction, getProducts, priceFilterAction, responsiveNavBar, sortAction } from '../../redux/actions';


function FilterBar() {
    const dispatch = useDispatch();
    const [minimumValue, setMinimumValue] = useState('');
    const [maximumValue, setMaximumValue] = useState('');
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const category = useSelector((state => state.category));
    const priceFilter = useSelector((state => state.priceFilter));
    const genre = useSelector((state => state.genre));
    const sort = useSelector((state => state.sort));
    const discount = useSelector((state => state.discount));
    const { totalFilteredCount } = useSelector((state) => state.products);

    function genreHandler(event) {
        const id = event.target.id;
        const newFiltersArray = [...totalFilters, category[0], priceFilter[0], priceFilter[1], sort[0], sort[1], discount[0], { search: search_Activity }, { gender: id }]
        dispatch(genreFilterAction([{ gender: id }]));
        dispatch(getProducts(newFiltersArray));
    }

    function sortHandler(event) {
        const value = event.target.value;
        const sliceString = value.split('_');
        const newFiltersArray = [...totalFilters, category[0], priceFilter[0], priceFilter[1], genre[0], discount[0], { search: search_Activity }, { sort: sliceString[0] }, { typeSort: sliceString[1] }]
        dispatch(sortAction([{ sort: sliceString[0] }, { typeSort: sliceString[1] }]));
        dispatch(getProducts(newFiltersArray));
    }

    function priceSubmit(value) {
        if (value) {
            const newFiltersArray = [...totalFilters, category[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: value.min }, { maxPrice: value.max }];
            dispatch(priceFilterAction([{ minPrice: value.min }, { maxPrice: value.max }]));
            dispatch(getProducts(newFiltersArray));
        }
        else {
            const newFiltersArray = [...totalFilters, category[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: '' }, { maxPrice: '' }];
            dispatch(priceFilterAction(['', '']));
            dispatch(getProducts(newFiltersArray));
        }
    }

    function submitPriceInput() {
        if (minimumValue && maximumValue) {
            if (minimumValue <= maximumValue) {
                const newFiltersArray = [...totalFilters, category[0], sort[0], sort[1], genre[0], discount[0], { search: search_Activity }, { minPrice: minimumValue }, { maxPrice: maximumValue }];
                dispatch(priceFilterAction([{ minPrice: minimumValue }, { maxPrice: maximumValue }]));
                dispatch(getProducts(newFiltersArray));
            }
            else
                alert('El precio mínimo debe ser menor al precio máximo');
        }
        else alert('Debe completar ambos campos');
    }

    useEffect(() => {
        /* const sumFilters = [...totalFilters, priceFilter[0], priceFilter[1], sort[0], sort[1], genre[0], { search: search_Activity }]
        dispatch(getProducts(sumFilters)); */
        dispatch(responsiveNavBar(false));
    }, []);

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.sliderContainer}>
                    <div className={styles.sortBy}>
                        <Sort sortHandler={sortHandler} />
                    </div>
                    <div className={styles.resultsBox}>
                        <SearchResults search={category[0].category || search_Activity} totalCount={totalFilteredCount} />
                        <div className={styles.divider}></div>
                    </div>
                    <div className={styles.filterBox}>
                        <PriceBox priceFilter={priceFilter} priceSubmit={priceSubmit} submitPriceInput={submitPriceInput} setMaximumValue={setMaximumValue} setMinimumValue={setMinimumValue} minimumValue={minimumValue} maximumValue={maximumValue} />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <GenreBox genre={genre} genreHandler={genreHandler} />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <Sports />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <Brands />
                    </div>
                    {/* <div className={styles.filterBox}>
                        <SizeBox />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <ColorBox />
                    </div>
                    <div className={styles.divider}></div> */}
                </div>
            </div>
            <div className={styles.layoutUp}>
            </div>
            <div className={styles.layoutDown}>
            </div>
        </div>
    );
}

export default FilterBar;