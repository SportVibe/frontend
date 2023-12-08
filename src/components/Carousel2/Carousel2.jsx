import styles from './Carousel2.module.css';
import { useEffect, useState } from 'react';
import logoImage from '../../Images/Logo.jpg';
import { allProductsApiPlatzi } from '../../utils/endpoints';

function Carousel2() {
    const [productArray, setProductArray] = useState(null);
    const count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    async function getAllExternalProducts() {
        await allProductsApiPlatzi().then(response => {
            setProductArray(response);
        });
    }
    useEffect(() => {
        getAllExternalProducts();
    }, []);
    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <ul className={styles.ul}>
                    {productArray?.length ? count.map((item, i) => {
                        const price = productArray[i].price;
                        let priceFormat = (price / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        return (
                            <div key={i} className={styles.imgContainer}>
                                <div className={styles.img}>
                                    <img src={productArray[i].images[0]} alt="" />
                                </div>
                                <p className={styles.nameAfter}>Mas vendido</p>
                                <p className={styles.priceAfter}>$ {priceFormat}</p>
                            </div>
                        )
                    }) :
                        count.map((item, i) => {
                            return (
                                <div key={i} className={styles.imgContainer}>
                                    <div className={styles.img}>
                                        <img src={logoImage} alt="" />
                                    </div>
                                    <p className={styles.nameAfter}>Mas vendido</p>
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