import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import getLocalStorageData from "../../utils/getLocalStorage";
import Loading from "../loading/Loading";
import { API_URL } from "../../helpers/config";
import styles from "./ProductDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, quantityCartAction } from "../../redux/actions";
import imagen1 from "../../Images/pinterest.png";
import imagen2 from "../../Images/facebook.png";
import imagen3 from "../../Images/twitter.png";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUserData = useSelector((state) => state.currentUserData);
  const userId = currentUserData ? currentUserData.id : null;
  const totalCartQuantity = useSelector((state) => state.totalCartQuantity);
  const [reloadPage, setReloadPage] = useState(false);
  const [data, setData] = useState(null);
  const [storageCart, setStorageCart] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState();
  const [selectSize, setSelectSize] = useState();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [showShippingInfo, setShowShippingInfo] = useState(false);
  const [reviewsAvg, setReviewsAvg] = useState(0);
  const [reviews, setReviews] = useState(null);
  const dispatch = useDispatch();
  console.log(reviews);

  useEffect(() => {
    axios
      .get(`${API_URL}/detail/${id}`)
      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
    return setData(null)
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialStorageCart();
    handleReviews();
  }, [reloadPage]); // para recuperar el carrito del localStorage cada vez que se actualice.

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
    let newItem = {};
    let repeat = false;
    const selectedStock = data.Stocks.find((stock) => {
      const size = Object.keys(stock)[0];
      return size === selectSize && quantity <= stock[size];
    });
    if (selectedStock) {
      if (!storageCart) {
        newItem = {
          id,
          title: data.title,
          imagen1: data.Images[0],
          quantity,
          size: selectSize,
          price: data.price,
        };
        localStorage.setItem(
          "currentCart",
          JSON.stringify({ userId: userId, cart: [newItem] })
        );
        const newTotalQuantity = Number(quantity);
        dispatch(quantityCartAction(newTotalQuantity));
        dispatch(addToCart(newItem));
        setReloadPage(!reloadPage);
        // navigate("/shoppingcart");
      } else {
        let newTotalQuantity = 0;
        console.log(storageCart);
        let updateLocalStorageCart = storageCart?.cart.map((object) => {
          if (Number(object.id) === Number(id) && object.size === selectSize) {
            repeat = true;
            newTotalQuantity =
              newTotalQuantity + Number(object.quantity) + Number(quantity);
            const newProductQuantity =
              Number(object.quantity) + Number(quantity);
            setStorageCart({ ...object, quantity: newProductQuantity });
            dispatch(addToCart({ ...object, quantity: newProductQuantity }));
            return { ...object, quantity: newProductQuantity };
          } else {
            newTotalQuantity = newTotalQuantity + Number(object.quantity);
            return object;
          }
        });
        if (!repeat) {
          newItem = {
            id,
            title: data.title,
            imagen1: data.Images[0],
            quantity,
            size: selectSize,
            price: data.price,
          };
          newTotalQuantity = newTotalQuantity + Number(quantity);
          setStorageCart([...storageCart.cart, newItem]);
          dispatch(addToCart(newItem));
          updateLocalStorageCart = [...updateLocalStorageCart, newItem];
        }
        localStorage.setItem(
          "currentCart",
          JSON.stringify({ userId: userId, cart: updateLocalStorageCart })
        );
        setReloadPage(!reloadPage);
        dispatch(quantityCartAction(newTotalQuantity)); // totalQuantity para mostrar en el carrito del nav bar.
        // navigate("/shoppingcart");
      }
    } else {
      alert("No hay stock del producto en esa talla");
    }
  };

  const handleShippingSelection = (option) => {
    setSelectedShipping(option);
  };

  const handleShareOnFacebook = () => {
    window.open(
        "https://www.facebook.com/sharer/sharer.php?href=" +
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

  const handleReviews = async () => {
    let suma = 0;
    let promedio = 0;
    let reviewData = await axios(`${API_URL}/reviews?productId=${id}`);
    setReviews(reviewData.data.data);
    reviewData.data.data.map((review) => {
      suma = suma + review.score;
    });
    promedio = (suma / reviewData.data.data.length);
    if(promedio === 1.0 || promedio === 2.0 || promedio === 3.0 || promedio === 4.0 || promedio === 5.0 ){
      promedio = parseInt(promedio);
    } else {
      promedio = Number(promedio.toFixed(1));
    }
    setReviewsAvg(promedio);
    promedio=0;
    suma=0;
  };


  const hanldeScore = (reviewsAvg) => {
    if (reviewsAvg === 1){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg > 1 && reviewsAvg < 2){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg === 2){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg > 2 && reviewsAvg < 3){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg === 3){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg > 3 && reviewsAvg < 4){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg === 4){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star text-primary fs-5"></i>
        </>);
    }
    if (reviewsAvg > 4 && reviewsAvg < 5){
      return (<>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-fill text-primary fs-5"></i>
        <i className="bi bi-star-half text-primary fs-5"></i>
        </>);
    }
    if ( reviewsAvg === 5){
      return (
        <>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
          <i className="bi bi-star-fill text-primary fs-5"></i>
        </>
      );
    }
  }
    
  return (
    <div className="d-flex w-100 justify-content-center">
      {!data ? (
        <div className="vh-100 d-flex align-items-center">
          <div class="spinner-grow text-success mx-3" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-grow text-danger mx-3" role="status">
            <span class="visually-hidden"></span>
          </div>
          <div class="spinner-grow text-warning mx-3" role="status">
            <span class="visually-hidden"></span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column w-75 ms-5 me-5">
          <div className="d-flex flex-lg-row mt-5 w-100 bg-body-tertiary gap-5 rounded-1 justify-content-center flex-lg-nowrap flex-md-wrap flex-sm-wrap">
            {/* CAROUSEL */}
            <div className="d-flex w-50 ms-4 mt-4">
              <div id="carouselExample" className="carousel slide">
                <div className="carousel-inner">
                  {data?.Images.map((img, i) => (
                    <div id={i} className="carousel-item active">
                      <img src={img} className={`${styles.image}`} alt="..." />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev text-success-emphasis"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="prev"
                  style={{
                    fontSize: "1.5rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0",
                    width: "40px",
                    top: "50%",
                    transform: "translateY(-90%)", // Centra verticalmente
                    background: "none", // Elimina el fondo
                    border: "none", // Elimina el borde
                    zIndex: "1", // Asegura que ,
                  }}
                >
                  <span
                    className="carousel-control-prev-icon text-success-emphasis  "
                    aria-hidden="true"
                    style={{
                      fontSize: "1.5rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0",
                      width: "40px",
                      position: "absolute",
                      left: "10px",
                      boxShadow: "none",
                      transition: "box-shadow 0.3s",
                    }}
                  ></span>
                  <span className="visually-hidden text-success-emphasis "></span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExample"
                  data-bs-slide="next"
                  style={{
                    fontSize: "1.5rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "0",
                    width: "40px",
                    top: "50%",
                    transform: "translateY(-90%)", // Centra verticalmente
                    background: "none", // Elimina el fondo
                    border: "none", // Elimina el borde
                    zIndex: "1", // Asegura que
                  }}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                    style={{
                      fontSize: "1.5rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0",
                      width: "40px",
                      position: "absolute",
                      right: "10px",
                      boxShadow: "none",
                      transition: "box-shadow 0.3s",
                    }}
                  ></span>
                  <span className="visually-hidden"></span>
                </button>
              </div>
              {/*  FIN CAROUSEL */}
            </div>
            {/* DETALLE PRODUCTO */}
            <div className="d-flex flex-column w-50 align-self-start mt-2">
              <div className="mt-3">
                <p className="text-success-emphasis mx-auto">
                  Nuevo | +1000 vendidos
                </p>
              </div>
              <p className="fs-3 mt-3 mb-0 overflow-hidden">{data?.title}</p>
              <hr />
              <p>{data?.brand}</p>
              {/* ESTRELLAS REVIEWS */}
              <button
                type="button"
                className="d-flex justify-content-start align-items-center w-25 bg-transparent border-0 overflow-visible text-dark mt-0 mb-2"
                data-bs-toggle="modal"
                data-bs-target="#reviewsModal"
              >
                ({(reviewsAvg)}) {hanldeScore(reviewsAvg)} (
                {reviews?.length})
              </button>
              {/* MODAL DE REVIEWS */}
              <div
                class="modal fade"
                id="reviewsModal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">
                        <p className="fs-5 ms-2 mb-2 mt-3 text-secondary">
                          <i className="bi bi-ui-checks fs-5"></i> Oponiones Del
                          Producto
                        </p>
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div className="w-100">
                        <ul class="list-group rounded-pill">
                          {reviews?.map((rev) => (
                            <div className="">
                              <li className="list-group-item rounded-3 mt-1">
                              ({(reviewsAvg)}) {hanldeScore(rev.score)} (
                                {reviews?.length})
                                <p className="fs-6 mb-0">{rev.description}</p>
                              </li>
                            </div>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column ">
                <p className="fs-2">
                  {"US$" +
                    (data?.price / 1).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </p>
                <div>
                  <p>
                    De Color:
                    <p>{data?.Colors.join(", ")}</p>
                  </p>
                </div>
              </div>
              <div className="d-flex mb-2">
                <p className="fs-5 me-3 my-auto">Talles:</p>
                {data?.Stocks &&
                  data?.Stocks.length > 0 &&
                  data?.Stocks.map((stock, i) => (
                    <button
                      key={i}
                      className="btn btn-outline-secondary btn-sm ms-1"
                      onClick={() => handleSizeSelection(Object.keys(stock)[0])}
                    >
                      {Object.keys(stock)[0]}
                    </button>
                  ))}
              </div>
              <div className="fs-5 mt-2">
                <p>{generateDescriptionText()}</p>
              </div>
              <div className="d-flex gap-3 mt-2">
                <label className="my-auto">Cantidad:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="form-control fs-5 m-0 w-25"
                />
              </div>
              <div className="mt-3 mb-5">
                <button
                  className="btn btn-primary w-50 mt-3"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                  <i className="bi bi-cart-plus" />
                </button>
              </div>
              <div className="text-secondary w-100 mb-4">
                <p className="fs-5">Descripción</p>
                {data?.description}
              </div>
            </div>
            {/* DETALLE PRODUCTO */}
          </div>
          {/* ENVIO DEVOLUCIONES Y REDES  */}
          <div className="d-flex ms-auto gap-2 mt-2">
            <div>
              <button
                type="button"
                class="btn bg-body-secondary mt-2 mb-1"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <i class="bi bi-info-circle"></i> Envios y devoluciones
              </button>
            </div>
            <div
              class="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">
                      Informacion Sobre Envios y Devoluciones
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Cerrar"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p>
                      <strong>Envíos</strong>
                    </p>
                    <p>
                      19 dólares a ciudades principales o ciudades intermedias.
                      GRATIS por compras de 80 dólares o más. Entrega de 4-7
                      días hábiles.
                    </p>
                    <p>
                      38 dólares a poblaciones. GRATIS por compras de 150
                      dólares o más. Entrega de 10-12 días hábiles.
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
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
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
          {/* ENVIO DEVOLUCIONES Y REDES  */}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
