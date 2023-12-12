import { useState } from "react";
import "./Login.css"
import {useNavigate} from 'react-router-dom';
import logo from "../../Images/Logo.jpg"
import { NavLink } from "react-router-dom";

function Login() {

  const navigate = useNavigate()
  const [userCorrect, setUserCorrect] = useState(false)//declaro un estado con su funcion de actualizacion inicialzado en false
  const [passwordCorrect, setPasswordCorrect] =useState(false)
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

  const handleLoginU = ()=>{
    
    if (user.usuario === '') setAux(true)
    else if(arr[0].user === user.usuario) setUserCorrect(true)
    else window.alert('El usuario no existe')

  }
  const handleLoginP = ()=>{
    
    if (user.password === '') setAux(true)
    else if(userCorrect && arr[0].password === user.password) navigate('/dashboard')
    else window.alert('La contrasena es incorrecta')

  }
  let arr = [{user:'sportvibe07@gmail.com', password:'Henry2023'}]

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
       <input value={user.usuario} className="input" name="usuario" onChange={handleChange} /> :
      <input value={user.password} className="input" name="password" type="password" autoComplete="off" onChange={handleChange} />}
      
      {!userCorrect ? 
      aux && !errors.usuario ? 
      <p className="error">Por favor ingrese un usuario</p>:
      <p className="error">{errors.usuario}</p>:
      ''}
      
      {userCorrect ? 
      !passwordCorrect ? 
      aux && !errors.password ? 
      <p className="error">Por favor ingrese una clave</p>:
      <p className="error">{errors.password}</p>:
      '':
      ''}

      {!userCorrect ? 
      <button onClick={()=>handleLoginU()} className="button">SIGUIENTE</button>:
      <button onClick={()=>handleLoginP()} className="button">SIGUIENTE</button>}
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

  const validacion = ({usuario, password}) =>{
    let error = {};

  if(!usuario) error.usuario = 'Por favor ingrese un usuario'
  else error.usuario = '✔'

  if(!password) error.password = 'Por favor ingrese una clave'
  else error.password = '✔'

    return error
  }