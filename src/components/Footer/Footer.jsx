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
              <a href="https://www.facebook.com/sportvibe07">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/sportvibe07/">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Ayuda</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/payments">Pagos y Promociones</a>
            </li>
            <li>
              <a href="/deliveries">Entregas</a>
            </li>
            <li>
              <a href="/changes">Cambios</a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Institucional</h5>
          <ul className="list-unstyled">
            <li>
              <a href="http://localhost:5173/about">Quienes somos</a>
            </li>
            <li>
              <a href="/privacy">Politicas de Privacidad</a>
            </li>
            <li>
              <a href="/conditions">Terminos y Condiciones</a>
            </li>
            <li>
              <a href="https://www.argentina.gob.ar/produccion/defensadelconsumidor/icpen">
                Defensa al Consumidor
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">Centro de Atencion al Cliente</h5>
          <ul className="list-unstyled">
            <li>
              <a>Lunes a Viernes de 9 a 20 hs / Sábado de 9 a 17 hs</a>
            </li>
          </ul>
        </div>
        <div className={styles.logoContainer}>
          <img src={logoSportVibe} alt="" />
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      © 2023 Copyright:
      <p>
        TODOS LOS DERECHOS RESERVADOS. Las fotos contenidas en este site, el
        logotipo y las marcas son propiedad de SportVibe y/o de sus respectivos
        titulares. Está prohibida la reproducción total o parcial, sin la
        expresa autorización de la administradora de la tienda virtual.
        SportVibe - Latinoamérica.
      </p>
    </div>
  </footer>
);

export default Footer;
