import { useContext, createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from '../helpers/config';
import axios from "axios";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from '../helpers/firebase';
import { getCurrentUserAction } from "../redux/actions";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider);
        signInWithRedirect(auth, provider);
    };

    const logOut = () => {
        signOut(auth)
    }

    const externalUser = async (userData) => {
        // registramos el usuario externo en nuestra base de datos con la propiedad externalSignIn en true para saber que es externo y no local.
        const externalUserData = axios.post(`${API_URL}/userRegister`, userData).then((res) => {
            console.log(res);
        })
        return externalUserData
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // guardamos los datos de Firebase en nuestro local storage, igual como lo haríamos logueandonos de manera local.
            currentUser && localStorage.setItem('currentUser', JSON.stringify({
                token: currentUser.accessToken,
                user: {
                    firstName: currentUser.displayName,
                    email: currentUser.email,
                    image: currentUser.photoURL,
                    externalSignIn: true
                }
            }));
            externalUser({
                firstName: currentUser?.displayName,
                email: currentUser?.email,
                image: currentUser?.photoURL,
                externalSignIn: true
            });
            dispatch(getCurrentUserAction({ // despachamos la data del usuario rápidamente al estado global para que el nav bar tome la imagen del usuario.
                firstName: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
                externalSignIn: true
            }));
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}
