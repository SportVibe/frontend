import styles from './Carousel2.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Carousel2() {
    const [productArray, setProductArray] = useState(null);
    const count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    useEffect(() => {
        axios('https://api.escuelajs.co/api/v1/products').then(({ data }) => {
            setProductArray(data)
        })
    }, []);
    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <ul className={styles.ul}>
                    {productArray?.length && count.map((item, i) => {
                        return (
                            <div key={i} className={styles.imgContainer}>
                                <div className={styles.img}>
                                    <img src={productArray[i].images[0]} alt="" />
                                </div>
                                <p className={styles.nameAfter}>categoría</p>
                            </div>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.layoutLeft}>
            </div>
            <div className={styles.layoutRight}>
            </div>
        </div>
    );
}

export default Carousel2;