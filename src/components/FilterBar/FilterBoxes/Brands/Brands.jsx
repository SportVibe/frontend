import { useEffect, useState } from 'react';
import styles from './Brands.module.css';
import axios from 'axios';
import { API_URL } from '../../../../helpers/config';
import capitalize from '../../../../utils/capitalize';

function Brands({ brandHandler, brand }) {
    const [brandArray, setBrandArray] = useState(null);

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const { data } = await axios(`${API_URL}/product/brands`);
        setBrandArray(data);
    }


    useEffect(() => {
        getSports(); // recuperamos los deportes que existen en nuestra base de datos.
    }, []);

    return (
        <div className={styles.mainView}>
            <p className={styles.title}>Marcas</p>
            <div className={styles.genreBox}>
                <p onClick={brandHandler} id='' className={brand[0]?.brand === '' ? styles.selected : ''}>Todo</p>
                {brandArray?.map((_brand, i) => {
                    return <p onClick={brandHandler} key={i} id={_brand.name} className={brand[0]?.brand === _brand.name ? styles.selected : ''}>{capitalize(_brand.name)}</p>
                })}
            </div>
        </div>
    );
}

export default Brands;