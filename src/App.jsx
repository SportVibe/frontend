import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
// import CardComponent from "./components/Card/Card";
// import Button from 'react-bootstrap/Button';
// import { PATHROUTES } from './helpers/pathroutes';
import styles from './App.module.css';
import Home from "./components/Home/Home";
import CarouselComponent from "./components/CarouselComponent/CarouselComponent";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className={styles.mainView}>
      <div className={styles.navBarContainer}>
        NavBar de Marian
      </div>
      {location.pathname === '/' &&
        <div className={styles.carouselContainer}>
          <CarouselComponent />
        </div>
      }
      <Routes className={styles.routesContainer}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<AdminDashBoard />}></Route>
      </Routes>
    </div>
  );
}

export default App;

