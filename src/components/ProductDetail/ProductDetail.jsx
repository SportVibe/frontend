import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetail = () => {

  const { id } = useParams();

  const [data, setData] = useState(null);



  const Colors = data?.Colors.length ? data.Colors : [''];
  const Images = data?.Images.length ? data.Images : [''];
  const Stocks = data?.Stocks.length ? data.Stocks : [''];
  const available = data?.available ? data.available : '';
  const category = data?.category ? data.category : '';
  const description = data?.description ? data.description : '';
  const discount = data?.discount ? data.discount : '';
  const gender = data?.gender ? data.gender : '';
  const brand = data?.brand ? data.brand : '';
  const subCategory = data?.subCategory ? data.subCategory : '';
  const title = data?.title ? data.title : '';
  let price = data?.price ? data.price : '';
  price = (price / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });




  useEffect(() => {
    axios
      .get(`http://localhost:3005/detail/${id}`)

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
      <div className={styles.boxTitle}>
        <h3>{title}</h3>
      </div>
      <div className={styles.img}>
        <img src={Images} />
        {Images &&
          Images.map((image) => <img key={id} src={image} alt="" />)}
      </div>
      <div className={styles.Box}>

        <div className={styles.boxDescription}>
          <h3>description: {description}</h3>
        </div>
        <div className={styles.boxMark}>
          <h3>mark: {brand}</h3>
        </div>
        <div className={styles.boxPrice}>
          <h3>price: {price}</h3>
        </div>
        <div>
          <h3>Colors: {Colors?.join(", ")}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
