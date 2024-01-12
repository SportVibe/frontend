import styles from './LoginModal.module.css';
import ButtonComponent from '../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';
import logo from '../../Images/logoSportvibeSolid.jpeg'
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';

function LoginModal({modal, setModal, handleLoginP}) {
    const navigate = useNavigate();
    const email = modal?.email ? modal.email : '';
    const id = modal?.id ? modal.id : '';
    const [password, setPassword] = useState({ p1: '', p2: '' });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleCloseModal(e) {
        const id = e.target.id;
        if (id === 'outSideModal') {
            setPassword({ p1: '', p2: '' });
            setModal(null)
        }

    }

    function handleChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        setPassword({ ...password, [id]: value });
    }

    async function handleSubmit(e) {
        try {
            if (password.p1 !== '' && password.p2 !== '' && password.p1 === password.p2) {
                setLoading(true);
                const { data } = await axios.post(`${API_URL}/login`, { email: email, password: password.p1 });
                if (data) { // Aquí es donde seteamos en true el borrado lógico para mandarlo al backend y reestablecer la cuenta del usuario.
                    const response = await axios.put(`${API_URL}/user/${id}`, { ...modal, active: true }); // reestablecemos en true.
                    if (response && response.status === 200) {
                        setLoading(false);
                        setSuccess(true);
                        setTimeout(() => {
                            handleLoginP(e);
                        }, 1000);
                    }
                }
                else {
                    setLoading(false);
                    Swal.fire("Contraseña invalida!");
                    setPassword({ p1: '', p2: '' });
                }
            }
            else {
                setLoading(false);
                Swal.fire("Las contraseñas no coinciden!");
                setPassword({ p1: '', p2: '' });
            }
        } catch (error) {
            setLoading(false);
            Swal.fire("Contraseña invalida!");
            setPassword({ p1: '', p2: '' });
            console.error({ error: error.message });
        }
    }

    return (
        <div id='outSideModal' className={styles.mainView} onClick={handleCloseModal}>
            {success ?
                <div className={styles.successContainer}>
                    <p>¡Su cuenta ha sido reestablecida con éxito!</p>
                </div> :
                <div>
                    {loading ?
                        <div>
                            <Loading />
                        </div> :
                        <div className={styles.formContainer}>
                            <div className={styles.logo}>
                                <img src={logo} alt="" />
                            </div>
                            <p>Se encontró una cuenta registrada anteriormente con este correo.</p>
                            <p>Si desea reestablecerla, ingrese su contraseña:</p>
                            <div className={styles.inputContainer}>
                                <input id='p1' onChange={handleChange} type="password" autoComplete='off' placeholder='Contraseña' />
                            </div>
                            <div className={styles.inputContainer}>
                                <input id='p2' onChange={handleChange} type="password" autoComplete='off' placeholder='Repita su contraseña' />
                            </div>
                            <div onClick={handleSubmit} className={styles.submitButtoncontainer}>
                                <ButtonComponent text={'Reestablecer cuenta'} />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default LoginModal;