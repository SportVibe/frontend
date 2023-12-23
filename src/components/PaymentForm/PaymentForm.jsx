import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import validate from './Validationpayment';
import styles from './PaymentForm.module.css';

const PaymentForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    // Información de envío
    country: '',
    address: '',
    city: '',
    zipCode: '',
    // Información de facturación
    billingAddress: '',
    billingCity: '',
    billingZipCode: '',
    // Información de la tarjeta de crédito
    cardHolderName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
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

      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            line1: form.billingAddress,
            city: form.billingCity,
            postal_code: form.billingZipCode,
          },
        },
      });

      if (error) {
        console.error('Error al crear el método de pago de Stripe:', error);
      } else {
        await handleStripePayment(paymentMethod);
      }
    } catch (error) {
      console.error('Error en handleSubmit:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStripePayment = async (paymentMethod) => {
    try {
      const response = await fetch('/api/process-stripe-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: total,
          billingAddress: form.billingAddress,
          billingCity: form.billingCity,
          billingZipCode: form.billingZipCode,
        }),
      });

      if (response.ok) {
        // Redirigir a la página de confirmación o factura PDF
        console.log('Pago con tarjeta de crédito procesado con éxito.');
      } else {
        console.error('Error al procesar el pago con tarjeta de crédito:', response.statusText);
      }
    } catch (error) {
      console.error('Error en handleStripePayment:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>Dirección de Envío</h2>
        <div className="form-group">
          <label htmlFor="country">País</label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className={`form-control ${errors.country ? 'is-invalid' : ''}`}
          >
            <option value="">Selecciona un país</option>
            <option value="Colombia">Colombia</option>
            <option value="Chile">Chile</option>
            <option value="Argentina">Argentina</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={`form-control ${errors.city ? 'is-invalid' : ''}`}
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Código Postal</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
          />
          {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
        </div>

        {/* Opción para seleccionar si la información de facturación es la misma que la de envío */}
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="saveInfo"
            checked={saveInfo}
            onChange={handleCheckboxChange}
            className="form-check-input"
          />
          <label htmlFor="saveInfo" className="form-check-label">
            Utilizar la misma información para facturación
          </label>
        </div>

        {/* Información de Facturación */}
        <h2>Información de Facturación</h2>
        <div className="form-group">
          <label htmlFor="billingAddress">Dirección de Facturación</label>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={form.billingAddress}
            onChange={handleChange}
            className={`form-control ${errors.billingAddress ? 'is-invalid' : ''}`}
            disabled={saveInfo}
          />
          {errors.billingAddress && <div className="invalid-feedback">{errors.billingAddress}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="billingCity">Ciudad de Facturación</label>
          <input
            type="text"
            id="billingCity"
            name="billingCity"
            value={form.billingCity}
            onChange={handleChange}
            className={`form-control ${errors.billingCity ? 'is-invalid' : ''}`}
            disabled={saveInfo}
          />
          {errors.billingCity && <div className="invalid-feedback">{errors.billingCity}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="billingZipCode">Código Postal de Facturación</label>
          <input
            type="text"
            id="billingZipCode"
            name="billingZipCode"
            value={form.billingZipCode}
            onChange={handleChange}
            className={`form-control ${errors.billingZipCode ? 'is-invalid' : ''}`}
            disabled={saveInfo}
          />
          {errors.billingZipCode && <div className="invalid-feedback">{errors.billingZipCode}</div>}
        </div>

        {/* Información de la Tarjeta de Crédito */}
        <h2>Información de la Tarjeta de Crédito</h2>
        <div className="form-group">
          <label htmlFor="cardHolderName">Nombre del Titular de la Tarjeta</label>
          <input
            type="text"
            id="cardHolderName"
            name="cardHolderName"
            value={form.cardHolderName}
            onChange={handleChange}
            className={`form-control ${errors.cardHolderName ? 'is-invalid' : ''}`}
          />
          {errors.cardHolderName && <div className="invalid-feedback">{errors.cardHolderName}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="cardNumber">Número de Tarjeta</label>
          <CardElement
            id="cardNumber"
            className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="cardExpiry">Fecha de Expiración (MM/AA)</label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={form.cardExpiry}
            onChange={handleChange}
            className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
          />
          {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="cardCvc">CVC</label>
          <input
            type="text"
            id="cardCvc"
            name="cardCvc"
            value={form.cardCvc}
            onChange={handleChange}
            className={`form-control ${errors.cardCvc ? 'is-invalid' : ''}`}
          />
          {errors.cardCvc && <div className="invalid-feedback">{errors.cardCvc}</div>}
        </div>

        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={!stripe || isLoading}>
          {isLoading ? 'Procesando...' : 'Pagar con Tarjeta'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
