import styles from './FilterBar.module.css';
import { PriceBox, SizeBox, ColorBox, GenreBox, Sort } from '../../helpers/filterComponents.jsx';


function FilterBar() {
    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.sliderContainer}>
                    <div className={styles.filterBox}>
                        {/* <Sort /> */}
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Ordenar por</option>
                            <option value="1">Mas vendidos</option>
                            <option value="2">Menos vendidos</option>
                            <option value="1">Mas reciente</option>
                            <option value="2">Menos reciente</option>
                            <option value="1">Mas visitas</option>
                            <option value="2">Menos visitas</option>
                        </select>
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