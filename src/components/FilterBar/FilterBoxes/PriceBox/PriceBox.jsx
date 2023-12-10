import styles from './PriceBox.module.css';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

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
            <div className={styles.buttonContainer}>
                <ButtonComponent text='Aplicar filtro'/>
            </div>
        </div>
    );
}

export default PriceBox;