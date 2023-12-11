import styles from './SearchResults.module.css';

function SearchResults(props) {
    const {search, totalCount} = props;
    return (
        <div className={styles.mainView}>
            {search && <p>Buscando:</p>}
            {search && <p className={styles.searchText}>{`"${search}"`}</p>}
            <p>Resultados: {totalCount}</p>
        </div>
    );
}

export default SearchResults;