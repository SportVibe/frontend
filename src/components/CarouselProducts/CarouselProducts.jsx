import styles from './CarouselProducts.module.css';
import img from '../../Images/Running-Pons-Trainingok.webp'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCarousel2Products } from '../../redux/actions';
import ProductCard from '../ProductCard/ProductCard';

const CrouselProducts = () => {
    const dispatch = useDispatch();
    const productRender = useSelector((state) => state.carousel2Render);

    useEffect(() => {
        dispatch(getCarousel2Products());
    }, []);

    return (
        <div className={styles.mainView}>
            <p className={styles.DeportesTitle}>Lo más buscado</p>
            <div className={styles.carouselContainer}>
                {productRender.data?.length > 0 && productRender.data.map((product, i) => {
                    return (
                        <div key={i} className={styles.cardComponentContainer}>
                            <ProductCard productData={product} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default CrouselProducts;


