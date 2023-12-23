import styles from './CarouselProducts.module.css';
import img from '../../Images/Running-Pons-Trainingok.webp'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import FalseCard from '../FalseCard/FalseCard';

const CrouselProducts = (prop) => {
    const displayCardAmount = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const property = prop.property || [];
    const [productArray, setProductArray] = useState(property);


    async function getProductsWithDiscount() {
        try {
            const { data } = await axios(`${API_URL}/product/discount`);
            if (data && data.length) setProductArray(data);
        } catch (error) {
            console.error({ error: error.message });
        }
    }

    useEffect(() => {
        getProductsWithDiscount();
    }, []);

    return (
        <div className={styles.mainView}>
            <p className={styles.DeportesTitle}>Lo más buscado</p>
            <div className={styles.carouselContainer}>
                {productArray.data?.length > 0 ? displayCardAmount.map((product, i) => {
                    const productR = productArray.data[i];
                    return (
                        <div key={i} className={styles.cardComponentContainer}>
                            <ProductCard productData={productR} />
                        </div>
                    )
                }) :
                    displayCardAmount.map((product, i) => {
                        return (
                            <div key={i} className={styles.cardComponentContainer}>
                                <FalseCard />
                            </div>
                        )
                    })}
            </div>
        </div>
    );
};

export default CrouselProducts;


