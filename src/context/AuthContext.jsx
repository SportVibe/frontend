import { useContext, createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../helpers/config";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../helpers/firebase";
import { getCurrentUserAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const externalUser = async (userData) => {
    try {
      // registramos el usuario externo en nuestra base de datos con la propiedad externalSignIn en true para saber que es externo y no local.
      const externalUserData = await axios.post(`${API_URL}/userRegister`, userData);
      if (externalUserData.data && externalUserData.data.user) {
        const { id } = externalUserData.data.user;
        const newCartResponse = await axios.post(`${API_URL}/shoppingCart`, { userId: id, type: "member" });
        console.log(newCartResponse);
        localStorage.setItem("currentUser", JSON.stringify(externalUserData.data));
        dispatch(getCurrentUserAction(externalUserData.data.user));
        // navigate('/');
      }
      // return externalUserData
    } catch (error) {
      console.error("Error en la función externalUser:", error);
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
        /* dispatch(getCurrentUserAction({ // despachamos la data del usuario rápidamente al estado global para que el nav bar tome la imagen del usuario.
                    firstName: currentUser.displayName,
                    email: currentUser.email,
                    image: currentUser.photoURL,
                    externalSignIn: true
                })); */
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
