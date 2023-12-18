import { useState, useEffect } from "react";
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import logo from "../../Images/Logo.jpg"
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../../helpers/config';
import { userLoginAction } from "../../redux/actions";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userCorrect, setUserCorrect] = useState(false)//declaro un estado con su funcion de actualizacion inicialzado en false
  const [passwordCorrect, setPasswordCorrect] = useState(false)
  const [aux, setAux] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  })
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
        /* console.log(user); */
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

          {!userCorrect ? <div className="text-wrapper3">Correo electrónico</div> :
            <div className="text-wrapper3">Contraseña</div>}

        </div>
        <div className="boxInput">

          {!userCorrect ?
            <input value={user.email} className="input" name="email" onChange={handleChange} /> :
            <input value={user.password} className="input" name="password" type="password" autoComplete="off" onChange={handleChange} />}

          {!userCorrect ?
            aux && !errors.email ?
              <p className="error">Por favor ingrese un email</p> :
              <p className="error">{errors.email}</p> :
            ''}

          {userCorrect ?
            !passwordCorrect ?
              aux && !errors.password ?
                <p className="error">Por favor ingrese una clave</p> :
                <p className="error">{errors.password}</p> :
              '' :
            ''}

          {!userCorrect ?
            <button onClick={() => handleLoginU()} className="button">SIGUIENTE</button> :
            <button onClick={() => handleLoginP()} className="button">SIGUIENTE</button>}
        </div>
        <hr />
        <div className="boxlin">
          <p className="o">O</p>
        </div>
        <div className="crear">
          <p className="text-wrapper4">¿Aún no tienes cuenta SportVibe? ¡Regístrate aquí!!</p>
          <NavLink to='/userForm'>
            <button className="botton2">CREAR UNA CUENTA</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Login;

const validacion = ({ email, password }) => {
  let error = {};

  if (!email) error.email = 'Por favor ingrese un email'
  else error.email = '✔'

  if (!password) error.password = 'Por favor ingrese una clave'
  else error.password = '✔'

  return error
}