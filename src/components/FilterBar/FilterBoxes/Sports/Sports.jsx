import styles from './Sports.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../helpers/config';
import capitalize from '../../../../utils/capitalize';

function Sports({ sportHandler, sport }) {
    const [sportArray, setSportArray] = useState(null);

    async function getSports() {
        // const { data } = await axios(`${API_URL}/property?property=${property}`);
        const { data } = await axios(`${API_URL}/product/sports`);
        setSportArray(data);
    }


    useEffect(() => {
        getSports(); // recuperamos los deportes que existen en nuestra base de datos.
    }, []);

    return (
        <div className={styles.mainView}>
            <p className={styles.title}>Deportes</p>
            <div className={styles.genreBox}>
                {sportArray?.map((_sport, i) => {
                    return <p onClick={sportHandler} id={_sport.name} key={i} className={sport[0].sport === _sport.name ? styles.selected : ''}>{capitalize(_sport.name)}</p>
                })}
            </div>
        </div>
    );
}

export default Sports;