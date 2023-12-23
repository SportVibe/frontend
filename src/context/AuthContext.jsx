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
import { userLoginAction } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
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
        const externalUserData = axios.post(`${API_URL}/userRegister`, userData).then((res) => {
            console.log(res);
        })
        return externalUserData
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            dispatch(userLoginAction({
                userData: {
                    accessToken: currentUser.accessToken,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    emailVerified: currentUser.emailVerified,
                    isAnonymous: currentUser.isAnonymous,
                    phoneNumber: currentUser.phoneNumber,
                    photoURL: currentUser.photoURL,
                    uid: currentUser.uid,
                },
                externLogin: true
            }));
            console.log({
                accessToken: currentUser.accessToken,
                displayName: currentUser.displayName,
                email: currentUser.email,
                emailVerified: currentUser.emailVerified,
                isAnonymous: currentUser.isAnonymous,
                phoneNumber: currentUser.phoneNumber,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
            });
            externalUser({
                firstName: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
                externalSignIn: true
            });
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
