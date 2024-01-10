import React from "react";
import styles from "../payments/payments.module.css";

function Payments() {
  return (
    <div className={styles.mainView}>
      <h1 className={styles.title}>Pagos y Promociones</h1>
      <hr />
      <h4 className={styles.p}>
        En SportVibe podés usar los siguientes métodos de pago:
      </h4>
      <h2 className={styles.card}>Tarjetas de Crédito</h2>
      <div id={styles.cardsBox}>
        <div className={styles.imgConteiner}>
          <img
            src="https://th.bing.com/th/id/R.3232ed3084533dfee74f98a2241f088c?rik=TkI%2b4YHzecPHgA&riu=http%3a%2f%2fandroidheadlines.com%2fwp-content%2fuploads%2f2013%2f02%2fVISA-Logo.jpg&ehk=nxv1u%2bbxt45JMmNsLiFioJUpYDxoPYOXZCRzh5J%2ffds%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
        </div>
        <div className={styles.imgConteiner}>
          <img
            src="https://cdn0.erstegroup.com/content/sites/rs/ebs/www_erstebank_rs/en/Stanovnistvo/Kartice/Mastercard/_jcr_content/configuration/pageTeasers/default/image.fitIn.w1200.png/15385696194461486473327516.png"
            alt=""
          />
        </div>
        <div className={styles.imgConteiner}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_(2018).svg/1200px-American_Express_logo_(2018).svg.png"
            alt=""
          />
        </div>
        <div className={styles.imgConteiner}>
          <img
            src="https://infonegocios.info/content/images/2022/07/20/51204/conversions/LogoInstitucional-naranja-medium-size.jpg"
            alt=""
          />
        </div>
        <div className={styles.imgConteiner}>
          <img
            src="https://th.bing.com/th/id/OIP.jR8JzRaBk7ikjbO7mbPsAgHaFj?rs=1&pid=ImgDetMain"
            alt=""
          />
        </div>
      </div>
      <h2 className={styles.card}>Tarjetas de Débito</h2>
      <div id={styles.cardsBox}>
        <div className={styles.imgConteiner}>
          <img
            src="https://th.bing.com/th/id/R.3232ed3084533dfee74f98a2241f088c?rik=TkI%2b4YHzecPHgA&riu=http%3a%2f%2fandroidheadlines.com%2fwp-content%2fuploads%2f2013%2f02%2fVISA-Logo.jpg&ehk=nxv1u%2bbxt45JMmNsLiFioJUpYDxoPYOXZCRzh5J%2ffds%3d&risl=&pid=ImgRaw&r=0"
            alt=""
          />
        </div>
        <div className={styles.imgConteiner}>
          <img
            src="https://th.bing.com/th/id/OIP.Z6fQcXB_8sYCaTPd_O2wSQHaFj?rs=1&pid=ImgDetMain"
            alt=""
          />
        </div>
        <div className={styles.imgConteiner}>
          <img
            src="https://www.cabal.coop/sites/www.cabal.coop/files/cabal_debito.png"
            alt=""
          />
        </div>
      </div>
      <h2 className={styles.card}>PayPal</h2>
      <div id={styles.cardsBox} className={styles.imgConteiner}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpTHz5buz-9NK9IIvy1a-alI8-x5NPnHeUqg&usqp=CAU"
          alt=""
        />
      </div>
    </div>
  );
}

export default Payments;