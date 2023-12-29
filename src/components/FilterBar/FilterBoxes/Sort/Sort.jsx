import styles from './Sort.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, sortAction } from '../../../../redux/actions';

function Sort() {
    const dispatch = useDispatch();
    const search_Activity = useSelector((state => state.search));
    const totalFilters = useSelector((state => state.totalFilters));
    const priceFilter = useSelector((state => state.priceFilter));
    const genre = useSelector((state => state.genre));
    const discount = useSelector((state => state.discount));

    function sortHandler(event) {
        const value = event.target.value;
        const sliceString = value.split('_');
        const newFiltersArray = [...totalFilters, priceFilter[0], priceFilter[1], genre[0], discount[0], { search: search_Activity }, { sort: sliceString[0] }, { typeSort: sliceString[1] }]
        dispatch(sortAction([{ sort: sliceString[0] }, { typeSort: sliceString[1] }]));
        dispatch(getProducts(newFiltersArray));
    }

    return (
        <div className={styles.sortBox}>
            <p>Ordenar por:</p>
            <select onChange={sortHandler} className={styles.selectSort}>
                {/* <option value="1">Mas vendidos</option>
                <option value="2">Menos vendidos</option> */}
                <option value="id_desc">Mas reciente</option>
                <option value="id_asc">Menos reciente</option>
                <option value="price_desc">Mayor precio</option>
                <option value="price_asc">Menor precio</option>
                {/* <option value="1">Mas visitas</option>
                <option value="2">Menos visitas</option> */}
            </select>
        </div>
    );
}

export default Sort;