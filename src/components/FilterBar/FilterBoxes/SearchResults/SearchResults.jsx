import styles from './SearchResults.module.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getProducts, searchActivity } from "../../../../redux/actions";

function SearchResults(props) {
    const dispatch = useDispatch();
    const { search, totalCount } = props;

    /* useEffect(() => {
        dispatch(getProducts());
        dispatch(searchActivity(""));
    }, []); */
    return (
        <div className={styles.mainView}>
            <p>Estás buscando:</p>
            {/* <p>Resultados encontrados: {totalCount}</p> */}
            {search ?
                <p className={styles.searchText}>{`"${search}"`} <span>{`(${totalCount})`}</span></p>
                :
                <p className={styles.searchText}>Todo <span>{`(${totalCount})`}</span></p>
            }
        </div>
    );
}

export default SearchResults;