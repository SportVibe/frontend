import styles from './SearchResults.module.css';

function SearchResults() {
    return (
        <div className={styles.mainView}>
            <div className={styles.boxContainer}>
                <div className={styles.boxImage}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <div className={styles.listContainer}>
                    <p className={styles.title}>No hay productos que coincidad con la búsqueda</p>
                    <ul>
                        <li>Lo que buscaste podría tener errores ortográficos</li>
                        <li>Prueba escribiendo palabras más precisas</li>
                        <li>Utiliza la búsqueda por <a href='/'>categorías</a>, luego filtra el resultado</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;