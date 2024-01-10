import styles from './SearchResults.module.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getProducts, searchActivity } from "../../../../redux/actions";

function SearchResults(props) {
    const dispatch = useDispatch();
    const { search, totalCount } = props;

    useEffect(() => {
        dispatch(getProducts());
        dispatch(searchActivity(""));
    }, []);
    return (
        <div className={styles.mainView}>
            {search && <p className={styles.searchText}>{`"${search}"`}</p>}
            <p>Resultados encontrados: {totalCount}</p>
        </div>
    );
}

export default SearchResults;