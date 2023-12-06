import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import CardComponent from "./components/Card/Card";
import Button from 'react-bootstrap/Button';
import { PATHROUTES } from './helpers/pathroutes';
import styles from './App.module.css';
import Home from "./components/Home/Home";
import CarouselComponent from "./components/CarouselComponent/CarouselComponent";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "./components/About/About"; // crear el componente
import ShoppingCart from "./components/ShoppingCart/ShoppingCart"; // crear el componente
import Login from "./components/Login/Login"; // crear el componente
import NavBar from "./components/NavBar/NavBar";


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

