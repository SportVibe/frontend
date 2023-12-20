import React from "react";
import styles from "../deliveries/deliveries.module.css";

function Deliveries() {
  return (
    <div>
      <h1 className={styles.title}> Métodos de entrega </h1>
      <hr />
      <p className={styles.p}>
        Los envíos se realizan en toda la República Argentina, excepto a la
        provincia de Tierra del Fuego. La entrega se realizará en la dirección
        que nos indiques al momento de realizar tu compra, de lunes a viernes,
        entre las 8 y las 00 hs, con excepción de los feriados nacionales.
        Cuando la fecha de entrega coincida con un día feriado, se la pasará al
        próximo día hábil.
      </p>
      <h3 className={styles.titleH3}> Recogida en Tienda </h3>
      <p className={styles.p}>
        Podrás hacer tu compra online y recogerla en tienda cumpliendo todas las
        medidas de seguridad. Todos los pedidos a recoger en tienda no tienen
        gastos de envío independientemente de las características del producto
        (peso, tamaño, etc) con plazos de entrega desde 1 hora en función de la
        disponibilidad. Existe un protocolo específico para la retirada de los
        pedidos en tienda garantizando las medidas de protección. Para los
        productos Marketplace no es posible el envío con recogida en tienda.
        Puedes reconocer un producto Marketplace en decathlon.es por el texto
        "Vendido por" en la página del producto.
      </p>
      <h3 className={styles.titleH3}> Puntos de recogida </h3>

      <p className={styles.p}>
        Podrás hacer tu compra online y recogerla en los más de 6.000 puntos de
        recogida de Correos, Seur y Celeritas que tenemos disponibles. Para los
        productos Marketplace no es posible el envío con recogida en puntos de
        recogida. Gastos de envío: Desde 2,99€ o Gratis en compras superiores a
        30€ Plazos de entrega: El plazo habitual para Península será de 48h.
        Consultar condiciones especiales para Canarias, Ceuta, Melilla y Andorra
        Información adicional: El producto podrá tener un peso máximo de 25 kg o
        que la suma de sus lados no supere los 150cm. En el momento de
        seleccionar el método de entrega, introduce tu código postal para
        conocer los puntos disponibles y el horario.
      </p>
      <h3 className={styles.titleH3}> Envios a Domicilio </h3>

      <p className={styles.p}>
        Gastos de envío: Desde 6,99€ Plazos de entrega: Tú eliges dentro del
        mismo día de la compra o del día siguiente, en una franja horaria de 2
        horas. Información adicional: Disponible para los pedidos que se
        realicen de lunes a sábado. El servicio está limitado en kg dependiendo
        de la ciudad. 30 minutos antes de la entrega, te enviaremos un email/SMS
        para que puedas seguir el envío geolocalizado hasta la entrega.
      </p>
    </div>
  );
}

export default Deliveries;
