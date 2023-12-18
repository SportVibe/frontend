import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Login.css";
import logo from "../../Images/Logo.jpg";
import google  from "../../Images/google-signin-button.png"
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";

const provider = new GoogleAuthProvider();

const login = () => {
  const firebaseConfig = {//esta función se utiliza para inicializar la aplicación de Firebase antes de utilizar el servicio de autenticación
    apiKey: "AIzaSyCgXPvmDHMD8CXkdu6X2H_hVy0ugo43_5s",
    authDomain: "sportvibe-83aba.firebaseapp.com",
    projectId: "sportvibe-83aba",
    storageBucket: "sportvibe-83aba.appspot.com",
    messagingSenderId: "1056600771864",
    appId: "1:1056600771864:web:b038f160957b99e806226d",
    measurementId: "G-74CJSX0GX1",
  };

  const [users ,setUsers]= useState();//Se utiliza el hook useState para declarar un estado.

  useEffect(()=>{
    axios.get('http://localhost:3005/users')//Se utiliza el hook useEffect para realizar efectos secundarios en el componente. En este caso, se ejecutará una vez después de que el componente se monte en el DOM debido al array de dependencias vacío ([])
    .then(({ data }) => {
    setUsers(data);
    })
  },[])

  const emailDb = users?.Users.map((ema)=>ema.email)

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();

  const URL = "http://localhost:3005/";

  const callLoginGoogle = async () => {

    try {
      const result = await signInWithPopup(auth, provider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      const response = await axios.post(`${URL}google`, {
        firstName: user.displayName,
        email: user.email,
        image: user.photoURL,
        rol: "CLIENT",
      });
      console.log("respuesta: ", response);

      navigate("/userForm");
      alert(response.data.message);
      
    } catch (error) {
      console.error("Error al autenticar con Google:", error.message);
      console.error("Detalles del error:", error.response);
    }
  };

  const navigate = useNavigate();
  const [userCorrect, setUserCorrect] = useState(false); //declaro un estado con su función de actualización inicializado en false
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [aux, setAux] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  let arr = [{ user: 'sportvibe07@gmail.com', password: 'Henry2023' }];

  const handleChange = (event) => {
    let { name } = event.target
    let { value } = event.target
    setErrors(validacion({ ...user, [name]: value }))
    setUser({ ...user, [name]: value })
  }

  const handleLoginU = () => {
    if (user.email === '') setAux(true);
    else setUserCorrect(true);
    /* else if (arr[0].user === user.email) setUserCorrect(true)
    else window.alert('El email no existe') */

  }
  const handleLoginP = async () => {
    if (user.password === '') setAux(true);
    else {
      try {
        const { data } = await axios.post(`${API_URL}/login`, user);
        if (data) {
          (dispatch(userLoginAction(data)));
          navigate('/');
        }
      } catch (error) {
        console.error({ error: error.message });
      }
    }
    /* else if (userCorrect && arr[0].password === user.password) navigate('/dashboard')
    else window.alert('La contrasena es incorrecta') */
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contenedorLogin">
      <div className="box">
        <div className="boxlogo">
          <NavLink to='/'>
            <img className="logo" src={logo} alt="" />
          </NavLink>
        </div>
        <div className="label">
          {/* <p className="text-wrapper">SportVibe</p> */}
          <p className="text-wrapper2">¡Siente la energía, viste la pasión!</p>

          {!userCorrect ? (
            <div className="text-wrapper3">Correo electrónico</div>
          ) : (
            <div className="text-wrapper3">Contraseña</div>
          )}
        </div>
        <div className="boxInput">
          {!userCorrect ? (
            <input value={user.email} className="input" name="email" onChange={handleChangeUser} />
          ) : (
            <input
              value={user.password}
              className="input"
              name="password"
              type="password"
              autoComplete="off"
              onChange={handleChangePassword}
            />
          )}

          {!userCorrect ? (
            aux && !errors.email ? (
              <p className="error">Por favor ingrese un usuario</p>
            ) : (
              <p className="error">{errors.email}</p>
            )
          ) : (
            ""
          )}

          {userCorrect ? (
            !passwordCorrect ? (
              aux && !errors.password ? (
                <p className="error">Por favor ingrese una clave</p>
              ) : (
                <p className="error">{errors.password}</p>
              )
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {!userCorrect ? (
            <button onClick={() => handleLoginU()} className="button">
              SIGUIENTE
            </button>
          ) : (
            <button onClick={() => handleLoginP()} className="button">
              SIGUIENTE
            </button>
          )}
        </div>
        <hr />
        <div className="boxlin">
          <p className="o">O</p>
        </div>
        <button className="googleButton" onClick={callLoginGoogle}> <img className="googleImag" src={google} alt="" /></button>
        <div className="crear">
          <p className="text-wrapper4">¿Aún no tienes cuenta SportVibe? ¡Regístrate aquí!!</p>
          <NavLink to='/userForm'>
            <button className="botton2">CREAR UNA CUENTA</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default login;

const validacion = ({ email, password }) => {
  let error = {};

  if (!email) error.email = 'Por favor ingrese un email'
  else error.email = '✔'

  if (!password) error.password = 'Por favor ingrese una clave'
  else error.password = '✔'

  return error
}
