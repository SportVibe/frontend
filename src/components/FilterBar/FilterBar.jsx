import styles from './FilterBar.module.css';
import { PriceBox, SizeBox, ColorBox, GenreBox, Sort } from '../../helpers/filterComponents.jsx';


function FilterBar() {
    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.sliderContainer}>
                    <div className={styles.filterBox}>
                        <Sort />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <PriceBox />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <SizeBox />
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.filterBox}>
                        <ColorBox />
                    </div>
                    <div className={styles.divider}></div>
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