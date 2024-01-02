import { useEffect, useState } from 'react';
import axios from 'axios';
import validate from './Validationpayment';
import { API_URL } from '../../helpers/config';
import styles from './PaymentForm.module.css';
import getLocalStorageData from '../../utils/getLocalStorage';

const PaymentForm = ({ userId, total, shoppingCartId, cartItems: propCartItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [userItems, setUserItems] = useState(null);
  const [form, setForm] = useState({
    country: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({});
  const [localCartItems, setLocalCartItems] = useState([]);

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
    let sumaTotal = 0;
    cartItems.cart.forEach(product => {
      sumaTotal = sumaTotal + (product.price * product.quantity);
    })
    /* console.log({
      userId: userItems.user.id,
      ShoppingCartId: userItems.user.cartId,
      total: sumaTotal,
      shippingInfo: form,
    }); */

    try {
      setIsLoading(true);
      const response = await axios.post(`${API_URL}/create-order`, {
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
    const cartDataStorage = await getLocalStorageData("currentCart");
    const userDataStorage = await getLocalStorageData("currentUser");
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
      <h2>Detalles de Pago</h2>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${styles.formGroup}`}>
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
            <option value="">Selecciona un país</option>
            <option value="Colombia">Colombia</option>
            <option value="Chile">Chile</option>
            <option value="Argentina">Argentina</option>
          </select>
          {errors.country && <div className={`invalid-feedback ${styles.invalidFeedback}`}>{errors.country}</div>}
        </div>
        <div className={styles.orderDetails}>
          <h3>Detalles del Pedido</h3>
          <ul>
            {propCartItems?.map((item) => (
              <li key={item.id}>
                <strong>ID:</strong> {item.id}<br />
                <strong>Título:</strong> {item.title}<br />
                <strong>Cantidad:</strong> {item.quantity}<br />
                <strong>Tamaño:</strong> {item.size}<br />
                <strong>Precio:</strong> ${item.price}<br />
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" disabled={isLoading} className={`btn btn-primary ${styles.btn}`}>
          {isLoading ? 'Procesando...' : 'Ir a Pagar con PayPal'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
