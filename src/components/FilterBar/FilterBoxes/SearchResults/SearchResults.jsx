import styles from './SearchResults.module.css';

function SearchResults(props) {
    const {search, totalCount} = props;
    return (
        <div className={styles.mainView}>
            <p>Buscando:</p>
            <p className={styles.searchText}>{`"${search}"`}</p>
            <p>Resultados: {totalCount}</p>
        </div>
    );
}

export default SearchResults;