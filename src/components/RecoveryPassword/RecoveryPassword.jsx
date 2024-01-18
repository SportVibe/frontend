import { NavLink } from "react-bootstrap";
import logo from "../../Images/Logo.jpg";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../helpers/config.js";
import styles from "./RecoveryPassword.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecoveryPassword = () => {

  const navigate = useNavigate();

  const [nuevaClave, setNuevaClave] = useState({
    newPassword: "",
    token: "",
  });

  useEffect(() => {
    //Captura los parámetros de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    if (token){
      setNuevaClave({ ...nuevaClave, token });
    }
  }, [nuevaClave.token]);
  


  const [confirmarClave, setConfirmarClave] = useState({
    password: "",
  });

  const handleChangeN = (e) => {
    setNuevaClave({ ...nuevaClave, newPassword: e.target.value });
  };
  const handleChangeC = (e) => {
    setConfirmarClave({ password: e.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (nuevaClave.newPassword !== confirmarClave.password) {
      Swal.fire({
        title:"Las contraseñas no coinciden",
        icon:"info"
      });
    } else if (nuevaClave.newPassword.length < 6) {
      Swal.fire({
        title:"La contraseña debe tener al menos 6 caracteres",
        icon:"info"
      });
    } else if (!nuevaClave.newPassword || !confirmarClave.password) {
        Swal.fire({
          title: "Por favor ingrese todas las contraseñas",
          icon: "info",
        });
    }else if (!nuevaClave.newPassword.trim() || !confirmarClave.password.trim()) {
          Swal.fire({
            title: "Por favor ingrese contraseñas válidas",
            icon: "info",
          });
    } else {
    
        await axios.post(`${API_URL}/password-update`,nuevaClave)
        .then(({data})=> {
          const Toast = Swal.mixin({
            toast: true,
            position: "center",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title:
              "Contraseña actualizada con exito, por favor ingrese nuevamente",
          });
          navigate("/login")
        })
        .catch ((error) => {
        Swal.fire({
          width: "20em",
          icon: "warning",
          title: `Error en actualizacion (${error.response.data.message})`,
          text: "Dispone de 1 minuto para ingresar la nueva contraseña",
          footer: "Por favor intentelo nuevamente",
        });
      })
      
    }
  };

  return (
    <form onSubmit={submit}>
      <div className={styles.contenedorLogin}>
        <div className={styles.box}>
          <div className={styles.boxlogo}>
            <NavLink to="/">
              <img className={styles.logo} src={logo} alt="" />
            </NavLink>
          </div>
       
           <div className={styles.label2}>Nueva Contraseña</div>
          
          <div className={styles.boxInput}>
            <input
              onChange={handleChangeN}
              value={nuevaClave.password}
              className={styles.input}
              type="password"
              autoComplete="off"
            />
          </div>
            <div className={styles.label2}>Confirmar Contraseña</div>
          <div className={styles.boxInput}>
            <input
              onChange={handleChangeC}
              value={confirmarClave.password}
              className={styles.input}
              type="password"
              autoComplete="off"
            />
          </div>
          <hr/>
          <div className={styles.boxlin}></div>
          <div className={styles.crear}>
            <p className={styles.label4}/>
            <button type="submit" className={styles.botton2} value="submit">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default RecoveryPassword;
