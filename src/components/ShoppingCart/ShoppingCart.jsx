import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../loading/Loading";
import CartCards from './CartCards';
import {
  deleteProductFromCart,
  updateCartItemQuantity,
  getShoppingCart,
  quantityCartAction,
} from '../../redux/actions';
import getLocalStorageData from '../../utils/getLocalStorage';
import axios from 'axios';
import { API_URL } from '../../helpers/config';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.currentUserData);
  const userId = currentUserData ? currentUserData.id : null;
  const [reloadPage, setReloadPage] = useState(false);
  const [cartItems, setCartItems] = useState(null);
  const [localSubtotal, setLocalSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const calculateLocalSubtotal = () => {
    if (!cartItems || cartItems.cart.length === 0) {
      return 0;
    }
    return cartItems.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (userId) {
      dispatch(getShoppingCart(userId));
    } else {
      if (storedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(storedCart) });
      }
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const newSubtotal = calculateLocalSubtotal();
    if (newSubtotal !== localSubtotal) {
      setLocalSubtotal(newSubtotal);
    }
  }, [cartItems, localSubtotal]);

  /*   useEffect(() => {
      localStorage.setItem('currentCart', JSON.stringify(cartItems));
    }, [cartItems]); */

  useEffect(() => {
    initialStorageCart();
  }, [reloadPage]);

  const initialStorageCart = async () => {
    try {
      setLoading(true);
      const cartDataStorage = await getLocalStorageData("currentCart");
      setLoading(false);
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      parseCartDataStorage && setCartItems(parseCartDataStorage);
    } catch (error) {
      setLoading(false);
      console.error({ error: error.message });
    }
  };

  const handleRemoveFromCart = async (productId, productSize) => {
    // dispatch(deleteProductFromCart(productId));
    let newTotalQuantity = 0;
    const updateCart = cartItems?.cart.filter(product => {
      if ((Number(product.id) === Number(productId)) && (product.size !== productSize.toString()) || (Number(product.id) !== Number(productId))) {
        newTotalQuantity = newTotalQuantity + Number(product.quantity);
        return true;
      }
    });
    if (userId) {
      const result = await axios.delete(`${API_URL}/deleteShoppingProduct?userId=${userId}&productId=${productId}&productSize=${productSize}`);
    }
    setCartItems({ userId: userId, cart: updateCart });
    dispatch(quantityCartAction(newTotalQuantity)); // totalQuantity para mostrar en el carrito del nav bar.
    localStorage.setItem("currentCart", JSON.stringify({ userId: userId, cart: updateCart }));
    setReloadPage(!reloadPage); // para estar recuperando el carrito del localStorage cada vez que se actualice.
  };

  const handleGoToPayment = () => {
    navigate('/payment');
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2>Shopping Cart</h2>
      {loading && <div><Loading /></div>}

      {useMemo(
        () =>
          cartItems?.cart.map((item) => (
            <CartCards
              userId={userId}
              key={item.id}
              item={item}
              cartItems={cartItems.cart}
              setCartItems={setCartItems}
              handleRemoveFromCart={handleRemoveFromCart}
              reloadPage={reloadPage}
              setReloadPage={setReloadPage}
            />
          )),
        [cartItems]
      )}

      <div className="d-flex flex-column align-items-center mt-3">
        <div>
          <p>Subtotal: ${localSubtotal}</p>
          {localSubtotal <= 80 && (
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

