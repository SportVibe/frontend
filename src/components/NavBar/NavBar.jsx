import { useTranslation } from 'react-i18next';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar';
import Logo from '../../Images/Logo.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserAuth } from '../../context/AuthContext';
import {
  responsiveNavBar,
  searchActivity,
  getProducts,
  genreFilterAction,
  sortAction,
  priceFilterAction
} from '../../redux/actions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responsiveGlobalNavBar = useSelector((state) => state.responsiveNavBar);
  // const userData = useSelector((state) => state.userData);
  const userData = false;
  const { t, i18n } = useTranslation();
  const { user, logOut } = UserAuth();

  function handleNavigate(event) {
    const id = event.target.id;
    if (id === 'profile' && userData) {
      navigate(`/user-profile/${userData.data.user.id}`);
    }
    else {
      // reseteamos todos los filtros y ordenamientos
      dispatch(searchActivity(''));
      dispatch(getProducts());
      dispatch(genreFilterAction([{ gender: '' }]));
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
        <div className={styles.navBarContainer}>
          {(location.pathname === '/' || location.pathname === '/search') &&
            <div id={styles.searchbarContainer}>
              <SearchBar />
            </div>
          }
          <div className={styles.linksContainer}>
            <div id='/' onClick={handleNavigate}>
              <p id='/' onClick={handleNavigate}>Home</p>
            </div>
            
            <div className={styles.linksContainer}>
              <select onChange={(e) => changeLanguage(e.target.value)}/*  value={i18n.language} */>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>


            <div id='/about' onClick={handleNavigate}>
              <p id='/about' onClick={handleNavigate}>About us</p>
            </div>
            
        
            <div id='/shoppingcart' onClick={handleNavigate}>
              <p id='/shoppingcart' onClick={handleNavigate}>Cart</p>
              <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>
            </div>
            {userData ?
              <div id='profile' className={styles.userLogContainer} onClick={handleNavigate}>
                <p id='profile' onClick={handleNavigate}>Mi perfil</p>
                <div id='profile' onClick={handleNavigate}>
                  {userData.data.user.image ?
                    <img id='profile' src={userData.data.user.image} alt="" onClick={handleNavigate} /> :
                    <p id='profile' onClick={handleNavigate}>LB</p>
                  }
                </div>
              </div> :
              <div id='/login' onClick={handleNavigate}>
                <p id='/login' onClick={handleNavigate}>Sign in</p>
                <p id='/login' onClick={handleNavigate}>👤</p>
              </div>
            }
          </div>
          <div className={styles.menuContainer} onClick={handlerResponsive}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
      <div className={styles.responsiveContainer}>
        {(location.pathname === '/' || location.pathname === '/search') &&
          <div id={styles.searchbarResponsiveContainer}>
            <SearchBar />
          </div>
        }
        <div className={styles.linksResponsive} id='/' onClick={handleNavigate}>
          <p id='/' onClick={handleNavigate}>Home</p>
        </div>
        <div className={styles.linksResponsive} id='/about' onClick={handleNavigate}>
          <p id='/about' onClick={handleNavigate}>About us</p>
        </div>
        <div className={styles.linksResponsive} id='/shoppingcart' onClick={handleNavigate}>
          <p id='/shoppingcart' onClick={handleNavigate}>Shopping cart</p>
          <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>
        </div>
        <div className={styles.linksResponsive} id='/login' onClick={handleNavigate}>
          <p id='/login' onClick={handleNavigate}>Sign in</p>
          <p id='/login' onClick={handleNavigate}>👤</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
