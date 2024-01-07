import PropTypes from 'prop-types';
import { useState } from 'react';
import { quantityCartAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
const CartCards = ({ userId, cartItems, setCartItems, item, handleRemoveFromCart, setReloadPage, reloadPage }) => {
  const [quantity, setQuantity] = useState(item ? item.quantity : 0);
  const productId = Number(item.id);
  const productSize = item.size.toString();
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    // dispatch(updateCartItemQuantity(productId, newQuantity));
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    let newTotalQuantity = 0;
    const updateCart = cartItems?.map(product => {
      if (Number(product.id) === Number(productId) && product.size === productSize) {
        newTotalQuantity = newTotalQuantity + Number(newQuantity);
        return {...product, quantity: newQuantity}
      }
      else {
        newTotalQuantity = newTotalQuantity + Number(product.quantity);
        return product;
      } 
    });
    setCartItems({userId: userId, cart: updateCart});
    dispatch(quantityCartAction(newTotalQuantity));
    localStorage.setItem("currentCart",JSON.stringify({userId: userId, cart: updateCart}));
    setReloadPage(!reloadPage);
  };

    return (
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            {item.imagen1 && (
              <img
                src={item.imagen1}
                className="img-fluid rounded-start"
                alt={item.title}
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">ID: {item.id}</p>
              <p className="card-text">Size: {item.size}</p>
              <p className="card-text">Price: ${item.price}</p>
              <div className="input-group">
                <span className="input-group-text">Quantity:</span>
                <input
                  type="number"
                  min={0}
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e)}
                />
              </div>
              <button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => handleRemoveFromCart(item.id, productSize)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  CartCards.propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string),
      size: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    handleQuantityChange: PropTypes.func.isRequired,
    handleRemoveFromCart: PropTypes.func.isRequired,
  };
  
  export default CartCards;
  