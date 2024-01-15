import styles from './Sports.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../helpers/config';
import capitalize from '../../../../utils/capitalize';
import { useSelector } from 'react-redux';

function Sports({ sportStatistics, sportHandler, sport, genre, brand }) {
    const [sportArray, setSportArray] = useState(null);
    const products = useSelector((state) => state.products);
    // con la variable "surviveFilters", recupero los filtros del filtrado madre, que se mantienen luego del filtrado secundario. Los que no, les bajamos la opacidad en el renderizado.
    const surviveFilters = (products && products?.filterStatics?.sportStatistics?.length) ? products?.filterStatics?.sportStatistics?.map(item => {
        return Object.values(item)[0];
    }) : [];

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const { data } = await axios(`${API_URL}/product/sports`);
        setSportArray(data);
    }

    useEffect(() => {
        /* getSports(); */ // recuperamos los deportes que existen en nuestra base de datos.
    }, []);

    return (
        <div className={styles.mainView}>
            <p className={styles.title}>Deportes</p>
            <div className={styles.genreBox}>
                {/* <p onClick={sportHandler} id='' className={sport[0]?.sport === '' ? styles.selected : ''}>Todo</p>
                {sportArray?.map((_sport, i) => {
                    return <p onClick={sportHandler} id={_sport.name} key={i} className={sport[0]?.sport === _sport.name ? styles.selected : ''}>{capitalize(_sport.name)}</p>
                })} */}
                <p id='' onClick={sportHandler} className={sport[0].sport === '' ? styles.selected : ''}>Todo</p>
                {sportStatistics && sportStatistics.length && sportStatistics.map((item, i) => {
                    return <p key={i} id={item.sport} onClick={sportHandler} className={sport[0].sport === item.sport ? styles.selected : ''}>{capitalize(item.sport)} <span>{`(${item.productCount})`}</span></p>
                })}
            </div>
        </div>
    );
}

export default Sports;