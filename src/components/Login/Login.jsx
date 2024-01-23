import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "./Login.css";
import logo from "../../Images/Logo.jpg";
import google from "../../Images/google-signin-button.png"
import { cartAction, getAdminUserAction, getCurrentUserAction, quantityCartAction } from "../../redux/actions";
import axios from "axios";
import { API_URL } from '../../helpers/config';
import { useDispatch, useSelector } from "react-redux";
import { UserAuth } from "../../context/AuthContext";
import LoginModal from "../Modals/LoginModal";
import Swal from "sweetalert2";
import getLocalStorageData from "../../utils/getLocalStorage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth() ?? {};
  const [userCorrect, setUserCorrect] = useState(false); //declaro un estado con su función de actualización inicializado en false
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const userDataRender = useSelector((state) => state.currentUserData);
  const [aux, setAux] = useState(false);
  const [modal, setModal] = useState(null);
  const [username, setUser] = useState({
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
    setUser({ ...username, [name]: value })
  }

  const handleLoginU = (e) => {
    e.preventDefault();
    if (username.email === '') setAux(true);
    else setUserCorrect(true);
  }

  const handleLoginP = async (e) => {
    e.preventDefault();
    if (username.password === '') setAux(true);
    else {
      try {
        const { data } = await axios.post(`${API_URL}/login`, username);
        // console.log(data);
        if (data) {
          if (data.user.rol === 'admin' || data.user.rol === 'super_admin') {
            if (!data.user.active) {
              setModal(data.user); // toda la data del usuario se pasa a la modal.
            }
            else {
              localStorage.setItem('adminUser', JSON.stringify(data.user));
              dispatch(getAdminUserAction(data.user));
              navigate('/dashboard');
            }
          }
          else if (!data.user.active) {
            setModal(data.user); // toda la data del usuario se pasa a la modal.
          }
          else {
            localStorage.setItem('currentUser', JSON.stringify(data));
            dispatch(getCurrentUserAction(data));
            initialStorageCart(data.user)
            // navigate('/');
          }
        }
        else {
          Swal.fire("La contraseña o email son invalidos!");
          setUser({ ...username, password: '' });
        }
      } catch (error) {
        Swal.fire("Contraseña o email son invalidos!");
        setUser({ ...username, password: '' });
        console.error({ error: error.message });
      }
    }
  }

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
        const { data } = await axios.put(`${API_URL}/putAllCart`, parseCartDataStorage);
        // console.log(data);
        if (data) {
          localStorage.setItem("currentCart", JSON.stringify(data));
          const newTotalQuantity = data?.cart.reduce((acc, product) => {
            return acc + Number(product.quantity);
          }, 0);
          dispatch(quantityCartAction(newTotalQuantity));
          dispatch(cartAction(data));
        }
        navigate('/');
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
        navigate('/');
      }
    } catch (error) {
      navigate('/');
      console.error({ error: error.message });
    }
  };










  useEffect(() => { // si user existe (si está logeado) entonces se redirige al home.
    if (user != null || userDataRender) {
      // console.log(user);
      navigate('/');
    }
  }, [user, userDataRender]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Ingresa tu email",
      input: "email",
      inputPlaceholder: "Email que usaste para registrarte"
    });
    if (email) {
      // let dominio = email.split("@")[1];
      const { data } = axios.post(`${API_URL}/password-recover`, { email: email })
        .then(({ data }) => {
          if (data) {
            Swal.fire(`Enviamos un link de recuperacion a (${email}). `);
          }
          else {
            Swal.fire({
              title: "No existe una cuenta registrada con ese correo",
              icon: "question",
            });
          }
        })
        .catch(err => {
          Swal.fire({
            title: err.response.data.message,
            text: "Por favor ingrese el email que uso para registrarse",
            icon: "question"
          })
        });
    }
    else {
      Swal.fire({
        title: "Por favor ingrese el email que uso para registrarse",
        icon: "question",
      });
    }
  }

  return (
    <div className="contenedorLogin">
      {modal && <LoginModal modal={modal} setModal={setModal} handleLoginP={(e) => handleLoginP(e)} />}
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
            <input value={username.email} className="input" name="email" onChange={handleChange} />
          ) : (
            <input
              value={username.password}
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
            <button onClick={handleLoginU} className="button">
              SIGUIENTE
            </button>
          ) : (
            <button onClick={handleLoginP} className="button">
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
        <a href="#" className="textForgotPassword" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
};

export default Login;

// const validacion = ({ email, password }) => {
//   let error = {};
//   if (!email) error.email = 'Por favor ingrese un email'
//   else error.email = '✔'
//   if (!password) error.password = 'Por favor ingrese una clave'
//   else error.password = '✔'
//   return error
// }
