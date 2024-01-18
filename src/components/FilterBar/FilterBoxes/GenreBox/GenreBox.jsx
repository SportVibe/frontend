import styles from './GenreBox.module.css';
import capitalize from '../../../../utils/capitalize';
import { useSelector } from 'react-redux';
import normalizeString from '../../../../utils/normalizeString';

function GenreBox({ genderStatistics, genreHandler, genre, sport, brand }) {
    const products = useSelector((state) => state.products);
    // console.log(products.filterStatics.genderStatistics);
    // con la variable "surviveFilters", recupero los filtros del filtrado madre, que se mantienen luego del filtrado secundario. Los que no, les bajamos la opacidad en el renderizado.
    const surviveFilters = (products && products?.filterStatics?.genderStatistics?.length) ? products?.filterStatics?.genderStatistics?.map(item => {
        return Object.values(item)[0];
    }) : [];
    return (
        <div className={styles.mainView}>
            <p className={styles.title}>Géneros</p>
            <div className={styles.genreBox}>
                {/* <p id='' onClick={genreHandler} className={genre[0].gender === '' ? styles.selected : ''}>Todo</p>
                <p id='HOMBRE' onClick={genreHandler} className={genre[0].gender === 'HOMBRE' ? styles.selected : ''}>Hombre</p>
                <p id='MUJER' onClick={genreHandler} className={genre[0].gender === 'MUJER' ? styles.selected : ''}>Mujer</p> */}
                <p id='' onClick={genreHandler} className={genre[0].gender === '' ? styles.selected : ''}>Todo</p>
                {genderStatistics && genderStatistics.length && genderStatistics.map((item, i) => {
                    return <p key={i} id={item.gender} onClick={genreHandler} className={normalizeString(genre[0]?.gender.toUpperCase()) === normalizeString(item?.gender.toUpperCase()) ? styles.selected : ''}>{capitalize(item.gender)}</p>
                })}
            </div>
        </div>
    );
}

export default GenreBox;