import React from "react";
import styles from "../conditions/conditions.module.css";

function Conditions() {
  return (
    <div>
      <h1 className={styles.title}>Terminos y Condiciones</h1>
      <div className={styles.box}>
        <h3 className={styles.titleH3}>Condiciones Generales</h3>
        <p className={styles.p}>
          Este contrato describe los Términos y Condiciones Generales (en
          adelante, los “Términos y Condiciones”) que se aplicarán para la
          navegación del sitio web www.dexter.com.ar, y los servicios ofrecidos
          en él (en adelante, el “website”). La responsabilidad del uso y los
          derechos del website son de DABRA S.A. (en adelante, “DABRA”) CUIT:
          30-63848573-3.
        </p>
      </div>
      <hr />

      <div>
        <h3 className={styles.titleH3}>
          Aceptación y conocimiento de los Términos y Condiciones
        </h3>
        <p className={styles.p}>
          Cualquier persona (en adelante, “Usuario” o en plural “Usuarios”) que
          desee acceder y/o utilizar el website o sus servicios, podrá hacerlo
          sujetándose a los Términos y Condiciones, junto con todas las demás
          políticas y principios que rigen, y que son incorporados al presente.
          Los presentes Términos y Condiciones tienen carácter obligatorio y
          vinculante para las partes. Se aplican a todas las compras y
          actividades realizadas en el website. El uso del website implica el
          conocimiento y la aceptación de todos ellos. Las personas que no
          acepten estos Términos y Condiciones, los cuales tienen carácter
          vinculante y obligatorio, se deberá abstener de utilizar el sitio web.
        </p>
      </div>
      <hr />

      <div>
        <h3 className={styles.titleH3}>
          Modificación de los Términos y Condiciones:
        </h3>
        <p className={styles.p}>
          DABRA se reserva el derecho de modificar los Términos y Condiciones en
          cualquier momento, haciéndolos público en el website, y pondrá un
          aviso alertando a los Usuarios que así lo requieran en la suscripción,
          informando las modificaciones que pudiera sufrir, durante un tiempo
          razonable. Sin perjuicio de lo anterior, los Usuarios son responsables
          de leer estos Términos y Condiciones cada vez que ingresen al website
          para ver si han sufrido modificaciones. Todo Usuario que no se
          encuentre de acuerdo con las modificaciones sufridas, tendrá la
          posibilidad de solicitar la baja del sitio.
        </p>
      </div>
      <hr />

      <div>
        <h3 className={styles.titleH3}>Cookies:</h3>
        <p className={styles.p}>
          El website puede utilizar un sistema de seguimiento mediante
          “cookies”, para que el acceso a la información, al pasar de página en
          página, se realice con mayor rapidez. También ayuda en algunos casos a
          identificar a los Usuarios, sin necesidad de solicitarles la clave de
          acceso una y otra vez. Estas cookies son pequeños archivos que envía
          la página visitada y se alojan en el disco duro del ordenador,
          ocupando poco espacio. Se hace saber a los Usuarios que utilizando las
          opciones de su navegador podrán limitar o restringir según su voluntad
          el alojamiento de estas “cookies”, aunque es desaconsejable
          restringirlas totalmente. El sistema podrá recoger información sobre
          sus preferencias e intereses. En el caso de que esto ocurra, la
          información será utilizada exclusivamente con fines estadísticos para
          mejorar los servicios que se prestan en el website. DABRA aplicará, en
          la mayor medida en que sea posible, procedimientos de disociación de
          la información de modo que los titulares de los datos sean
          inidentificables.
        </p>
      </div>
      <hr />

      <div>
        <h3 className={styles.titleH3}>Devolución del importe abonado:</h3>
        <p className={styles.p}>
          En los casos mencionados en el punto anterior en que el Usuario haya
          optado por la devolución del importe abonado, deberá tener en cuenta
          que el reintegro puede demorar como máximo 10 días hábiles, ello
          debido a plazos y cuestiones administrativas. Para los casos de
          devolución vía depósito bancario, la cuenta bancaria deberá estar a
          nombre del titular de la cuenta de Usuario desde donde se haya
          realizado la operación. En caso de que no coincidan las titularidades,
          se requerirá la expresa autorización del titular de la cuenta de
          Usuario como condición indispensable previa al depósito. Se le
          recomienda al Usuario, en caso de tener inconvenientes con la
          visibilidad del importe devuelto, comunicarse o realizar la consulta
          de la devolución con su entidad bancaria.
        </p>
      </div>
    </div>
  );
}

export default Conditions;
