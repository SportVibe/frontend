import styles from './Sort.module.css';
import { useState } from 'react';

function Sort() {
    const [sorts, setSorts] = useState({
        porVentas: '',
        porVisitas: '',
        porRelevancias: '',
    })

    return (
        <div className={styles.mainView}>
            <div className={styles.sortContainer}>
                <div className={styles.sortBox}>
                    <p className={styles.option}>Mas vendidos</p>
                    <p className={styles.option}>Menos vendidos</p>
                    <p className={styles.slideLeft}></p>
                </div>
                <div className={styles.sortBox}>
                    <p className={styles.option}>Mas visitas</p>
                    <p className={styles.option}>Menos visitas</p>
                    <p className={styles.slideLeft}></p>
                </div>
                <div className={styles.sortBox}>
                    <p className={styles.option}>Mas reciente</p>
                    <p className={styles.option}>Menos reciente</p>
                    <p className={styles.slideLeft}></p>
                </div>
            </div>
        </div>
    );
}

export default Sort;