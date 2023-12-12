import styles from "./Home.module.css";
import { useEffect } from 'react';
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBar from "../FilterBar/FilterBar";
import CategoryBar from "../FilterBar/CategoryBar/CategoryBar";
import Paginado from "../Paginado/Paginado";

import { CarouselComponent } from "../../helpers/indexComponents";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProducts, searchActivity, responsiveNavBar } from "../../redux/actions";



function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productRender = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(searchActivity(''));
    dispatch(responsiveNavBar(false));
  }, []);

  return (
    <div className={styles.mainView}>
      <div className={styles.categoryBarContainer}>
        <CategoryBar />
      </div>
      <div className={styles.subMainView}>
        <div className={styles.FilterBarContainer}>
          <FilterBar />
        </div>
        <div className={styles.conteinerHome}>
          {location.pathname !== '/search' &&
            <div className={styles.carouselHomeContainer}>
              <CarouselComponent text={['Productos Recomendados']} />
            </div>
          }
          <div className={styles.paginado}>
            <Paginado />
          </div>
          <div className={styles.results}>
            <p>Resultados: {productRender?.totalFilteredCount}</p>
          </div>
          <div className={styles.conteinerCards}>
            {productRender.data?.length > 0 && productRender.data.map((product, i) => {
              return (
                <div key={i} className={styles.cardComponentContainer}>
                  <ProductCard productData={product} />
                </div>
              )
            })}
          </div>
          <div className={styles.paginado}>
            <Paginado />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;