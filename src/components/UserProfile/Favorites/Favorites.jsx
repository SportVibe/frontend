import styles from './Favorites.module.css';
import ProductCard from '../../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../helpers/config';
import Loading from '../../loading/Loading';

function Favorites({ userDataRender, reloadPage, setReloadPage }) {
    const [productRender, setProductRender] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFavoriteProducts() {
        try {
            setLoading(true);
            const products = userDataRender?.favorites?.map(async (id) => {
                const { data } = await axios(`${API_URL}/detail/${id}`);
                return data.data;
            });
            const favoriteProducts = await Promise.all(products);
            // console.log(favoriteProducts);
            setProductRender(favoriteProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los productos favoritos:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getFavoriteProducts();
    }, []);

    return (
        <div className={styles.mainVew}>
            {loading ?
                <Loading />
                :
                <div className={styles.suMainVew}>
                    <div className={styles.conteinerCards}>
                        {productRender?.length > 0 && productRender.map((product, i) => {
                            return (
                                <div key={i} className={styles.cardComponentContainer}>
                                    <ProductCard productData={product} setFavReload={setReloadPage} favReload={reloadPage} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default Favorites;