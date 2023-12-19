import styles from './FilterBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PriceBox, SizeBox, ColorBox, GenreBox, Sort, SearchResults } from '../../helpers/filterComponents.jsx';
import SearchBar from '../NavBar/SearchBar/SearchBar';
import { useEffect } from 'react';
import { getProducts, responsiveNavBar } from '../../redux/actions';


function FilterBar() {
    const dispatch = useDispatch();
    const { totalFilteredCount } = useSelector((state) => state.products);
    const search_Activity = useSelector((state => state.search));

    useEffect(() => {
        /* const sumFilters = [...totalFilters, priceFilter[0], priceFilter[1], sort[0], sort[1], genre[0], { search: search_Activity }]
        dispatch(getProducts(sumFilters)); */
        dispatch(responsiveNavBar(false));
    }, []);

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.sliderContainer}>
                    <div className={styles.filterBox}>
                        <SearchResults search={search_Activity} totalCount={totalFilteredCount} />
                        <div className={styles.divider}></div>
                    </div>
                    <div className={styles.filterBox}>
                        <Sort />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <PriceBox />
                    </div>
                    {/* <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <SizeBox />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <ColorBox />
                    </div>
                    <div className={styles.divider}></div> */}
                    <div className={styles.filterBox}>
                        <GenreBox />
                    </div>
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