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
  sportAction,
  brandAction,
  filterCounterAction,
} from '../../redux/actions';
import { useTranslation } from 'react-i18next';
import getLocalStorageData from '../../utils/getLocalStorage';

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [borderNavBar, setBorderNavBar] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [cartItems, setCartItems] = useState('0.00');
  const totalCartQuantity = useSelector((state) => state.totalCartQuantity);
  const responsiveGlobalNavBar = useSelector((state) => state.responsiveNavBar);
  const filterCounter = useSelector((state) => state.filterCounter);
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
  // buscamos si hay que notificar sobre datos incompletos al usuario.
  const notify = userDataRender ? Object.values(userDataRender).some(value => {
    return value === null;
  }) : null;

  function handleNavigate(event) {
    const id = event.target.id;
    if (userDataRender && (id === 'profile' || id === 'dashboard')) {
      navigate(`${id}`);
    } else {
      // reseteamos todos los filtros y ordenamientos
      dispatch(searchActivity(''));
      dispatch(getProducts());
      dispatch(genreFilterAction([{ gender: '' }]));
      dispatch(sportAction([{ sport: '' }]));
      dispatch(brandAction([{ brand: '' }]));
      dispatch(categoryAction([{ category: '' }]));
      dispatch(sortAction([{ sort: 'id' }, { typeSort: 'desc' }]));
      dispatch(priceFilterAction(['', '']));
      dispatch(filterCounterAction({}));
      navigate(`${id}`);
    }
  }

  function handlerResponsive() {
    dispatch(responsiveNavBar(!responsiveGlobalNavBar));
  }

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const initialStorageCart = async () => {
    try {
      const cartDataStorage = await getLocalStorageData("currentCart");
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      if (parseCartDataStorage) {
        const subTotalPrice = parseCartDataStorage?.cart.reduce((acc, product) => {
          return acc + (product.price * product.quantity);
        }, 0);
        // console.log(subTotalPrice.toFixed(2).replace(',', ','));
        setCartItems(subTotalPrice.toFixed(2).replace(',', ','));
      }
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    dispatch(responsiveNavBar(false));
    if (location.pathname === '/search') setBorderNavBar(false);
  }, [location.pathname]);

  useEffect(() => {
    initialStorageCart();
  }, [totalCartQuantity]);

  return (
    <div className={` ${borderNavBar && styles.borderNavBar} ${responsiveGlobalNavBar ? styles.mainViewResponsive : styles.mainView}`}>
      <div className={styles.subMainView}>
        <div className={`${styles.logoContainer} ${isInputFocused && styles.logoContainerHidden}`}>
          <img src={Logo} alt="" id='/' onClick={handleNavigate} />
        </div>
        <p className={styles.logoTitle} onClick={handleNavigate}>𝗦𝗽𝗼𝗿𝘁𝗩𝗶𝗯𝗲</p>
        <div className={styles.navBarContainer}>
          {(location.pathname === '/' || location.pathname === '/search') && (
            <div id={styles.searchbarContainer}>
              <SearchBar isInputFocused={isInputFocused} setIsInputFocused={setIsInputFocused} />
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
              {/* <p id='/shoppingcart' onClick={handleNavigate}>{t('translation.shoppingcart')}</p> */}
              <p id='/shoppingcart' onClick={handleNavigate}>${cartItems}</p>
              <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>
              <div id='/shoppingcart' onClick={handleNavigate} className={styles.cartNumber}>
                <p id='/shoppingcart' onClick={handleNavigate} className={styles.quantity}>{totalCartQuantity}</p>
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
                  <div id='/profile' onClick={handleNavigate} className={styles.profileLogo}>
                    {notify && <div className={styles.circleNotify}></div>}
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

          <div className={`${styles.menuContainer} ${isInputFocused && styles.menuContainerHidden}`} onClick={handlerResponsive}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>




      <div className={styles.responsiveContainer}>
        <div id='/' onClick={handleNavigate} className={styles.home}>
          <p id='/' onClick={handleNavigate}>{t('translation.home')}</p>
        </div>

        <div className={styles.linksContainer}>
          <select className={styles.selectResponsive} onChange={(e) => changeLanguage(e.target.value)}>
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        <div id='/about' onClick={handleNavigate} className={styles.home}>
          <p id='/about' onClick={handleNavigate}>{t('translation.about')}</p>
        </div>

        <div className={styles.cartContainerResponsibe} id='/shoppingcart' onClick={handleNavigate}>
          {/* <p id='/shoppingcart' onClick={handleNavigate}>{t('translation.shoppingcart')}</p> */}
          <p id='/shoppingcart' onClick={handleNavigate}>${cartItems}</p>
          <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>
          <p id='/shoppingcart' onClick={handleNavigate} className={styles.quantity}>{`(${totalCartQuantity})`}</p>
        </div>
        {(userDataRender || currentAdminData) ? (
          <div className={styles.userLogContainer}>
            {currentAdminData ?
              <div id='/dashboard' className={styles.adminLogContainer} onClick={handleNavigate}>
                <p id='/dashboard' onClick={handleNavigate}>Admin</p>
              </div> :
              <div id='/profile' onClick={handleNavigate} className={styles.profileLogo}>
                <p id='/profile' onClick={handleNavigate}>Mi perfil</p>
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
    </div>
  );
}

export default NavBar;
