import styles from './ColorBox.module.css';
import Button from 'react-bootstrap/Button';

function ColorBox() {
    return (
        <div className={styles.mainView}>
            <p>Color</p>
            <ul className={styles.ul}>
                {/* <li>Blanco</li>
                <li>Rojo</li>
                <li>Naranja</li>
                <li>Amarillo</li>
                <li>Verde</li>
                <li>Azul</li>
                <li>Púrpura</li>
                <li>Rosa</li>
                <li>Gris</li>
                <li>Negro</li> */}
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className={styles.button}>
                <Button variant="primary">Agregar filtro</Button>{' '}
            </div>
        </div>
    );
}

export default ColorBox;