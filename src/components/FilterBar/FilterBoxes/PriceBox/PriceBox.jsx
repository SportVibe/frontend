import { useState } from 'react';
import styles from './PriceBox.module.css';
import { useSelector } from 'react-redux';

function PriceBox({ priceFilter, priceSubmit, submitPriceInput, setMinimumValue, setMaximumValue, minimumValue, maximumValue }) {

    function priceHandler(event) {
        const id = event.target.id;
        if (id === '') {
            priceSubmit(null);
        }
        else {
            const [min, max] = id.split('_');
            priceSubmit({ min: parseInt(min), max: parseInt(max) });
        }
    }

    function inputHandler(event) {
        const id = event.target.id;
        const value = parseFloat(event.target.value);
        if (Number.isInteger(value)) {
            if (id === 'minimum') setMinimumValue(value);
            if (id === 'maximum') setMaximumValue(value);
        }
    }

    return (
        <div className={styles.mainView}>
            <p className={styles.title}>Rango de precio</p>
            <div className={styles.rangeBox}>
                <p id='' onClick={priceHandler} className={(priceFilter[0] === '' && priceFilter[0] === '') ? styles.selected : ''}>Todo</p>
                <p id='0_60' onClick={priceHandler} className={(priceFilter[0].minPrice === 0 && priceFilter[1].maxPrice === 60) ? styles.selected : ''}>Hasta $60.00</p>
                <p id='60_150' onClick={priceHandler} className={(priceFilter[0].minPrice === 60 && priceFilter[1].maxPrice === 150) ? styles.selected : ''}>$60.00 - $150.00</p>
                <p id='150_99999999' onClick={priceHandler} className={(priceFilter[0].minPrice === 150 && priceFilter[1].maxPrice === 99999999) ? styles.selected : ''}>Más de $150.00</p>
                <div className={styles.inputDiv}>
                    <input value={minimumValue} id='minimum' onChange={inputHandler} type="number" min={0} placeholder='Mínimo' />
                    <p>-</p>
                    <input value={maximumValue} id='maximum' onChange={inputHandler} type="number" min={0} placeholder='Máximo' />
                    <i onClick={submitPriceInput} className="fa-regular fa-circle-play"></i>
                </div>
            </div>
        </div>
    );
}

export default PriceBox;