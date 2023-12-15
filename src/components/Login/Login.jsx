import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Logout/Logout";
import Profile from "../Profile/Profile";

// const LoginButton = () => {
//   const { loginWithRedirect } = useAuth0();

//   return <button onClick={() => loginWithRedirect()}>Log In</button>;
// };

// export default LoginButton;

function Login() {
  const {isAuthenticated} =useAuth0();

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={()=>loginWithRedirect()}>Login</button>
  
  }

    return (

      <div>
        {isAuthenticated ? (<> <Profile/>
       <LogoutButton/></>):<LoginButton/>}
       
      </div>
      
    );
  }
  export default Login;

//   const validacion = ({usuario, password}) =>{
//     let error = {};

//   if(!usuario) error.usuario = 'Por favor ingrese un usuario'
//   else error.usuario = '✔'

//   if(!password) error.password = 'Por favor ingrese una clave'
//   else error.password = '✔'

//     return error
 // }