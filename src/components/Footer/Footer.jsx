// function Footer() {
//     return (
//         <div className={styles.mainView}>
//             <div className={styles.logoContainer}>
//             <img src={logoSportVibe} alt="" />
//             </div>
//             <p>2023</p>
//         </div>
//     );
// }

// export default Footer;

import styles from "./Footer.module.css";
import React from "react";
import logoSportVibe from "../../Images/Logo.jpg";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4">
    <div className={styles.mainView}>
      <div className="row">
        <hr className="clearfix w-100 d-md-none pb-0" />

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Redes Sociales</h5>
          <ul className="list-unstyled">
            <li>
              <a>X</a>
            </li>
            <li>
              <a>Facebook</a>
            </li>
            <li>
              <a>Instagram</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Ayuda</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">¿Cómo comprar?</a>
            </li>
            <li>
              <a href="#!">Pagos y Promociones</a>
            </li>
            <li>
              <a href="#!">Entregas</a>
            </li>
            <li>
              <a href="#!">Cambios</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Institucional</h5>
          <ul className="list-unstyled">
            <li>
              <a href="#!">Quienes somos</a>
            </li>
            <li>
              <a href="#!">Politicas de Privacidad</a>
            </li>
            <li>
              <a href="#!">Terminos y Condiciones</a>
            </li>
            <li>
              <a href="#!">Defensa al Consumidor</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Centro de Atencion al Cliente</h5>
          <ul className="list-unstyled">
            <li>
              <a>Lunes a Viernes de 9 a 20 hs / Sábado de 9 a 17 hs</a>
            </li>
            <div className={styles.buttonConteiner}>
             <button>Boton de Arrepentimiento</button>
            </div>
          </ul>
        </div>
        <div className={styles.logoContainer}>
          <img src={logoSportVibe} alt="" />
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2023 Copyright:</div>
  </footer>
);

export default Footer;
