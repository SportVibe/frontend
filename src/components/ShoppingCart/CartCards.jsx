import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { cartAction, quantityCartAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import Loading from '../loading/Loading';
const CartCards = ({ userId, cartItems, setCartItems, item, handleRemoveFromCart, setReloadPage, reloadPage }) => {
  const [quantity, setQuantity] = useState(item ? item.quantity : 0);
  const [loading, setLoading] = useState(item ? item.quantity : 0);
  const [productImage, setProductImage] = useState(null);
  const productId = Number(item.id);
  const productSize = item.size.toString();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = async (e) => {
    // dispatch(updateCartItemQuantity(productId, newQuantity));
    const newQuantity = e.target.value;
    let newItemBack = {};
    setQuantity(newQuantity);
    let newTotalQuantity = 0;
    const updateCart = cartItems?.map(product => {
      if (Number(product.id) === Number(productId) && product.size === productSize) {
        newTotalQuantity = newTotalQuantity + Number(newQuantity);
        newItemBack = { ...product, quantity: newQuantity }; // se actualiza para la base de datos también
        return { ...product, quantity: newQuantity }
      }
      else {
        newTotalQuantity = newTotalQuantity + Number(product.quantity);
        return product;
      }
    });
    // console.log({ userId, shoppingProduct: newItemBack });
    if (userId) {
      const result = await axios.put(`${API_URL}/putShoppingProduct`, { userId, shoppingProduct: newItemBack });
      // console.log(result.data);
    }
    setCartItems({ userId: userId, cart: updateCart });
    dispatch(quantityCartAction(newTotalQuantity));
    localStorage.setItem("currentCart", JSON.stringify({ userId: userId, cart: updateCart }));
    dispatch(cartAction({ userId: userId, cart: updateCart }));
    setReloadPage(!reloadPage);
  };

  function handleNavigate() {
    navigate(`/detail/${productId}`)
  }

  async function getImage() {
    try {
      setLoading(true);
      const { data } = await axios(`${API_URL}/detail/${productId}`);
      if (data) {
        setProductImage(data.data?.Images[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error({ error: error.message });
      setLoading(false);
    }
  }

  useEffect(() => {
    getImage();
  }, []);

  if (loading) {
    return <Loading />
  }
  else {
    return (
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4" onClick={handleNavigate}>
            {productImage && (
              <img
                src={productImage}
                className="img-fluid rounded-start"
                alt={item.title}
                onClick={handleNavigate}
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
  }
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
