import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getLocalStorageData from "../../utils/getLocalStorage";
import Loading from "../loading/Loading";
import Carousel2 from "../Carousel2/Carousel2";
import { API_URL } from "../../helpers/config";
import styles from "./ProductDetail.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [storageCart, setStorageCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState();
  const [selectSize, setSelectSize] = useState();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}/detail/${id}`)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  const handleColorSelection = (color) => {
    setSelectColor(color);
  };

  const handleSizeSelection = (size) => {
    setSelectSize(size);
  };

  const generateDescriptionText = () => {
    let descriptionText = "Seleccionaste: ";
    if (selectColor) {
      descriptionText += `Color: ${selectColor}`;
    }
    if (selectSize) {
      descriptionText += ` | Talle: ${selectSize}`;
    }
    return descriptionText;
  };

  const initialStorageCart = async () => {
    try {
      const cartDataStorage = await getLocalStorageData('currentCart');
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      parseCartDataStorage && setStorageCart(parseCartDataStorage);
    } catch (error) {
      console.error({ error: error.message });
    }
  }

  const handleAddToCart = () => {
    if (!storageCart.includes(id)) {
      setStorageCart([...storageCart, id]);
      localStorage.setItem('currentCart', JSON.stringify([...storageCart, id]));
      /* navigate("/shoppingcart"); // Redirige al carrito después de agregar al carrito. */
    }

    const selectedStock = data.Stocks.find(
      (stock) => Object.keys(stock)[0] === selectSize
    );
    const availableQuantity = selectedStock
      ? selectedStock[selectSize]
      : 0;

    if (quantity > availableQuantity) {
      return;
    }

    dispatch(
      addToCart({
        id: data.id,
        title: data.title,
        price: data.price,
        quantity,
        size: selectSize,
        color: selectColor,
      })
    );

    navigate("/shoppingcart");
  };
  const handleShippingSelection = (option) => {
    setSelectedShipping(option);
  };

  const handleShareOnFacebook = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(window.location.href),
      "_blank"
    );
  };

  const handleShareOnTwitter = () => {
    window.open(
      "https://twitter.com/intent/tweet?url=" +
        encodeURIComponent(window.location.href),
      "_blank"
    );
  };

  const handlePinOnPinterest = () => {
    window.open(
      "https://pinterest.com/pin/create/button/?url=" +
        encodeURIComponent(window.location.href) +
        "&media=" +
        encodeURIComponent(data.Images[0]) +
        "&description=" +
        encodeURIComponent(data.title),
      "_blank"
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    initialStorageCart();
  }, []);

  return (
    <div className={styles.conteinerDetail}>
      {data ? (
        <div className={styles.subContainerDetail}>
          <div className={styles.boxTitle}>
            <p>{data.title}</p>
          </div>
          <hr />
          <div className={styles.imgContainer}>
            {data.Images.length &&
              data.Images.map((image, i) => (
                <div key={i}>
                  <img src={image} alt="" />
                </div>
              ))}
          </div>
          <hr />
          <div className={styles.Box}>
            <p>{data.description}</p>
            <p>{data.mark}</p>
            <p className={styles.price}>
              {(data.price / 1).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>Colores:</p>
            <div className={styles.buttonBoxColor}>
              {data.Colors &&
                data.Colors.length > 0 &&
                data.Colors.map((color, i) => (
                  <button
                    key={i}
                    className={
                      selectColor === color ? styles.selected : ""
                    }
                    onClick={() => handleColorSelection(color)}
                  >
                    {color}
                  </button>
                ))}
            </div>
            <p>Talla:</p>
            <div className={styles.talleBox}>
              {data.Stocks &&
                data.Stocks.length > 0 &&
                data.Stocks.map((stock, i) => (
                  <button
                    key={i}
                    className={
                      selectSize === Object.keys(stock)[0]
                        ? styles.selected
                        : ""
                    }
                    onClick={() =>
                      handleSizeSelection(Object.keys(stock)[0])
                    }
                  >
                    {Object.keys(stock)[0]}
                  </button>
                ))}
            </div>
            <div className={styles.descriptionText}>
              <p>{generateDescriptionText()}</p>
            </div>
            <div >
              <label>
                Cantidad:
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </label>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={handleAddToCart}>
                Agregar al carrito
                <i className="bi bi-cart-plus" />
              </button>
            </div>
            <div className={styles.shippingInfoContainer}>
              <button
                onClick={() =>
                  setShowShippingInfo(!showShippingInfo)
                }
              >
                Envíos y Devoluciones
                <i
                  className={`bi bi-chevron-${
                    showShippingInfo ? "up" : "down"
                  }`}
                />
              </button>
              {showShippingInfo && (
                <div className={styles.shippingInfoContent}>
                  <p>
                    <strong>Envíos</strong>
                  </p>
                  <p>
                    19 dólares a ciudades principales o ciudades
                    intermedias. GRATIS por compras de 80 dólares o más.
                    Entrega de 4-7 días hábiles.
                  </p>
                  <p>
                    38 dólares a poblaciones. GRATIS por compras de 150
                    dólares o más. Entrega de 10-12 días hábiles.
                  </p>
                  <p>
                    <strong>Cambios y Devoluciones</strong>
                  </p>
                  <p>
                    Con SportVibe tienes tu satisfacción 100%
                    garantizada; si por algún motivo no estás satisfecho
                    con tu compra, tienes hasta 30 días para un cambio 
                  </p>
                </div>
              )}
            </div>
            <div className={styles.shareButtonsContainer}>
              <button onClick={handleShareOnFacebook}>
                Facebook
              </button>
              <button  onClick={handleShareOnTwitter}>
                Twitter
              </button>
              <button onClick={handlePinOnPinterest}>
                Pinterest
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductDetail;
