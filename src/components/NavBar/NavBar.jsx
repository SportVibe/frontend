import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './NavBar.module.css';
import SearchBar from './SearchBar/SearchBar';
import Logo from '../../Images/Logo.jpg';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { responsiveNavBar, searchActivity } from '../../redux/actions';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

function NavBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responsiveGlobalNavBar = useSelector((state) => state.responsiveNavBar);

  function handleNavigate(event) {
    const id = event.target.id;
    dispatch(searchActivity(''));
    navigate(`${id}`);
  }

  function handlerResponsive() {
    dispatch(responsiveNavBar(!responsiveGlobalNavBar));
  }

  useEffect(() => {
    dispatch(responsiveNavBar(false));
  }, []);

  return (
    <div className={responsiveGlobalNavBar ? styles.mainView : styles.mainViewResponsive}>
      <div className={styles.subMainView}>
        <div className={styles.logoContainer}>
          <img src={Logo} alt="" id='/' onClick={handleNavigate} />
        </div>
        <div className={styles.menuContainer} onClick={handlerResponsive}>
          <i className="fa-solid fa-bars"></i>
        </div>
        <div className={styles.navBarContainer}>
          {(location.pathname === '/' || location.pathname === '/search') &&
            <div className={styles.searchbarContainer}>
              <SearchBar />
            </div>
          }
          <div className={styles.linksContainer}>
            <div id='/' onClick={handleNavigate}>
              <p id='/' onClick={handleNavigate}>Home</p>
            </div>
            <div id='/about' onClick={handleNavigate}>
              <p id='/about' onClick={handleNavigate}>About us</p>
            </div>
            <div id='/shoppingcart' onClick={handleNavigate}>
              <p id='/shoppingcart' onClick={handleNavigate}>Shopping car</p>
              <p id='/shoppingcart' onClick={handleNavigate}>🛒</p>
            </div>
            <div id='/login' onClick={handleNavigate}>
              <p id='/login' onClick={handleNavigate}>Sign in</p>
              <p id='/login' onClick={handleNavigate}>👤</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.responsiveContainer}>
        {(location.pathname === '/' || location.pathname === '/search') &&
          <div className={styles.searchbarResponsiveContainer}>
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

{/* <Navbar className="w-100" expand="lg" bg="transparent" variant="light">
      <Navbar.Brand as={Link} to="/">
        <img
          src={Logo}
          alt="Logo"
          width="200"
          height="40"
          className="d-inline-block align-text-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={styles.navBarContainer}>
        <div className={styles.searchbarContainer}>
        <SearchBar />
        </div>
        <div className={styles.linksContainer}>
          <div  id='/' onClick={handleNavigate}>
            Home
          </div>
          <div  id='about' onClick={handleNavigate}>
            About us
          </div>
          <div id='shoppingcart' onClick={handleNavigate}>
            Shopping car 🛒
          </div>
          <div id='dashboard' onClick={handleNavigate}>
            Sign in👤
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar> */}