import styles from './GenreBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { genreFilterAction, getProducts } from '../../../../redux/actions';

function GenreBox() {
    const dispatch = useDispatch();
    const totalFilters = useSelector((state => state.totalFilters));
    const priceFilter = useSelector((state => state.priceFilter));
    const sort = useSelector((state => state.sort));

    function genreHandler(event) {
        const name = event.target.name;
        const newFiltersArray = [...totalFilters, priceFilter[0], priceFilter[1], sort[0], sort[1], { gender: name }]
        dispatch(genreFilterAction([{ gender: name }]));
        dispatch(getProducts(newFiltersArray));
    }

    return (
        <div className={styles.mainView}>
            <p>Genre</p>
            <div className={styles.genreBox}>
                <div className={styles.button}>
                    <button name='HOMBRE' onClick={genreHandler}>Hombre</button>
                </div>
                <div className={styles.button}>
                    <button name='MUJER' onClick={genreHandler}>Mujer</button>
                </div>
                <div className={styles.button}>
                    <button name='' onClick={genreHandler}>Todo</button>
                </div>
            </div>
        </div>
    );
}

export default GenreBox;