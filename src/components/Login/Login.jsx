import { useState } from "react";
import "./Login.css"
import {useNavigate} from 'react-router-dom';
import logo from "../../Images/Logo.jpg"

function Login() {

  const navigate = useNavigate()
  const [userCorrect, setUserCorrect] = useState(false)
  const [passwordCorrect, setPasswordCorrect] =useState(true)
  const [aux, setAux] =useState(false) 
  const [ user, setUser ] = useState({
    usuario:'',
    password:''
  })
  const [ errors, setErrors] = useState({
    usuario:'',
    password:''
  })

  const handleChange=(event)=>{
    let {name} = event.target
    let {value} = event.target
    setErrors(validacion({...user, [name]: value}))
    setUser({...user, [name]: value})
  }

  const handleLogin = ()=>{
    
    if (user.usuario === '') setAux(true)
    else if(arr[0].user === user.usuario) setUserCorrect(true)
    else window.alert('El usuario no existe')

    if(arr[0].password === user.password) setPasswordCorrect(true)
    else setPasswordCorrect(false)

    if(userCorrect && passwordCorrect)
    navigate('/dashboard')
  }

//console.log(user);
  

  let arr = [{user:'sportvibe07@gmail.com', password:'Henry2023'}]

    return (
      <div className="box">
        <div className="boxlogo">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="label">
      {/* <p className="text-wrapper">SportVibe</p> */}
      <p className="text-wrapper2">¡Siente la energía, viste la pasión!</p>
      
       {!userCorrect ? <div className="text-wrapper3">Correo electrónico</div> : 
       <div className="text-wrapper3">Contraseña</div>}

      
      </div>
      <div className="boxInput">
      {!userCorrect ?
       <input value={user.usuario} className="input" name="usuario" onChange={handleChange} /> :
      <input value={user.password} className="input" name="password" type="password" autoComplete="off" onChange={handleChange} />}
      {!userCorrect ? aux && !errors.usuario ? <p>Por favor ingrese un usuario</p>:<p>{errors.usuario}</p>:''}

      {/* {errors.password && aux ? <p>{errors.password}</p> : userCorrect && !passwordCorrect?<p>Contrasena incorrecta</p>:<p>...</p>} */}
      <button onClick={()=>handleLogin()} className="button">SIGUIENTE</button>
    </div>
      <hr />
    <div className="boxlin">
      <p className="o">O</p>
    </div>
    <div className="crear">
      <p className="text-wrapper4">¿Aún no tienes cuenta SportVibe? ¡Regístrate aquí!!</p>
      <button className="botton2">CREAR UNA CUENTA</button>
    </div>
    </div>
    );
  }
  
  export default Login;

  const validacion = ({usuario, password}) =>{
    let error = {};

  if(!usuario) error.usuario = 'Por favor ingrese un usuario'
  else error.usuario = '✔'

  if(!password) error.password = 'Por favor ingrese una clave'
  else error.password = '✔'

    return error
  }