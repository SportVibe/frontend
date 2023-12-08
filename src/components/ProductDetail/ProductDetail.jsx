import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useEffect, useState } from "react";
// import { allDetail } from "../../utils/endpoints";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(null);

  const [data, setData] = useState({});

  //   useEffect(() => {
  //     axios
  //       .get(allDetail)

  //       .then(({ data }) => {
  //         setData(data);
  //       })
  //       .catch((error) => {
  //         console.log("Error fetching product details:", error);
  //       });
  //   }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/detail/${id}`)

      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error fetching product details:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.conteinerDetail}>
      <h3> title: {data.title}</h3>
      <h3>description: {data.description}</h3>
      <h3>price: {data.price}</h3>
      <h3>discount: {data.discount}</h3>
      <h3>mark: {data.mark}</h3>
      <h3>gender: {data.gender}</h3>
      <h3>category: {data.category}</h3>
      <h3>subCategory: {data.subCategory}</h3>
      <h3>available: {data.available}</h3>
      <h3>createdAt: {data.createdAt}</h3>
      <h3>updateAt: {data.updateAt}</h3>

      <div>
        <h3>Stocks: {data.updateAt}</h3>
        {data.stocks &&
          data.stocks.map((stock, index) => (
            <div key={index}>
              <h3>Stock para Talle {stock.talle}</h3>
              <p>Cantidad: {stock.cantidad}</p>
            </div>
          ))}
      </div>
      <div>
        {data.Images &&
          data.Images.map((image, index) => (
            <img key={index} src={image} alt={`Imagen ${index}`} />
          ))}
      </div>
    </div>
  );
};

export default ProductDetail;
