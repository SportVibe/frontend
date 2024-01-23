import { useDispatch, useSelector } from 'react-redux';
import { cartAction, displayDropDownAction, getAdminUserAction, getCurrentUserAction, quantityCartAction } from '../../../redux/actions';
import styles from './DropDown.module.css';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../../context/AuthContext';

function DropDown({ currentUserData }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let adminLocalStorage = JSON.parse(localStorage.getItem('adminUser'));
    const currentAdminData = adminLocalStorage ? adminLocalStorage : null;
    const { user, logOut } = UserAuth() ?? {};

    function handleNavigate() {
        if (!currentUserData && currentAdminData) {
            navigate('/dashboard');
        }
        else if (currentUserData && !currentAdminData) {
            navigate('/profile');
        }
    }

    async function handleSignOut() {
        try {
            dispatch(displayDropDownAction(false));
            // solo usamos el logOut de Firebase si el usuario es externo(externalSignIn en true)
            if (((currentUserData && currentUserData?.externalSignIn) || (currentAdminData && currentAdminData?.externalSignIn)) && logOut) await logOut();
            // reseteamos la data a renderizar y el local storage y automáticamente eso nos redirige al home.
            localStorage.removeItem('currentUser');
            localStorage.removeItem('adminUser');
            localStorage.removeItem('currentCart');
            dispatch(quantityCartAction(0));
            dispatch(getAdminUserAction(null));
            dispatch(getCurrentUserAction(null));
            dispatch(cartAction(null));
            // y nos aseguramos de irnos al home ya que hicimos un log out.
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <div className={styles.dropDownContainer}>
            <p className={styles.name}>Luca Bruzzone</p>
            <div className={styles.lowSection}>
                {currentAdminData &&
                    <div onClick={handleNavigate}>
                        <i onClick={handleNavigate} className="fa-solid fa-chart-line"></i>
                        <p onClick={handleNavigate}>Dashboard</p>
                    </div>}
                {currentUserData &&
                    <div onClick={handleNavigate}>
                        <i onClick={handleNavigate} className="fa-regular fa-user"></i>
                        <p onClick={handleNavigate}>Mi perfil</p>
                    </div>}
                <div onClick={handleSignOut}>
                    <i onClick={handleSignOut} className="fa-solid fa-arrow-right-from-bracket"></i>
                    <p onClick={handleSignOut}>Cerrar sesión</p>
                </div>
            </div>
        </div>
    );
}

export default DropDown;