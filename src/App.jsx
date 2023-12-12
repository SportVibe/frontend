import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import styles from './App.module.css';
import { Home, CarouselComponent, About, ShoppingCart, Login, NavBar, Carousel2, NotFound } from "./helpers/indexComponents";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { getProducts } from "./redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div className={styles.mainView}>
      {(location.pathname !== '/dashboard' || location.pathname === '/search') &&
        <div className={styles.navBarContainer}>
          <NavBar />
        </div>
      }
      {location.pathname === '/' &&
        <div className={styles.carouselContainer}>
          <CarouselComponent text={['Descuentos de hasta 50%', 'No te pierdas estas ofertas!']} />
        </div>
      }
      {(location.pathname === '/' || location.pathname === '/search') &&
        <div className={styles.carousel2Container}>
          <Carousel2 />
        </div>
      }
      <Routes className={styles.routesContainer}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/search" element={<Home />}></Route>
        <Route path="/dashboard" element={<AdminDashBoard />}></Route>
        <Route path="/about" element={<About />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

