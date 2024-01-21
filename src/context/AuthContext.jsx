import { useContext, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../helpers/config";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { cartAction, getCurrentUserAction, quantityCartAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import getLocalStorageData from "../utils/getLocalStorage";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const userDataRender = useSelector((state) => state.currentUserData);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentCart');
    dispatch(quantityCartAction(0));
    dispatch(getCurrentUserAction(null));
    dispatch(cartAction(null));
  };

  const externalUser = async (userData) => {
    try {
      // registramos el usuario externo en nuestra base de datos con la propiedad externalSignIn en true para saber que es externo y no local.
      const externalUserData = await axios.post(`${API_URL}/userRegister`, userData);
      // console.log(externalUserData);
      if (externalUserData.data && externalUserData.data.user) {
        /* const { id } = externalUserData.data.user;
        const newCartResponse = await axios.post(`${API_URL}/shoppingCart`, { userId: id, type: "member" });
        console.log(newCartResponse); */
        localStorage.setItem("currentUser", JSON.stringify(externalUserData.data));
        dispatch(getCurrentUserAction(externalUserData.data.user));
        // navigate('/');
      }
      initialStorageCart(externalUserData.data.user);
      // return externalUserData
    } catch (error) {
      console.error("Error en la función externalUser:", error);
    }
  };

  const initialStorageCart = async (userData) => {
    try {
      let totalProducts = 0;
      const cartDataStorage = await getLocalStorageData("currentCart");
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      if (parseCartDataStorage) {
        totalProducts = parseCartDataStorage?.cart.reduce((acc, product) => {
          return acc + Number(product.quantity);
        }, 0);
        dispatch(quantityCartAction(totalProducts));
        dispatch(cartAction(parseCartDataStorage));
      }
      getCartFromBack(userData, totalProducts, parseCartDataStorage);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  const getCartFromBack = async (userData, totalProducts, parseCartDataStorage) => {
    try {
      // console.log(userData);
      const id = userData.id || null;
      // console.log(cartDataInit);
      if (userData && totalProducts) {
        // console.log('pisaremos su back');
        // console.log(parseCartDataStorage);
        const { data } = await axios.put(`${API_URL}/putAllCart`, { userId: id, cart: parseCartDataStorage.cart });
        // console.log(data);
        if (data) {
          localStorage.setItem("currentCart", JSON.stringify(data));
          const newTotalQuantity = data?.cart.reduce((acc, product) => {
            return acc + Number(product.quantity);
          }, 0);
          dispatch(quantityCartAction(newTotalQuantity));
          dispatch(cartAction(data));
        }
        // navigate('/');
      }
      else {
        // console.log(id);
        const { data } = await axios(`${API_URL}/getUserCart?userId=${id}`);
        // console.log(data);
        if (data) {
          localStorage.setItem("currentCart", JSON.stringify(data));
          const newTotalQuantity = data?.cart.reduce((acc, product) => {
            return acc + Number(product.quantity);
          }, 0);
          dispatch(quantityCartAction(newTotalQuantity));
          dispatch(cartAction(data));
        }
        // navigate('/');
      }
    } catch (error) {
      navigate('/');
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // guardamos los datos de Firebase en nuestro local storage, igual como lo haríamos logueandonos de manera local.
      if (currentUser) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            token: currentUser.accessToken,
            user: {
              firstName: currentUser.displayName,
              email: currentUser.email,
              image: currentUser.photoURL,
              externalSignIn: true,
            },
          })
        );
        externalUser({
          firstName: currentUser?.displayName,
          email: currentUser?.email,
          image: currentUser?.photoURL,
          externalSignIn: true,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ googleSignIn, logOut, user }}>{children}</AuthContext.Provider>;
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
