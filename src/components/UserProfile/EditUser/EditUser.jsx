import { useState } from 'react';
import styles from './EditUser.module.css';

function EditUser() {
    const [containerHidden, setContainerHidden] =useState(true);

    function handleContainerHidden() {
        setContainerHidden(!containerHidden);
    }

    return (
        <div className={styles.mainView}>
            <p id={styles.title}>Información de usuario:</p>
            <div className={styles.subMainView}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='firstName' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='lastName' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='phoneNumber' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='phoneNumber' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='address' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='city' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='country' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='zipCode' />
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder='email' />
                </div>
                <div className={containerHidden ? styles.changePasswordHidden : styles.changePasswordContainer}>
                    <p className={styles.p} onClick={handleContainerHidden}>Cambiar contraseña</p>
                    <div className={styles.inputPasswordContainer}>
                        <div className={styles.inputContainer}>
                            <input type="text" placeholder='Contraseña actual' />
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" placeholder='Nueva contraseña' />
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="text" placeholder='Repita su nueva contraseña' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;