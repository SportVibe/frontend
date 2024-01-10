import { useEffect, useState } from 'react';
import styles from './Sports.module.css';
import axios from 'axios';
import { API_URL } from '../../../../helpers/config';
import capitalize from '../../../../utils/capitalize';

function Sports() {
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
                {sportArray?.map((sport, i) => {
                    return <p key={i}>{capitalize(sport.name)}</p>
                })}
            </div>
        </div>
    );
}

export default Sports;