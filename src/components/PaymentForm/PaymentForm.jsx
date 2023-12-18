import { useState } from 'react';
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import validate from './Validationpayment';
import styles from './PaymentForm.module.css';

const PaymentForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    pais: '',
    addressName: '',
    addressSurname: '',
    documentoIdentidad: '',
    address: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
  });
  const [errors, setErrors] = useState({});
  const [saveInfo, setSaveInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setSaveInfo((prevSaveInfo) => !prevSaveInfo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || isLoading) {
      return;
    }

    try {
      setIsLoading(true);

      const formErrors = validate(form);
      setErrors(formErrors);

      if (Object.keys(formErrors).length > 0) {
        return;
      }

      const { token, error } = await stripe.createToken(elements.getElement(CardElement));

      if (error) {
        console.error("Error al crear el token de Stripe:", error);
      } else {
        await handleStripePayment(token);
      }
    } catch (error) {
      console.error("Error en handleSubmit:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripePayment = async (stripeToken) => {
    try {
      const response = await fetch("/api/process-stripe-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripeToken: stripeToken.id,
          amount: total,
        }),
      });

      if (response.ok) {
        console.log("Pago con tarjeta de crédito procesado con éxito.");
      } else {
        console.error("Error al procesar el pago con tarjeta de crédito:", response.statusText);
      }
    } catch (error) {
      console.error("Error en handleStripePayment:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        
        <h2>Dirección de Envío</h2>
        <div className="form-group">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="país"
            value={form.país}
            onChange={handleChange}
            className={`form-control ${errors.país ? 'is-invalid' : ''}`}
          />
          {errors.país && <div className="invalid-feedback">{errors.país}</div>}
        </div>
  
        <div className="form-group">
          <label htmlFor="addressName">Nombre</label>
          <input
            type="text"
            id="addressName"
            name="addressName"
            value={form.addressName}
            onChange={handleChange}
            className={`form-control ${errors.addressName ? 'is-invalid' : ''}`}
          />
          {errors.addressName && <div className="invalid-feedback">{errors.addressName}</div>}
        </div>
  
        <div className="form-group">
          <label htmlFor="addressSurname">Apellido</label>
          <input
            type="text"
            id="addressSurname"
            name="addressSurname"
            value={form.addressSurname}
            onChange={handleChange}
            className={`form-control ${errors.addressSurname ? 'is-invalid' : ''}`}
          />
          {errors.addressSurname && <div className="invalid-feedback">{errors.addressSurname}</div>}
        </div>
  
        <div className="form-group">
          <label htmlFor="identification">Documento de Identidad</label>
          <input
            type="text"
            id="identification"
            name="identification"
            value={form.identification}
            onChange={handleChange}
            className={`form-control ${errors.identification ? 'is-invalid' : ''}`}
          />
          {errors.identification && <div className="invalid-feedback">{errors.identification}</div>}
        </div>
  
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="saveInfo"
            checked={saveInfo}
            onChange={handleCheckboxChange}
            className="form-check-input"
          />
          <label htmlFor="saveInfo" className="form-check-label">Guardar mi información para consultas futuras</label>
        </div>
  
        <h2>Pago</h2>
        <div className="form-group">
          <label>Tarjeta de Crédito</label>
          <CardElement className={`form-control ${errors.card ? 'is-invalid' : ''}`} />
          {errors.card && <div className="invalid-feedback">{errors.card}</div>}
        </div>

        
        <button type="submit" className="btn btn-primary" disabled={!stripe || isLoading}>
          {isLoading ? "Procesando..." : "Pagar con Tarjeta"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
