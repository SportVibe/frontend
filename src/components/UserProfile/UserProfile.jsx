import styles from './UserProfile.module.css';
/* import img1 from '../../Images/imagesVidal.jpeg'; */
import { Table } from '../../helpers/indexComponents';
import EditUser from "./EditUser/EditUser";
import { useEffect, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import upperLowerCase from '../../utils/upperLowerCase';
import { getCurrentUserAction } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


function UserProfile() {
    const imgUser = null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, logOut } = UserAuth();
    const [mainComponent, setMainComponent] = useState('purchasesTable');
    const storageData = window.localStorage.getItem('currentUser');
    const userData = storageData ? JSON.parse(storageData) : null;
    const userDataRender = useSelector((state) => state.currentUserData); // data del usuario a renderizar
    const { id } = userDataRender ? userDataRender : '';
    // convertimos los nombres en iniciales para mostrar en la foto de perfil si esque no tiene imagen.
    const firstNameFull = userDataRender?.firstName ? userDataRender.firstName : '';
    const lastNameFull = userDataRender?.lastName ? userDataRender.lastName : '';
    let firstName = userDataRender?.firstName.charAt(0).toUpperCase();
    let lastName = userDataRender?.lastName && userDataRender.lastName.charAt(0).toUpperCase();
    if (!lastName && userDataRender) { // extraemos las iniciales del usuario en mayúscula, si el usuario no rellenó el campo lastName, usamos la segunda letra de su firstName.
        const splitFirstName = firstNameFull.split(' ');
        if (splitFirstName.length > 1) {
            lastName = splitFirstName[1].charAt(0).toUpperCase();
        }
        else {
            lastName = splitFirstName[0].charAt(1).toUpperCase();
        }
    }

    function handlerComponent(e) {
        const id = e.target.id;
        setMainComponent(id);
    }

    async function handleSignOut() {
        try {
            // solo usamos el logOut de Firebase si el usuario es externo(externalSignIn en true)
            if (userDataRender.externalSignIn) await logOut();
            // reseteamos la data a renderizar y el local storage y automáticamente eso nos redirige al home.
            localStorage.removeItem('currentUser');
            dispatch(getCurrentUserAction(null));
            // y nos aseguramos de irnos al home ya que hicimos un log out.
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleUserData() {
        try { // recuperamos toda la data necesaria del usuario en la base de datos, para renderizarla en su perfil.
            if (userData) {
                /* const { data } = await axios(`${API_URL}/user?email=${userData.user.email}&externalSignIn=${userData.user.externalSignIn}`); */
                const { data } = await axios(`${API_URL}/user/${id}`);
                dispatch(getCurrentUserAction(data));
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => { // si user existe (si está logeado) entonces se redirige al home.
        if (!storageData) {
            navigate('/');
        }
        handleUserData();
    }, [user]);

    return (
        <div className={styles.mainView}>
            {storageData ?
                <div className={styles.subMainView}>
                    <div className={styles.sideBarContainer}>
                        <div className={styles.headerSection}>
                            <div className={styles.userDataPreview}>
                                <div className={styles.imgContainer}>
                                    <div>
                                        {imgUser ?
                                            <img src={imgUser} alt="" /> :
                                            <p>{firstName}{lastName}</p>
                                        }
                                    </div>
                                </div>
                                <p className={styles.name}>{upperLowerCase(firstNameFull)} {upperLowerCase(lastNameFull)}</p>
                                <p className={styles.userCode}>Código de usuario: {id}</p>
                            </div>
                            <div className={styles.buttonsContainer}>
                                <div className={mainComponent === 'editUser' ? styles.selectedProfile : styles.editProfile} id='editUser' onClick={handlerComponent}>
                                    <i className="fa-regular fa-pen-to-square" id='editUser' onClick={handlerComponent}></i>
                                    <p id='editUser' onClick={handlerComponent}>Editar</p>
                                </div>
                                <div onClick={handleSignOut} className={styles.editProfile}>
                                    <p onClick={handleSignOut}>Cerrar sesión</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.footerSideSection}>
                            <div className={mainComponent === 'purchasesTable' ? styles.divSelected : styles.div} id='purchasesTable' onClick={handlerComponent}>
                                <i className="fa-solid fa-cart-shopping" id='purchasesTable' onClick={handlerComponent}></i>
                                <p id='purchasesTable' onClick={handlerComponent}>Historial de compra</p>
                            </div>
                            <div className={mainComponent === 'favorites' ? styles.divSelected : styles.div} id='favorites' onClick={handlerComponent}>
                                <i className="fa-regular fa-heart" id='favorites' onClick={handlerComponent}></i>
                                <p id='favorites' onClick={handlerComponent}>Mis favoritos</p>
                            </div>
                            <div className={mainComponent === 'searchHistory' ? styles.divSelected : styles.div}>
                                <i className="fa-solid fa-magnifying-glass" id='searchHistory' onClick={handlerComponent}></i>
                                <p id='searchHistory' onClick={handlerComponent}>Historial de búsqueda</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainComponentsContainer}>
                        {mainComponent === 'purchasesTable' &&
                            <div className={styles.componentContainer}>
                                <Table records={null} />
                            </div>}
                        {mainComponent === 'editUser' &&
                            <div className={styles.componentContainer}>
                                <EditUser />
                            </div>}
                    </div>
                </div> :
                <Loading />
            }
        </div>
    );
}

export default UserProfile;