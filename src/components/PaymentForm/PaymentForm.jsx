import { useEffect, useState } from 'react';
import axios from 'axios';
import validate from './Validationpayment';
import { API_URL } from '../../helpers/config';
import styles from './PaymentForm.module.css';
import getLocalStorageData from '../../utils/getLocalStorage';

const PaymentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [form, setForm] = useState({
    country: '',
    city: '',
    address: '',
    zipCode: '',
    mail: '',
    cel: '',
    sameBilling: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clickedField = Object.keys(form)[0];
    const validationErrors = validate(form, clickedField);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let sumaTotal = 0;
    cartItems.cart.forEach((product) => {
      sumaTotal += product.price * product.quantity;
    });

    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3005/create-order", {
        userId: userItems.user.id,
        ShoppingCartId: userItems.user.cartId,
        total: sumaTotal,
        shippingInfo: form,
      });

      window.location.href = response.data.orderUrl;
    } catch (error) {
      console.error('Error al crear la orden en PayPal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initialStorageCart = async () => {
    try {
      const cartDataStorage = await getLocalStorageData('currentCart');
      const userDataStorage = await getLocalStorageData('currentUser');
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      const parseUserDataStorage = JSON.parse(userDataStorage);
      parseCartDataStorage && setCartItems(parseCartDataStorage);
      parseUserDataStorage && setUserItems(parseUserDataStorage);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  useEffect(() => {
    initialStorageCart();
  }, []);

  return (
    <div className={styles.container}>


      <label htmlFor="country" className={styles.label}>
        País
      </label>
      <select
        id="country"
        name="country"
        value={form.country}
        onChange={handleChange}
        className={`form-control ${styles.input} ${errors.country ? 'is-invalid' : ''}`}
      >
        <option value="">Selecciona un país *</option>
        <option value="Colombia">Colombia</option>
        <option value="Chile">Chile</option>
        <option value="Argentina">Argentina</option>
      </select>
      {errors.country && <div className={`invalid-feedback ${styles.invalidFeedback}`}>{errors.country}</div>}

      <label>
        <input
          type="checkbox"
          name="sameBilling"
          checked={form.sameBilling}
          onChange={handleChange}
        />
        La información de envío es la misma que la registrada en el perfil de usuario
      </label>

      <div>
        <h2>Información de Envío</h2>
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${styles.formGroup}`}>
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              className={`form-control ${styles.input} ${errors.city ? 'is-invalid' : ''}`}
              disabled={form.sameBilling}
            />
          </div>
          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={`form-control ${styles.input} ${errors.address ? 'is-invalid' : ''}`}
            disabled={form.sameBilling}
          />
          <label htmlFor="zipCode">Código Postal</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={form.zipCode}
            onChange={handleChange}
            className={`form-control ${styles.input} ${errors.zipCode ? 'is-invalid' : ''}`}
            disabled={form.sameBilling}
          />
          <label htmlFor="mail">Correo electrónico</label>
          <input
            type="mail"
            id="mail"
            name="mail"
            value={form.mail}
            onChange={handleChange}
            className={`form-control ${styles.input} ${errors.mail ? 'is-invalid' : ''}`}
            disabled={form.sameBilling}
          />
          <label htmlFor="cel">Celular</label>
          <input
            type="tel"
            id="cel"
            name="cel"
            value={form.cel}
            onChange={handleChange}
            className={`form-control ${styles.input} ${errors.cel ? 'is-invalid' : ''}`}
            disabled={form.sameBilling}
          />
          <button type="submit" disabled={isLoading} className={`btn btn-primary ${styles.btn}`}>
            {isLoading ? 'Procesando...' : 'Ir a Pagar con PayPal'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
