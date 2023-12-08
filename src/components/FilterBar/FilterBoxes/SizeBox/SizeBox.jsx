import styles from './SizeBox.module.css';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

function SizeBox() {
    return (
        <div className={styles.mainView}>
            <p>Size</p>
            <ul className={styles.ul}>
                <li>38</li>
                <li>40</li>
                <li>42</li>
                <li>44</li>
                <li>46</li>
                <li>48</li>
            </ul>
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
                <ButtonComponent text='Agregar filtro' />
            </div>
        </div>
    );
}

export default SizeBox;