import styles from './UserProfile.module.css';
/* import img1 from '../../Images/imagesVidal.jpeg'; */
import { Table } from '../../helpers/indexComponents';
import DataTable from 'react-data-table-component';
import EditUser from "./EditUser/EditUser";
import { useState } from 'react';

function UserProfile() {
    const imgUser = null;
    const [mainComponent, setMainComponent] = useState('purchasesTable');

    function handlerComponent(e) {
        const id = e.target.id;
        setMainComponent(id);
    }

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.sideBarContainer}>
                    <div className={styles.headerSection}>
                        <div className={styles.userDataPreview}>
                            <div className={styles.imgContainer}>
                                <div>
                                    {imgUser ?
                                        <img src={imgUser} alt="" /> :
                                        <p>LB</p>
                                    }
                                </div>
                            </div>
                            <p className={styles.name}>Luca Bruzzone</p>
                            <p className={styles.userCode}>Código de usuario: 234-532AD-s34Rff</p>
                        </div>
                        <div className={styles.buttonsContainer}>
                            <div className={mainComponent === 'editUser' ? styles.selectedProfile : styles.editProfile} id='editUser' onClick={handlerComponent}>
                                <i className="fa-regular fa-pen-to-square" id='editUser' onClick={handlerComponent}></i>
                                <p id='editUser' onClick={handlerComponent}>Editar</p>
                            </div>
                            <div className={styles.editProfile}>
                                <p>Cerrar sesión</p>
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
            </div>
        </div>
    );
}

export default UserProfile;