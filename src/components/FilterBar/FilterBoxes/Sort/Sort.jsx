import styles from './Sort.module.css';

function Sort() {
    return (
        <div className={styles.sortBox}>
            <p>Ordenar por:</p>
            <select className={styles.selectSort}>
                <option value="1">Mas vendidos</option>
                <option value="2">Menos vendidos</option>
                <option value="1">Mas reciente</option>
                <option value="2">Menos reciente</option>
                <option value="1">Mas visitas</option>
                <option value="2">Menos visitas</option>
            </select>
        </div>
    );
}

export default Sort;