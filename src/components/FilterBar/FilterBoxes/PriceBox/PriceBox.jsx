import styles from './PriceBox.module.css';
import Button from 'react-bootstrap/Button';

function PriceBox() {
    return (
        <div className={styles.mainView}>
            <p>Precio $USD</p>
            <div className={styles.rangeBox}>
                <div className={styles.inputBox}>
                    <input type="text" placeholder='Mínimo' />
                </div>
                <p>➖</p>
                <div className={styles.inputBox}>
                    <input type="text" placeholder='Máximo' />
                </div>
            </div>
            <div className={styles.button}>
                <Button variant="primary">Agregar filtro</Button>{' '}
            </div>
        </div>
    );
}

export default PriceBox;