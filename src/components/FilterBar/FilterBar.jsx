import styles from './FilterBar.module.css';
import { useSelector } from 'react-redux';
import { PriceBox, SizeBox, ColorBox, GenreBox, Sort, SearchResults } from '../../helpers/filterComponents.jsx';


function FilterBar() {
    const search_Activity = useSelector((state => state.search));
    const { totalFilteredCount } = useSelector((state) => state.products);
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