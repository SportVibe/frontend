import { useState } from 'react';
import styles from './EditUser.module.css';
import ButtonComponent from '../../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';

function EditUser({ editUserData, setEditUserData, isValidEmail, handleSubmit }) {
    const [containerHidden, setContainerHidden] = useState(true);
    let { externalSignIn, active, firstName, lastName, phoneNumber, address, city, country, zipCode, email, sendMailsActive } = editUserData ?? {};
    externalSignIn = externalSignIn ? externalSignIn : '';
    active = active ? active : '';
    firstName = firstName ? firstName : '';
    lastName = lastName ? lastName : '';
    phoneNumber = phoneNumber ? phoneNumber : '';
    address = address ? address : '';
    city = city ? city : '';
    country = country ? country : '';
    zipCode = zipCode ? zipCode : '';
    email = email ? email : '';
    sendMailsActive = sendMailsActive ? sendMailsActive : '';

    function handleContainerHidden() {
        setContainerHidden(!containerHidden);
    }

    function handleChangeInput(e) {
        const id = e.target.id;
        const value = e.target.value;
        setEditUserData({ ...editUserData, [id]: value })
        console.log({ ...editUserData, [id]: value });
    }

    return (
        <div className={styles.mainView}>
            <p id={styles.title}>Información de usuario:</p>
            <div className={styles.subMainView}>
                <div className={styles.inputContainer}>
                    <input id='firstName' onChange={handleChangeInput} value={firstName} type="text" placeholder='firstName' />
                </div>
                <div className={styles.inputContainer}>
                    <input id='lastName' onChange={handleChangeInput} value={lastName} type="text" placeholder='lastName' />
                </div>
                <div className={styles.inputContainer}>
                    <input id='phoneNumber' onChange={handleChangeInput} value={phoneNumber} type="number" min={8} max={11} placeholder='phoneNumber' />
                </div>
                <div className={styles.inputContainer}>
                    <input id='address' onChange={handleChangeInput} value={address} type="text" placeholder='address' />
                </div>
                <div className={styles.inputContainer}>
                    <input id='city' onChange={handleChangeInput} value={city} type="text" placeholder='city' />
                </div>
                <div className={styles.inputContainer}>
                    <input id='country' onChange={handleChangeInput} value={country} type="text" placeholder='country' />
                </div>
                <div className={styles.inputContainer}>
                    <input id='zipCode' onChange={handleChangeInput} value={zipCode} type="number" min={5} max={10} placeholder='zipCode' />
                </div>
                {!externalSignIn &&
                    <div className={styles.inputContainer}>
                        <input id='email' className={!isValidEmail ? styles.inputContainerInvalid : ''} onChange={handleChangeInput} value={email} type="text" placeholder='email' />
                        {!isValidEmail && <p className={styles.invalidEmail}>Formato de correo incorrecto</p>}
                    </div>
                }
                {!externalSignIn &&
                    <div className={containerHidden ? styles.changePasswordHidden : styles.changePasswordContainer}>
                        <p className={styles.p} onClick={handleContainerHidden}>Cambiar contraseña</p>
                        <div className={styles.inputPasswordContainer}>
                            <div className={styles.inputContainer}>
                                <input type="password" autoComplete='off' placeholder='Contraseña actual' />
                            </div>
                            <div className={styles.inputContainer}>
                                <input type="password" autoComplete='off' placeholder='Nueva contraseña' />
                            </div>
                            <div className={styles.inputContainer}>
                                <input type="password" autoComplete='off' placeholder='Repita su nueva contraseña' />
                            </div>
                        </div>
                    </div>
                }
                <div onClick={handleSubmit} className={styles.submitButtoncontainer}>
                    <ButtonComponent text={'Aplicar cambios'}/>
                </div>
            </div>
        </div>
    );
}

export default EditUser;