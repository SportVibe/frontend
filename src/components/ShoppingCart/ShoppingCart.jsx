import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const calculateSubtotal = (items) => {
    if (!items || items.length === 0) {
      return 0;
    }
    return items.reduce((total, item) => total + item.data.price * item.quantity, 0);
  };

  const saveCartToCookie = (items) => {
    const cartData = JSON.stringify(items);
    document.cookie = `cart=${encodeURIComponent(cartData)}; expires=${new Date(
      Date.now() + 86400e3
    ).toUTCString()}; path=/`;
  };

  const getCartFromCookie = () => {
    const cookieValue = document.cookie.replace(
      /(?:(?:^|.*;\s*)cart\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    return cookieValue ? JSON.parse(decodeURIComponent(cookieValue)) : [];
  };

  useEffect(() => {
    const storedCart = getCartFromCookie();
    setCartItems(storedCart);
  }, []);

  useEffect(() => {
    saveCartToCookie(cartItems);
  }, [cartItems]);

  const handleRemoveFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item.data.id !== productId);
    setCartItems(newCartItems);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.data.id === productId ? { ...item, quantity: parseInt(newQuantity, 10) || 1 } : item
    );
    setCartItems(updatedCart);
  };

  const subtotal = calculateSubtotal(cartItems);

  const handleGoToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div key={item.data.id} className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={item.data.Images[0]}
                className="img-fluid rounded-start"
                alt={item.data.title}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.data.title}</h5>
                <p className="card-text">Price: ${item.data.price}</p>
                <div className="input-group">
                  <span className="input-group-text">Quantity:</span>
                  <input
                    type="number"
                    className="form-control"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.data.id, e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => handleRemoveFromCart(item.data.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex flex-column align-items-center mt-3">
        <div>
          <p>Subtotal: ${subtotal}</p>
          {subtotal >= 130 && (
            <p className="text-success">
              ¡Ya casi! Para envío gratis a ciudades principales, agrega ${130 - subtotal} más.
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
            <button type="button" className="btn btn-primary" onClick={handleGoToPayment}>
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
