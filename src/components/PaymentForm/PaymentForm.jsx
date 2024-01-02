import { useState } from 'react';
import axios from 'axios';
import validate from './Validationpayment';
import { API_URL } from '../../helpers/config';


const PaymentForm = ({ userId, total, shoppingCartId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    country: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clickedField = Object.keys(form)[0];
    const validationErrors = validate(form, clickedField);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/create-order`, {
        userId,
        shoppingCartId,
        total,
        shippingInfo: form, 
      });

      
      window.location.href = response.data.orderUrl;
    } catch (error) {
      console.error('Error al crear la orden en PayPal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Detalles de Pago</h2>
      <form onSubmit={handleSubmit}>
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
          </select>
          {errors.country && <div className="invalid-feedback">{errors.country}</div>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Ir a Pagar con PayPal'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
