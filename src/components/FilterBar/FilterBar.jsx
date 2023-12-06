import styles from './FilterBar.module.css';
import PriceBox from './FilterBoxes/PriceBox/PriceBox';
import SizeBox from './FilterBoxes/SizeBox/SizeBox';
import ColorBox from './FilterBoxes/ColorBox/ColorBox';
import GenreBox from './FilterBoxes/GenreBox/GenreBox';

function FilterBar() {
    return (
        <div className={styles.mainView}>
            <div  className={styles.filterBox}>
                <PriceBox />
            </div>
            <div  className={styles.filterBox}>
                <SizeBox />
            </div>
            <div  className={styles.filterBox}>
                <ColorBox />
            </div>
            <div  className={styles.filterBox}>
                <GenreBox />
            </div>
        </div>
    );
}

export default FilterBar;