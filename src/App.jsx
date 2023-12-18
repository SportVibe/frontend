import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import {
  Home,
  UserProfile,
  CategoryBar,
  CarouselComponent,
  About,
  ShoppingCart,
  Login,
  NavBar,
  Carousel2,
  NotFound,
  Footer,
  UserForm,
  PaymentForm,
} from "./helpers/indexComponents";
import styles from './App.module.css';
import { Route, Routes, useLocation } from "react-router-dom";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import ProductDetail from "./components/ProductDetail/ProductDetail";
import CarouselModel from "./components/CarouselModel/CarouselModel";
import CarouselProducts from './components/CarouselProducts/CarouselProducts';
import { getProducts } from "./redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductUpdate from "./components/ProductUpdate/ProductUpdate";

const stripePromise = loadStripe('Henry2023?');

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  /* useEffect(() => {
    dispatch(getProducts());
  }, []); */

  return (
    <Elements stripe={stripePromise}>
      <div className={styles.mainView}>
    
          {location.pathname !== "/dashboard" && 
            <div className={styles.navBarContainer}>
              <NavBar />
            </div>
      }
          {/* {(location.pathname === '/' || location.pathname === '/search') &&
            <div className={styles.categoryBarContainer}>
              <CategoryBar />
            </div>
          } */}
          {location.pathname === '/' &&
            <div className={styles.carouselContainer}>
              <CarouselComponent text={['Descuentos de hasta 50%', 'No te pierdas estas ofertas!']} />
            </div>
          }
          {(location.pathname === '/') &&
            <div className={styles.carousel2Container}>
              <Carousel2 />
            </div>
          }
          {location.pathname === '/' &&
            <div className={styles.CarouselModelContainer}>
              <CarouselModel />
            </div>
          }
          {location.pathname === '/' &&
            <div className={styles.CarouselProductsContainer}>
              <CarouselProducts />
            </div>
          }
          <Routes className={styles.routesContainer}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/search" element={<Home />}></Route>
            <Route path="/dashboard" element={<AdminDashBoard />}></Route>
            <Route path="/about" element={<About />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/payment" element={<PaymentForm />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/userForm" element={<UserForm />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
          </Routes>
          {(location.pathname === '/search') &&
            <div className={styles.carousel2Container}>
              <Carousel2 />
            </div>
          }
          {(location.pathname !== '/login' && location.pathname !== '/dashboard') &&
            <Footer />
          }
          </div>
          </Elements>
      );
    }

    export default App;

