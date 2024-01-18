import AdminDashBoard from "./components/AdminDashBoard/AdminDashBoard";
import { AuthContextProvider } from "./context/AuthContext";
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
  CarouselModel2,
  NotFound,
  Footer,
  UserForm,
  PaymentForm,
  Loading,
  PaymentStatus,
  Metrics
} from "./helpers/indexComponents";
import styles from './App.module.css';
import PrivacyPolitic from "./components/Footer/privacyPolitic/privacyPolitic";
import Conditions from "./components/Footer/conditions/conditions";
import Changes from "./components/Footer/changes/changes";
import Deliveries from "./components/Footer/deliveries/deliveries";
import Payments from "./components/Footer/payments/payments";
import { Route, Routes, useLocation } from "react-router-dom";

import { I18nextProvider } from 'react-i18next';
import i18n from './components/Translate/i18n';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import ProductDetail from "./components/ProductDetail/ProductDetail";
import CarouselModel from "./components/CarouselModel/CarouselModel";
import CarouselProducts from "./components/CarouselProducts/CarouselProducts";
import { useEffect, useState } from "react";
import getLocalStorageData from './utils/getLocalStorage';
import ProductUpdate from "./components/ProductUpdate/ProductUpdate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_URL } from "./helpers/config";
import { getCurrentUserAction, quantityCartAction } from "./redux/actions";
import RecoveryPassword from "./components/RecoveryPassword/RecoveryPassword";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";

const stripePromise = loadStripe('Henry2023?');


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [adminLoguedUser,setAdminLoguedUser] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    getAdminLocalStorage(); // para saber si hay algun usuario administrador logueado y aplicar rutas protegidas a dashboard
  }, [location.pathname]);

  async function handleUserData() {
    try { // necesitamos usar el local storage de manera asíncrona para esperar la respuesta antes de setear el loading en false y mostrar la página recargada.
      const userDataLocalStorage = await getLocalStorageData('currentUser'); // una vez finalizada esta función, seteamos el loading en false y se muestra la página recargada.
      const userData = JSON.parse(userDataLocalStorage);
      if (userData) {
        const { data } = await axios(`${API_URL}/user?email=${userData.user.email}&externalSignIn=${userData.user.externalSignIn}`);
        dispatch(getCurrentUserAction(data));
      }
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  }

  const initialStorageCart = async () => {
    try {
      let newTotalQuantity = 0;
      setLoading(true);
      const cartDataStorage = await getLocalStorageData("currentCart");
      setLoading(false);
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      if (parseCartDataStorage) {
        parseCartDataStorage?.cart.map(product => {
          newTotalQuantity = newTotalQuantity + Number(product.quantity);
        });
        dispatch(quantityCartAction(newTotalQuantity));
      }
    } catch (error) {
      setLoading(false);
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleUserData(); // para saber si hay algún usuario logueado en este compu y tener de manera global la data del usuario.
    initialStorageCart();
  }, [location.pathname]);

  const getAdminLocalStorage = async () => {
    const adminDataLocalStorage = await getLocalStorageData('adminUser'); 
    const adminData = JSON.parse(adminDataLocalStorage);
    if (adminData) {
      setAdminLoguedUser(adminData);
    }
  }

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <I18nextProvider i18n={i18n}>
        <Elements stripe={stripePromise}>
          <AuthContextProvider>
            <div className={styles.mainView}>
              {location.pathname !== "/dashboard" && location.pathname !== "/password-recover" &&
                <div className={styles.navBarContainer}>
                  <NavBar />
                </div>
              }
              {location.pathname === '/' &&
                <div className={styles.carouselContainer}>
                  <CarouselComponent text={['Descuentos de hasta 40%', 'No te lo pierdas!']} />
                </div>
              }
              {(location.pathname === '/' || location.pathname === '/search') &&
                <div className={styles.categoryBarContainer}>
                  <CategoryBar />
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
                <div className={styles.CarouselModelContainer}>
                  <CarouselModel2 />
                </div>
              }
              {location.pathname === '/' &&
                <div className={styles.CarouselProductsContainer}>
                  <CarouselProducts order='id' type='desc' title='Nuevos productos' />
                </div>
              }
              {location.pathname === '/' &&
                <div className={styles.CarouselProductsContainer}>
                  <CarouselProducts order='averageScore' type='desc' title='Productos mejor evaluados' />
                </div>
              }
              <Routes className={styles.routesContainer}>
                <Route path="/" element={<Home setLoading={setLoading} />}></Route>
                <Route path="/search" element={<Home />}></Route>
                <Route path="/dashboard" element={
                <ProtectedRoutes user={adminLoguedUser} redirectTo="/dashboard">
                  <AdminDashBoard />
                </ProtectedRoutes>} />
                <Route path="/about" element={<About />} />
                <Route path="/shoppingcart" element={<ShoppingCart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/detail/:id" element={<ProductDetail />} />
                <Route path="/userForm" element={<UserForm />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/privacy" element={<PrivacyPolitic />} />
                <Route path="/conditions" element={<Conditions />} />
                <Route path="/deliveries" element={<Deliveries />} />
                <Route path="/changes" element={<Changes />} />
                <Route path="/payment" element={<PaymentForm />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/payment-status" element={<PaymentStatus />} />
                <Route path="/password-recover" element={<RecoveryPassword />} />
              </Routes>
              {(location.pathname !== '/login' && location.pathname !== '/dashboard') &&
                <Footer />
              }
            </div>
          </AuthContextProvider>
        </Elements>
      </I18nextProvider>
    );
  }
}

export default App;
