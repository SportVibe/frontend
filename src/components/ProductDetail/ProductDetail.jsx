import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useEffect, useState } from "react";
import { API_URL } from '../../helpers/config';
import Carousel2 from '../Carousel2/Carousel2';
import Loading from "../loading/Loading";
import ButtonComponent from "../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const Colors = data?.Colors.length ? data.Colors : [""];
  const Images = data?.Images.length ? data.Images : [""];
  const Stocks = data?.Stocks.length ? data.Stocks : [""];
  const available = data?.available ? data.available : "";
  const category = data?.category ? data.category : "";
  const description = data?.description ? data.description : "";
  const discount = data?.discount ? data.discount : "";
  // const gender = data?.gender ? data.gender : "";
  const brand = data?.mark ? data.mark : "";
  const subCategory = data?.subCategory ? data.subCategory : "";
  const title = data?.title ? data.title : "";
  let price = data?.price ? data.price : "";
  price = (price / 1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/detail/${id}`)

      .then(({ data }) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log("Error fetching product details:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(data);

  return (
    <div className={styles.conteinerDetail}>
      {data ?
        <div className={styles.subContainerDetail}>
          <div className={styles.boxTitle}>
            <p>{title}</p>
          </div>
          <hr />
          <div className={styles.imgContainer}>
            {Images.length && Images.map((image, i) => {
              return (
                <div key={i}>
                  <img key={id} src={image} alt="" />
                </div>
              )
            })}
          </div>
          <div className={styles.buttonContainer}>
            <button>
              Agregar al carrito
              <i className="bi bi-cart-plus"/>
            </button>
          </div>
          <hr />
          <div className={styles.Box}>
            <p> {description}</p>
            <p>{brand}</p>
            <p>{price}</p>
            <p>{Colors?.join(", ")}</p>
          </div>
          <div className={styles.Carousel2Container}>
            <Carousel2 />
          </div>
        </div> :
        <Loading />
      }
    </div>
  );
};

export default ProductDetail;
