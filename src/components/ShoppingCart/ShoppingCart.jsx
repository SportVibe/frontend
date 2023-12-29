import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCart,
  updateCartItemQuantity,
  getShoppingCart,
} from "../../redux/actions";

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
    if (userId) {
      dispatch(getShoppingCart(userId));
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
    navigate("/payment");
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2>Shopping Cart</h2>

      {useMemo(
        () =>
          cartItems.map((item) => (
            <div
              key={item.id}
              className="card mb-3"
              style={{ maxWidth: "540px" }}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={item.images[0]}
                    className="img-fluid rounded-start"
                    alt={item.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <div className="input-group">
                      <span className="input-group-text">Quantity:</span>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
