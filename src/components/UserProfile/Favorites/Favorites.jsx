import styles from './Favorites.module.css';
import ProductCard from '../../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../helpers/config';

function Favorites({ userDataRender }) {
    const [productRender, setProductRender] = useState([]);

    async function getFavoriteProducts() {
        try {
            const products = userDataRender?.favorites?.map(async (id) => {
                const { data } = await axios(`${API_URL}/detail/${id}`);
                return data.data;
            });
            const favoriteProducts = await Promise.all(products);
            // console.log(favoriteProducts);
            setProductRender(favoriteProducts)
        } catch (error) {
            console.error('Error al obtener los productos favoritos:', error);
        }
    }

    useEffect(() => {
        getFavoriteProducts();
    }, []);

    return (
        <div className={styles.mainVew}>
            <div className={styles.suMainVew}>
                <div className={styles.conteinerCards}>
                    {productRender?.length > 0 && productRender.map((product, i) => {
                        return (
                            <div key={i} className={styles.cardComponentContainer}>
                                <ProductCard productData={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Favorites;