import styles from './FilterBar.module.css';
import {PriceBox, SizeBox, ColorBox, GenreBox} from '../../helpers/filterComponents.jsx';


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