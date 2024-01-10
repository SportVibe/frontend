import { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar';
// import Logo from '../../Images/Logo.jpg';
import Logo from '../../Images/logoSportvibeSolid.jpeg';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  responsiveNavBar,
  searchActivity,
  getProducts,
  genreFilterAction,
  sortAction,
  priceFilterAction,
  categoryAction,
} from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import getLocalStorageData from '../../utils/getLocalStorage';

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCartQuantity = useSelector((state) => state.totalCartQuantity);
  const responsiveGlobalNavBar = useSelector((state) => state.responsiveNavBar);
  // const storageData = window.localStorage.getItem('currentUser');
  // const userData = storageData ? JSON.parse(storageData) : null;
  const userDataRender = useSelector((state) => state.currentUserData); // data del usuario a renderizar
  let currentAdminData = useSelector((state) => state.currentAdminData); // data del admin a renderizar
  let adminLocalStorage = JSON.parse(localStorage.getItem('adminUser'));
  currentAdminData = adminLocalStorage ? adminLocalStorage : null;
  // convertimos los nombres en iniciales para mostrar en la foto de perfil si esque no tiene imagen.
  const firstNameFull = userDataRender ? userDataRender.firstName : '';
  let firstName = userDataRender ? userDataRender.firstName?.charAt(0).toUpperCase() : '';
  let lastName = userDataRender ? userDataRender.lastName?.charAt(0).toUpperCase() : '';
  if (!lastName && firstNameFull) { // extraemos las iniciales del usuario en mayúscula, si el usuario no rellenó el campo lastName, usamos la segunda letra de su firstName.
    const splitFirstName = firstNameFull.split(' ');
    if (splitFirstName.length > 1) {
      lastName = splitFirstName[1].charAt(0).toUpperCase();
    }
    else {
      lastName = splitFirstName[0].charAt(1).toUpperCase();
    }
  }
  const { t, i18n } = useTranslation();

  function handleNavigate(event) {
    const id = event.target.id;
    if (userDataRender && (id === 'profile' || id === 'dashboard')) {
      navigate(`${id}`);
    } else {
      // reseteamos todos los filtros y ordenamientos
      dispatch(searchActivity(''));
      dispatch(getProducts());
      dispatch(genreFilterAction([{ gender: '' }]));
      dispatch(categoryAction([{ category: '' }]));
      dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
      dispatch(priceFilterAction(['', '']));
      navigate(`${id}`);
    }
  }

  function handlerResponsive() {
    dispatch(responsiveNavBar(!responsiveGlobalNavBar));
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    dispatch(responsiveNavBar(false));
  }, []);

  return (
    <div className={responsiveGlobalNavBar ? styles.mainViewResponsive : styles.mainView}>
      <div className={styles.subMainView}>
        <div className={styles.logoContainer}>
          <img src={Logo} alt="" id='/' onClick={handleNavigate} />
        </div>
        <p className={styles.logoTitle} onClick={handleNavigate}>𝗦𝗽𝗼𝗿𝘁𝗩𝗶𝗯𝗲</p>
        <div className={styles.navBarContainer}>
          {(location.pathname === '/' || location.pathname === '/search') && (
            <div id={styles.searchbarContainer}>
              <SearchBar />
            </div>
          )}

          <div className={styles.linksContainer}>
            <div id='/' onClick={handleNavigate}>
              <p id='/' onClick={handleNavigate}>{t('translation.home')}</p>
            </div>

            <div className={styles.linksContainer}>
              <select onChange={(e) => changeLanguage(e.target.value)}>
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            <div id='/about' onClick={handleNavigate}>
              <p id='/about' onClick={handleNavigate}>{t('translation.about')}</p>
            </div>

            <div className={styles.cartContainer} id='/shoppingcart' onClick={handleNavigate}>
              <p id='/shoppingcart' onClick={handleNavigate}>{t('translation.shoppingcart')}</p>
              <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>
              <div id='/shoppingcart' onClick={handleNavigate} className={styles.cartNumber}>
                <p id='/shoppingcart' onClick={handleNavigate}>{totalCartQuantity}</p>
              </div>
            </div>
            {(userDataRender || currentAdminData) ? (
              <div className={styles.userLogContainer}>
                {currentAdminData ?
                  <div id='/dashboard' className={styles.adminLogContainer} onClick={handleNavigate}>
                    {currentAdminData?.image ? (
                      <img id='/dashboard' src={userDataRender?.image} alt="" onClick={handleNavigate} />
                    ) : (
                      <p id='/dashboard' onClick={handleNavigate}>{currentAdminData?.firstName[0]}</p>
                    )}
                  </div> :
                  <div id='/profile' onClick={handleNavigate}>
                    {userDataRender?.image ? (
                      <img id='/profile' src={userDataRender.image} alt="" onClick={handleNavigate} />
                    ) : (
                      <p id='/profile' onClick={handleNavigate}>{firstName}{lastName}</p>
                    )}
                  </div>
                }
              </div>
            ) : (
              <div id='/login' onClick={handleNavigate}>
                <p id='/login' onClick={handleNavigate}>{t('translation.login')}</p>
                <p id='/login' onClick={handleNavigate}>👤</p>
              </div>
            )}
          </div>

          <div className={styles.menuContainer} onClick={handlerResponsive}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>

      <div className={styles.responsiveContainer}>
        {(location.pathname === '/' || location.pathname === '/search') && (
          <div id={styles.searchbarResponsiveContainer}>
            <SearchBar />
          </div>
        )}

        <div className={styles.linksResponsive} id='/' onClick={handleNavigate}>
          <p id='/' onClick={handleNavigate}>{t('translation.home')}</p>
        </div>

        <div className={styles.linksResponsive} id='/about' onClick={handleNavigate}>
          <p id='/about' onClick={handleNavigate}>{t('translation.about')}</p>
        </div>

        <div className={styles.linksResponsive} id='/shoppingcart' onClick={handleNavigate}>
          <p id='/shoppingcart' onClick={handleNavigate}>{t('translation.shoppingcart')}</p>
          <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>

        </div>

        <div className={styles.linksResponsive} id='/login' onClick={handleNavigate}>
          <p id='/login' onClick={handleNavigate}>{t('translation.login')}</p>
          <p id='/login' onClick={handleNavigate}>👤</p>

        </div>
      </div>
    </div>
  );
}

export default NavBar;
