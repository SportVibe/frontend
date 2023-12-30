import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartCards from './CartCards';
import {
  deleteProductFromCart,
  updateCartItemQuantity,
  getShoppingCart,
} from '../../redux/actions';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth?.userId || null);
  const cartItems = useSelector(
    (state) => state.cart?.items || [],
    (prev, next) =>
      prev.length === next.length &&
      prev.every((item, index) => item.id === next[index].id)
  );
  const [localSubtotal, setLocalSubtotal] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (userId) {
      dispatch(getShoppingCart(userId));
    } else if (storedCart) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const calculateLocalSubtotal = () => {
      if (!cartItems || cartItems.length === 0) {
        return 0;
      }
      return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    };

    const newSubtotal = calculateLocalSubtotal();
    if (newSubtotal !== localSubtotal) {
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
      setLocalSubtotal(newSubtotal);
    }
  }, [cartItems, localSubtotal]);

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateCartItemQuantity(productId, newQuantity));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(deleteProductFromCart(productId));
  };

  const handleGoToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2>Shopping Cart</h2>

      {useMemo(
        () =>
          cartItems.map((item) => (
            <CartCards
              key={item.id}
              item={item}
              handleQuantityChange={handleQuantityChange}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          )),
        [cartItems]
      )}

      <div className="d-flex flex-column align-items-center mt-3">
        <div>
          <p>Subtotal: ${localSubtotal}</p>
          {localSubtotal >= 80 && (
            <p className="text-success">
              ¡Ya casi! Para envío gratis a ciudades principales, agrega $
              {80 - localSubtotal} más.
            </p>
          )}
        </div>
        <div>
          <p className="text-success">Disponible para envío</p>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cupón de descuento"
            />
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleGoToPayment}
            >
              Ir a Pagar
            </button>
            <Link to="/" className="btn btn-secondary">
              Agregar más productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
