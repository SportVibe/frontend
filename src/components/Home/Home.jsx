import styles from "./Home.module.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
/* import CardComponent from "../Card/Card"; */
import Carousel from "../../components/Carousel/Carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBar from "../FilterBar/FilterBar";

function Home() {
  const [productArray, setProductArray] = useState(null);
  const holi = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 4, 5, 4, 5, 4, 5, 4, 5, 4];

  useEffect(() => {
    axios('https://api.escuelajs.co/api/v1/products').then(({data}) => {
      setProductArray(data)
    })
  }, []);
  return (
    <div className={styles.mainView}>
      <div className={styles.FilterBarContainer}>
        <FilterBar />
      </div>
      <div className={styles.conteinerHome}>
        <h2 className={styles.title}>Productos Recomendados</h2>
        <Carousel />
        <div className={styles.conteinerCards}>
          {/* {holi.map(number => {
            return (
              <div key={number} className={styles.cardComponentContainer}>
                <CardComponent />
              </div>
            )
          })} */}
          {productArray?.length > 0 && productArray.map((product, i) => {
            return (
              <div key={i} className={styles.cardComponentContainer}>
                <ProductCard productData={product} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
