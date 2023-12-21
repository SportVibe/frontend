import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Login.css";
import logo from "../../Images/Logo.jpg";
import google from "../../Images/google-signin-button.png"
import { userLoginAction } from "../../redux/actions";
import axios from "axios";
import { API_URL } from '../../helpers/config';
import { useDispatch } from "react-redux";
import { UserAuth } from "../../context/AuthContext";

const login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { googleSignIn } = UserAuth();
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

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    let { name } = event.target
    let { value } = event.target
    setUser({ ...user, [name]: value })
  }

  const handleLoginU = () => {
    if (user.email === '') setAux(true);
    else setUserCorrect(true);
  }

  const handleLoginP = async () => {
    if (user.password === '') setAux(true);
    else {
      try {
        const { data } = await axios.post(`${API_URL}/login`, user);
        if (data) {
          // (dispatch(userLoginAction(data)));
          dispatch(userLoginAction({
            userData: data.user, 
            externLogin: false
        }));
          navigate('/');
        }
      } catch (error) {
        console.error({ error: error.message });
      }
    }
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
            <input value={user.email} className="input" name="email" onChange={handleChange} />
          ) : (
            <input
              value={user.password}
              className="input"
              name="password"
              type="password"
              autoComplete="off"
              onChange={handleChange}
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
        <button className="googleButton" onClick={handleGoogleSignIn}> <img className="googleImag" src={google} alt="" /></button>
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
