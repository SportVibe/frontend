import styles from './PriceBox.module.css';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { getProducts, priceFilterAction } from '../../../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function PriceBox() {
    const dispatch = useDispatch();
    const [minimumValue, setMinimumValue] = useState('');
    const [maximumValue, setMaximumValue] = useState('');
    const search_Activity = useSelector((state => state.search));
    const sort = useSelector((state => state.sort));
    const genre = useSelector((state => state.genre));
    const totalFilters = useSelector((state) => state.totalFilters);

    function inputHandler(event) {
        const id = event.target.id;
        const value = parseFloat(event.target.value);
        if (Number.isInteger(value)) {
            if (id === 'minimum') setMinimumValue(value);
            if (id === 'maximum') setMaximumValue(value);
        }
    }

    function submit() {
        if (minimumValue <= maximumValue) {
            const newFiltersArray = [...totalFilters, sort[0], sort[1], genre[0], { search: search_Activity }, { minPrice: minimumValue }, { maxPrice: maximumValue }];
            dispatch(priceFilterAction([{ minPrice: minimumValue }, { maxPrice: maximumValue }]));
            dispatch(getProducts(newFiltersArray));
        }
        else
        alert('El precio mínimo debe ser menor al precio máximo');
    }

    return (
        <div className={styles.mainView}>
            <p>Precio $USD</p>
            <div className={styles.rangeBox}>
                <div className={styles.inputBox}>
                    <input id='minimum' onChange={inputHandler} type="text" placeholder='Mínimo' />
                </div>
                <p>➖</p>
                <div className={styles.inputBox}>
                    <input id='maximum' onChange={inputHandler} type="text" placeholder='Máximo' />
                </div>
            </div>
            <div onClick={submit} className={styles.buttonContainer}>
                <ButtonComponent text='Aplicar filtro' />
            </div>
        </div>
    );
}

export default PriceBox;