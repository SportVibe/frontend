import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../../helpers/config";
import Carousel2 from "../Carousel2/Carousel2";
import Loading from "../loading/Loading";
import axios from "axios";
import getLocalStorageData from "../../utils/getLocalStorage";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [storageCart, setStorageCart] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState();
  const [selectSize, setSelectSize] = useState();

  const title = data?.title ? data.title : "";
  const Colors = data?.Colors.length ? data.Colors : [""];
  const Images = data?.Images.length ? data.Images : [""];
  const Stocks = data?.Stocks.length ? data.Stocks : [""];
  const description = data?.description ? data.description : "";
  const brand = data?.mark ? data.mark : "";
  let price = data?.price ? data.price : "";
  price = (price / 1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // const available = data?.available ? data.available : "";
  // const category = data?.category ? data.category : "";
  // const discount = data?.discount ? data.discount : "";
  // const subCategory = data?.subCategory ? data.subCategory : "";

  useEffect(() => {
    axios
      .get(`${API_URL}/detail/${id}`)

      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log("Error fetching product details:", error);
      });
  }, []);

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
            <p>{title}</p>
          </div>
          <hr />
          <div className={styles.imgContainer}>
            {Images.length &&
              Images.map((image, i) => {
                return (
                  <div key={i}>
                    <img key={id} src={image} alt="" />
                  </div>
                );
              })}
          </div>

          <hr />
          <div className={styles.Box}>
            <p> {description}</p>
            <p>{brand}</p>
            <p className={styles.price}>{price}</p>

            <p>Colores:</p>
            <div className={styles.buttonBoxColor}>
              {Colors &&
                Colors.length > 0 &&
                Colors.map((color, i) => (
                  <button
                    key={i}
                    className={selectColor === color ? styles.selected : ""}
                    onClick={() => handleColorSelection(color)}
                  >
                    {color}
                  </button>
                ))}
            </div>

            <p>Talla:</p>
            <div className={styles.talleBox}>
              {Stocks.length &&
                Stocks.map((stock, i) => {
                  const key = Object.keys(stock)[0];
                  return (
                    <button
                      key={i}
                      className={selectSize === key ? styles.selected : ""}
                      onClick={() => handleSizeSelection(key)}
                    >
                      {key}
                    </button>
                  );
                })}
            </div>
            <div className={styles.descriptionText}>
              <p>{generateDescriptionText()}</p>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={handleAddToCart}>
                Agregar al carrito
                <i className="bi bi-cart-plus" />
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
