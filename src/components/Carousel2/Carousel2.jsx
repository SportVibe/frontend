import styles from './Carousel2.module.css';
// import logoImage from '../../Images/Logo.jpg';
import CarouselCard from './CarouselCar/CarouselCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import FalseCard from '../FalseCard/FalseCard';
import { discountProducts, genreFilterAction, getProducts, priceFilterAction, sortAction } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Carousel2() {
    const count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productArray, setProductArray] = useState(null);
    const limit = 20;

    async function getProductsWithDiscount() {
        try {
            const { data } = await axios(`${API_URL}/product/discount?limit=${limit}`);
            if (data && data.length) setProductArray(data);
        } catch (error) {
            console.error({ error: error.message });
        }
    }

    const handleFilter = () => {
        const propertiesArray = [{ discount: 1 }]
        // reseteamos todos los filtrso y ordenamientos
        dispatch(genreFilterAction([{ gender: '' }]));
        dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
        dispatch(priceFilterAction(['', '']));
        dispatch(discountProducts([{ discount: 1 }]));

        dispatch(getProducts(propertiesArray));
        navigate('/search');
    };

    useEffect(() => {
        getProductsWithDiscount();
    }, []);

    return (
        <div className={styles.mainView}>
            <div className={styles.mostSold} onClick={handleFilter}>
                <p>Revisa nuestras ofertas!</p>
            </div>
            <div className={styles.backgroundMidle}>
            </div>
            <div className={styles.subMainView}>
                <ul className={styles.ul}>
                    {productArray?.length ? productArray.map((item, i) => {
                        return (
                            <div key={i} className={styles.imgContainer}>
                                <CarouselCard productData={item} />
                            </div>
                        )
                    }) :
                        count.map((item, i) => {
                            return (
                                <div key={i} className={styles.imgContainerFalse}>
                                    <div className={styles.falseCard}>
                                    </div>
                                </div>
                            )
                        })}
                </ul>
            </div>
            {/* <div className={styles.layoutLeft}>
            </div>
            <div className={styles.layoutRight}>
            </div> */}
        </div>
    );
}

export default Carousel2;