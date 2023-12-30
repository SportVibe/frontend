import { useState } from 'react';
import styles from './EditUser.module.css';
import ButtonComponent from '../../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';
import axios from 'axios';
import { API_URL } from '../../../helpers/config';

function EditUser({ editUserData, setEditUserData, isValidEmail, handleSubmit }) {
    const [containerHidden, setContainerHidden] = useState(true);
    const [deleteHidden, setDeleteHidden] = useState(true);
    const [password, setPassword] = useState({p1: '', p2: ''});
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

    function handleContainerHidden(e) {
        const id = e.target.id;
        if (id === 'changePassword') {
            setContainerHidden(!containerHidden);
        }
        else {
            setDeleteHidden(!deleteHidden);
        }
    }

    function handleChangeInput(e) {
        const id = e.target.id;
        const value = e.target.value;
        setEditUserData({ ...editUserData, [id]: value })
        console.log({ ...editUserData, [id]: value });
    }

    function handlePasswordVerify(e) {
        const id = e.target.id;
        const value = e.target.value;
        setPassword({ ...password, [id]: value });
    }

    async function handleDelete() {
        if (password.p1 !== '' && password.p2 !== '' && password.p1 === password.p2) {
            const { data } = await axios.post(`${API_URL}/login`, {email: email, password: password.p1});
            if (data) { // Aquí es donde seteamos en false el borrado lógico para mandarlo al backend.
                setEditUserData({ ...editUserData, active: false });
                handleSubmit({ ...editUserData, active: false });
            }
            else alert('Contraseña inválida');
        }
        else alert('Las contraseñas no coinciden');
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
                        <p className={styles.p} id='changePassword' onClick={handleContainerHidden}>Cambiar contraseña</p>
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
                    <ButtonComponent text={'Aplicar cambios'} />
                </div>
                <div className={deleteHidden ? styles.deleteAcountHidden : styles.deleteAcountContainer}>
                    <p className={styles.p} id='deleteAcount' onClick={handleContainerHidden}>Eliminar cuenta</p>
                    <div className={styles.inputPasswordContainer}>
                        <p className={styles.BorrarCuentaP}>Para borrar su cuenta debe ingresar su contraseña</p>
                        <div className={styles.inputContainer}>
                            <input id='p1' onChange={handlePasswordVerify} value={password.p1} type="password" autoComplete='off' placeholder='Contraseña' />
                        </div>
                        <div className={styles.inputContainer}>
                            <input id='p2' onChange={handlePasswordVerify} value={password.p2} type="password" autoComplete='off' placeholder='Repita su contraseña' />
                        </div>
                        <div onClick={handleDelete} className={styles.submitButtoncontainer}>
                            <ButtonComponent text={'Eliminar cuenta'} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;