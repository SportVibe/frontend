import styles from './Sort.module.css';

function Sort({ sortHandler }) {

    return (
        <div className={styles.sortBox}>
            <select onChange={sortHandler} className={styles.selectSort}>
                <option value="">Ordenar por:</option>
                <option value="id_desc">Mas reciente</option>
                <option value="id_asc">Menos reciente</option>
                <option value="price_desc">Mayor precio</option>
                <option value="price_asc">Menor precio</option>
                <option value="averageScore_desc">Mejor evaluados</option>
            </select>
        </div>
    );
}

export default Sort;