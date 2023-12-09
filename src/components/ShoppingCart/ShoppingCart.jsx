import { Link } from 'react-router-dom';
function ShoppingCart() {
  // Datos de ejemplo de productos seleccionados
  const product1 = {
    data: {
      id: 3,
      title: "CAMISETA TITULAR OFICIAL ARGENTINA 3 ESTRELLAS 2022",
      price: 89,
      discount: 0,
      Images: ["https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e71e00b27c824e2eab737a04afd5acaf_9366/Camiseta_Titular_Oficial_Argentina_3_estrellas_2022_Blanco_GC4397_01_laydown.jpg"],
    },
  };

  const product2 = {
    data: {
      id: 6,
      title: "LIVERPOOL FC STRIKE",
      price: 37,
      discount: 0,
      Images: ["https://nikearprod.vtexassets.com/arquivos/ids/156493-1200-1200?v=638086292695870000&width=1200&height=1200&aspect=true"],
    },
  };

 
  const calculateSubtotal = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return 0;
    }

    return cartItems.reduce((total, item) => total + item.data.price, 0);
  };

 
  const cartItems = [product1, product2];

 
  const subtotal = calculateSubtotal(cartItems);

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div key={item.data.id} className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={item.data.Images[0]} className="img-fluid rounded-start" alt={item.data.title} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.data.title}</h5>
                <p className="card-text">Price: ${item.data.price}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="d-flex flex-column align-items-center mt-3">
        <div>
          <p>Subtotal: ${subtotal}</p>
          {subtotal >= 130 && <p className="text-success">¡Ya casi! Para envío gratis a ciudades principales, agrega ${130 - subtotal} más.</p>}
        </div>
        <div>
          <p className="text-success">Disponible para envío</p>
          <div className="mb-2">
            {/* Espacio para agregar cupones de descuento */}
            <input type="text" className="form-control" placeholder="Cupón de descuento" />
          </div>
          <div className="d-flex gap-2">
            {/* Botón para ir a pagar */}
            <button type="button" className="btn btn-primary">
              Ir a Pagar
            </button>
            {/* Botón para agregar más productos (redirección al home) */}
            <Link to="/" className="btn btn-secondary">
              Agregar más productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;