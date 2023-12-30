import PropTypes from 'prop-types';
const CartCards = ({ item, handleQuantityChange, handleRemoveFromCart }) => {
    return (
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            {item.images && item.images.length > 0 && (
              <img
                src={item.images[0]}
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
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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
  