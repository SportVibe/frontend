import styles from './UserProfile.module.css';
/* import img1 from '../../Images/imagesVidal.jpeg'; */
import { Table } from '../../helpers/indexComponents';

function UserProfile() {
    const imgUser = null;

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
                            <div className={styles.editProfile}>
                                <i className="fa-regular fa-pen-to-square"></i>
                                <p>Editar</p>
                            </div>
                            <div className={styles.editProfile}>
                                <p>Cerrar sesión</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className={styles.divider}></div> */}
                    <div className={styles.footerSideSection}>
                        <div className={styles.div}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>Mi historial de compra</p>
                        </div>
                        <div className={styles.div}>
                            <i className="fa-regular fa-heart"></i>
                            <p>Mis favoritos</p>
                        </div>
                        <div className={styles.div}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <p>Mis búsquedas</p>
                        </div>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <div className={styles.tableContainer}>
                        <Table records={null} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;