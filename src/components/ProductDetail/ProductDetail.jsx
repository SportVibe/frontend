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
import imagen1 from "../../Images/Pinterest-logo.png";
import imagen2 from "../../Images/754_facebook_icon.jpg";
import imagen3 from "../../Images/pngtree-twitter-social-media-round-icon-png-image_6315985.png";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reloadPage, setReloadPage] = useState(false);
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
      const cartDataStorage = await getLocalStorageData("currentCart");
      const parseCartDataStorage = JSON.parse(cartDataStorage);
      parseCartDataStorage && setStorageCart(parseCartDataStorage);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  const handleAddToCart = () => {
    let repeat = false;
    const updateLocalStorageCart = storageCart.map((object) => {
      if (
        object.id === id &&
        object.size === selectSize &&
        object.color === selectColor
      ) {
        const newQuantity = Number(object.quantity) + Number(quantity);
        repeat = true;
        return { ...object, quantity: newQuantity };
      } else return object;
    });
  
    if (repeat) {
      localStorage.setItem(
        "currentCart",
        JSON.stringify(updateLocalStorageCart)
      );
    } else {
      const selectedStock = data.Stocks.find(
        (stock) => Object.keys(stock)[0] === selectSize
      );
      const availableQuantity = selectedStock ? selectedStock[selectSize] : 0;
  
      if (quantity > availableQuantity) {
        return;
      }
  
      const newItem = {
        id: data.id,
        title: data.title,
        imagen1: data.Images[0], 
        quantity,
        size: selectSize,
        price: data.price,
        color: selectColor,
        
      };
  
      setStorageCart([...storageCart, newItem]);
      localStorage.setItem(
        "currentCart",
        JSON.stringify([...storageCart, newItem])
      );
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
  
    console.log('Cart Items:', storageCart);
    navigate("/shoppingcart");
    setReloadPage(!reloadPage);
    return setReloadPage(!reloadPage);
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
  }, [reloadPage]);

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
              {"US$" +
                (data.price / 1).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>

            <p>{data.Colors.join(", ")}</p>
            <p>Talles:</p>
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
                    onClick={() => handleSizeSelection(Object.keys(stock)[0])}
                  >
                    {Object.keys(stock)[0]}
                  </button>
                ))}
            </div>
            <div className={styles.descriptionText}>
              <p>{generateDescriptionText()}</p>
            </div>
            <div>
              <label className={styles.quantity}>
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
            <div>
              <div className={styles.shippingInfoContainer}>
                <button onClick={() => setShowShippingInfo(!showShippingInfo)}>
                  Envíos y Devoluciones
                  <i
                    className={`bi bi-chevron-${
                      showShippingInfo ? "up" : "down"
                    }`}
                  />
                </button>
              </div>
              {showShippingInfo && (
                <div className={styles.shippingInfoContent}>
                  <p>
                    <strong>Envíos</strong>
                  </p>
                  <p>
                    19 dólares a ciudades principales o ciudades intermedias.
                    GRATIS por compras de 80 dólares o más. Entrega de 4-7 días
                    hábiles.
                  </p>
                  <p>
                    38 dólares a poblaciones. GRATIS por compras de 150 dólares
                    o más. Entrega de 10-12 días hábiles.
                  </p>
                  <p>
                    <strong>Cambios y Devoluciones</strong>
                  </p>
                  <p>
                    Con SportVibe tienes tu satisfacción 100% garantizada; si
                    por algún motivo no estás satisfecho con tu compra, tienes
                    hasta 30 días para un cambio
                  </p>
                </div>
              )}
            </div>
            <div className={styles.shareButtonsContainer}>
              <button onClick={handleShareOnFacebook}>
                {" "}
                <img
                  src={imagen2}
                  alt=""
                  style={{ width: "30px", height: "27px" }}
                />
              </button>
              <button onClick={handleShareOnTwitter}>
                {" "}
                <img
                  src={imagen3}
                  alt=""
                  style={{ width: "30px", height: "27px" }}
                />
              </button>
              <button onClick={handlePinOnPinterest}>
                {" "}
                <img
                  src={imagen1}
                  alt=""
                  style={{ width: "30px", height: "27px" }}
                />{" "}
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
