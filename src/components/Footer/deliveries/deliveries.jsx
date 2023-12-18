import React from "react";
import styles from "../deliveries/deliveries.module.css";


function Deliveries() {
  return (
    <div>
      <h1 className={styles.title}> Entregas </h1>
      <hr/>
      <p className={styles.p}>
        Los envíos se realizan en toda la República Argentina, excepto a la
        provincia de Tierra del Fuego. La entrega se realizará en la dirección
        que nos indiques al momento de realizar tu compra, de lunes a viernes,
        entre las 8 y las 00 hs, con excepción de los feriados nacionales.
        Cuando la fecha de entrega coincida con un día feriado, se la pasará al
        próximo día hábil. No se entregarán órdenes a casillas de correo o
        apartados postales. También podés disponer de la opción del retiro en
        sucursal.
      </p>
      <h3 className={styles.titleH3}> ¿Cuánto tarda en llegar mi pedido? </h3>
      <p className={styles.p}>
        El tiempo de entrega depende de la disponibilidad del producto, del
        tiempo de envío y de la aprobación del medio de pago. Los días que se
        indiquen son estimativos, y corren siempre a partir del momento en que
        el pedido se despacha. Normal/Prioritario AMBA 2-3 DÍAS HÁBILES Normal
        GRANDES CIUDADES 4-5 DÍAS HÁBILES Normal INTERIOR DE INTERIOR 7-8 DÍAS
        HÁBILES Express EN EL DÍA, CABA comprando antes de las 12 hs. Válido
        para los días hábiles. Express EN EL DÍA, 1ER Y 2DO CORDÓN GBA comprando
        antes de las 12 hs. Válido para días hábiles. Express CÓRDOBA CAPITAL,
        ROSARIO, MENDOZA, PARANÁ, SANTA FE, SAN JUAN, SAN LUIS, BAHÍA BLANCA.
        Comprando antes de las 13 hs. tu pedido llega al día siguiente.
        Comprando después de las 13, llega en 48 hs. Válido para días hábiles.
        Eco Envío CABA 2-3 DÍAS HÁBILES Aclaración: por el alto volumen de
        ventas que se genera durante las fechas de Hot Sale y Cyber Monday, los
        operadores logísticos pueden tener demoras adicionales de entrega en
        algunas regiones.
      </p>
      <p className={styles.p}>
        Envío Express EN EL DÍA, CABA Válido para los días hábiles. La entrega
        en 24 hs es un servicio premium destinado para residentes de CABA.
        Válido para compras realizadas con tarjeta de crédito. Si el pedido se
        realiza antes de las 12 hs, llegará ese mismo día. Horarios de entrega
        hasta las 21 hs. Si no al siguiente. Límite de peso 690 g (equivalente a
        un calzado). </p>
        
        <p className={styles.p}>Envío Express EN EL DÍA, 1ER Y 2DO CORDÓN GBA Válido para
        los días hábiles. La entrega en 24 hs es un servicio premium destinado
        para residentes de 1er y 2do cordón de GBA. Válido para compras
        realizadas con tarjeta de crédito. Si el pedido se realiza antes de las
        12 hs, llegará ese mismo día. Horario de entrega hasta las 21 hs. Si no
        al siguiente. Límite de peso 690 g (equivalente a un calzado).</p>
        
       <p className={styles.p}> Envío Express CÓRDOBA CAPITAL, ROSARIO, MENDOZA, PARANÁ, SANTA FE, SAN JUAN,
        SAN LUIS, BAHÍA BLANCA Válido para los días hábiles. La entrega en 24 hs
        es un servicio premium. Válido para compras realizadas con tarjeta de
        crédito. Si el pedido se realiza antes de las 13 hs, llegará al día
        siguiente. Si no en 48hs. Límite de peso 690 g (equivalente a un
        calzado). </p>
        
        <p className={styles.p}>Envío XL Servicio para envío de productos de gran volumen que
        requieren un transporte especial debido a su tamaño. Solo permite una
        unidad por compra. El plazo de entrega para los productos de gran
        volumen es de 10 días hábiles. Eco Envío CABA Tus compras te llegan en
        bici y envueltas en bolsas compostables. Conocé más haciendo click en
        Sustentabilidad </p>
      
    </div>
  );
}

export default Deliveries;
