import { NavLink } from "react-bootstrap";
import logo from "../../Images/Logo.jpg";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers/config.js";
import "./RecoveryPassword.module.css"

const RecoveryPassword = ()=>{

    const [nuevaClave, setNuevaClave] = useState({
        password:''
    })
    const [confirmarClave, setConfirmarClave] = useState({
        password:''
    })
    

    const handleChangeN = (e)=>{
        setNuevaClave({password : e.target.value})
    }
    const handleChangeC = (e)=>{
        setConfirmarClave({password : e.target.value})
    }

    const submit = async (event) =>{
        event.preventDefault()
        if(nuevaClave.password !== confirmarClave.password){
            Swal.fire('Las contraseñas no coinciden')
        }
        else if (nuevaClave.password.length < 6) {
            Swal.fire('La contraseña debe tener al menos 6 caracteres')
        }
        else {
            const { data } = await axios.post(`${API_URL}/password-recover`, nuevaClave);
        }
       
    }
    console.log(confirmarClave);
    
    return(
        <form onSubmit={submit}>
        <div className="contenedorLogin">
        <div className="box">
          <div className="boxlogo">
            <NavLink to='/'>
              <img className="logo" src={logo} alt="" />
            </NavLink>
          </div>
          <div className="label">
          
              <div className="text-wrapper3">Nueva contraseña</div>
          </div>
          <div className="boxInput">
              <input
                onChange={handleChangeN}
                value={nuevaClave.password}
                className="input"
                type="password"
                autoComplete="off"  
              />
          </div>
          <div className="label">
          
          <div className="text-wrapper3">Confirmar contraseña</div>
      </div>
      <div className="boxInput">
          <input
            onChange={handleChangeC}
            value={confirmarClave.password}
            className="input"
            type="password"
            autoComplete="off"  
          />
      </div>
          <hr />
          <div className="boxlin">
          </div>
          <div className="crear">
            <p className="text-wrapper4"></p>
              <button type="submit" className="botton2" value="submit">Enviar</button>
          </div>
        </div>
      </div>
      </form>

    )
}
export default RecoveryPassword;