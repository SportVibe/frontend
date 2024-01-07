import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {//esta función se utiliza para inicializar la aplicación de Firebase antes de utilizar el servicio de autenticación
    apiKey: "AIzaSyCgXPvmDHMD8CXkdu6X2H_hVy0ugo43_5s",
    authDomain: "sportvibe-83aba.firebaseapp.com",
    projectId: "sportvibe-83aba",
    storageBucket: "sportvibe-83aba.appspot.com",
    messagingSenderId: "1056600771864",
    appId: "1:1056600771864:web:b038f160957b99e806226d",
    measurementId: "G-74CJSX0GX1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();