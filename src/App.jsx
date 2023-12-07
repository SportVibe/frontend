import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
// import { PATHROUTES } from './helpers/pathroutes';
import styles from './App.module.css';
import { Home, CarouselComponent, About, ShoppingCart, Login, NavBar, Carousel2 } from "./helpers/indexComponents";
import { Route, Routes, useLocation } from "react-router-dom";


function App() {
  const location = useLocation();

  return (
    <div className={styles.mainView}>
      {location.pathname !== '/dashboard' &&
        <div className={styles.navBarContainer}>
          <NavBar />
        </div>
      }
      {location.pathname === '/' &&
        <div className={styles.carouselContainer}>
          <CarouselComponent />
        </div>
      }
      {location.pathname === '/' &&
        <div className={styles.carousel2Container}>
          <Carousel2 />
        </div>
      }
      <Routes className={styles.routesContainer}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<AdminDashBoard />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

