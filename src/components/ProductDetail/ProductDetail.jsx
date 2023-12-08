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
      <div className={styles.img}>
        <img src={data.Image} />
      </div>
      <div className={styles.titleBox}>
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
        <h3>size: {data.size}</h3>
      </div>
    </div>
  );
};

export default ProductDetail;
