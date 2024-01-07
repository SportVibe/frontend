import React from "react";
import styles from "../changes/changes.module.css";

function Changes() {
  return (
    <div>
      <h1 className={styles.title}>Cambios</h1>
      <hr />
      <div>
        <h3 className={styles.titleH3}>¿Puedo cambiar mi producto por otro?</h3>
        <p className={styles.p}>
          ¡Sí, podés elegir cualquier otro producto! Tené en cuenta que, para
          realizar el cambio por otro producto, siempre el nuevo que selecciones
          tiene que encontrarse en stock en la página al momento de tu
          solicitud. Es importante que sepas que, en el caso de que elijas solo
          el cambio de talle el precio del producto será el mismo y no se
          modificará. En cambio, si elegís otro producto distinto para cambiar
          (ya sea otro modelo o el mismo modelo, pero de diferente color) el
          precio puede variar y, en ese caso, deberás abonar la diferencia. En
          cualquiera de estas situaciones, el valor será tomado del producto
          inicial que figure en la factura original de compra (excluyendo el
          costo del envío). Tené presente que para los productos identificados
          como “LIQUIDACIÓN” los cambios estarán condicionados a la
          disponibilidad de stock. En el caso de querer cambiarlo por otro
          producto, podrás hacerlo eligiendo cualquier artículo, no
          necesariamente que esté incluido en esa categoría. ¡También recordá
          que no se realiza devolución de dinero en las sucursales! En el caso
          de que te arrepientas de la compra, podés solicitar la devolución del
          dinero, la cual se realizará al mismo medio de pago utilizado para
          realizar la compra.
        </p>
        <h3 className={styles.titleH3}> ¿Cómo se realiza un cambio? </h3>
        <p className={styles.p}>
          Te brindamos dos opciones: 1. Podés acercarte con el producto que
          recibiste a cualquiera de nuestras sucursales SportVibe, junto con la
          factura de compra y el packaging original, y realizar el cambio en
          forma presencial. Te dejamos a continuación el link de acceso directo
          para que puedas visualizar dónde se encuentran ubicadas nuestras
          tiendas físicas, según código postal: www.SportVibe.com.ar/sucursales
          y/o; 2. Podés solicitar que retiremos el producto por tu domicilio, lo
          que se realizará con alguno de nuestros correos contratados. Una vez
          retirado el producto, cuando llegue a nuestro depósito, se gestionará
          el cambio y se despachará el nuevo producto que elegiste. ¡Tené en
          cuenta que el primer cambio es siempre sin cargo! Si elegís esta
          opción, mandanos un email con los datos de tu orden a
          sportvibe07@gmail.com o contactanos a través del 0810-888-1234.
        </p>
        <h3 className={styles.titleH3}>
          ¿Cuánto tiempo tengo para hacer un cambio?
        </h3>
        <p className={styles.p}>
          Tenés hasta 30 (treinta) días corridos contados desde que recibiste el
          producto para realizar el cambio. El producto, al momento de
          devolverlo, debe presentar las mismas condiciones en las que fue
          entregado, es decir, debe estar en perfectas condiciones, sin uso,
          etiqueta y envoltorio original. Para hacer efectivo el cambio es
          obligatorio llevar la factura impresa o en un dispositivo móvil. En el
          caso de tratarse de un cambio por falla contás con 180 (ciento
          ochenta) días corridos desde la recepción del producto para realizar
          el reclamo correspondiente. Para este tipo de reclamos siempre es
          importante que tengas la factura de compra y que el plazo de la
          garantía se encuentre vigente.
        </p>
        <h3 className={styles.titleH3}>¿Realizar un cambio tiene costo?/</h3>
        <p className={styles.p}>
          ¡El primer cambio es gratis! Tanto en sucursal como a domicilio. A
          partir del segundo: • El costo del cambio (envío y retiro) se
          encuentra sujeto al domicilio de entrega. • En sucursal, ¡sigue siendo
          gratis! Si el motivo del cambio es porque recibiste un producto
          distinto al que compraste, el mismo no tendrá un costo asociado.
        </p>
        <h3 className={styles.titleH3}>
          {" "}
          ¿Cómo puedo ver el estado de mi cambio?{" "}
        </h3>
        <p className={styles.p}>
          Una vez que hayas realizado la reserva del nuevo producto para tu
          cambio, podrás visualizar el estado del pedido desde tu perfil en
          nuestra página web. El estado del pedido aparecerá como "Aprobación
          pendiente”. Luego, retiraremos el pedido por tu domicilio y lo
          llevaremos a nuestro depósito para ser analizado por nuestro sector de
          calidad. Tan pronto como el sector de calidad apruebe tu solicitud, la
          nueva orden será liberada y podrás ver el cambio de estado en tu
          perfil. Durante este proceso, el estado de tu solicitud cambiará de
          "Aprobación pendiente” a "En preparación". De esta forma, podrás
          seguir el estado de tu cambio en todo momento y estar al tanto del
          proceso de cambio.
        </p>
        <h3 className={styles.titleH3}> ¡Importante para considerar! </h3>
        <p className={styles.p}>
          {" "}
          • SportVibe se reserva el derecho a tener diferentes precios de
          productos, distintas promociones y/o descuentos tanto en sus tiendas
          de e-commerce como en sus tiendas físicas. • Si el motivo del cambio
          es sobre un producto con alguna falla o un producto distinto al que
          adquiriste, deberás enviar un correo con fotos en las cuales se pueda
          visualizar la falla, la etiqueta y/o caja del producto a
          sportvibe07@gmail.com Una vez enviado el correo, nos pondremos en
          contacto y te estaremos informando cuáles son los pasos por seguir
          para la gestión correspondiente. • Al realizar tu cambio por este
          medio, si el producto es de mayor valor, podrás abonar la diferencia a
          través de Mercado Pago (utilizando tu tarjeta de débito, crédito o
          Pago Fácil). Y si la diferencia es a favor, el reintegro se generará
          al medio de pago elegido en el momento que realizaste tu compra. Tener
          en cuenta que la devolución de dinero a favor al medio de pago elegido
          es únicamente para cambios realizados a través de las tiendas
          e-commerce. Si abonaste utilizando Mercado Pago, el reintegro se
          realizará en tu cuenta personal y si utilizaste una tarjeta de débito
          o crédito, el reintegro lo podrás ver reflejado en tu próximo resumen
          (es importante en este caso que tengas en cuenta la fecha del cierre
          de la tarjeta).
        </p>
      </div>
    </div>
  );
}

export default Changes;
