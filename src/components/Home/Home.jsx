import styles from "./Home.module.css";
import Carousel from "../../components/Carousel/Carousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import FalseCard from "../../components/FalseCard/FalseCard";
import FilterBar from "../FilterBar/FilterBar";
import CategoryBar from "../FilterBar/CategoryBar/CategoryBar";
import { CarouselComponent } from "../../helpers/indexComponents";
import { useSelector } from "react-redux";

function Home() {
  const falseCards = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 4, 5, 4, 5, 4, 5, 4, 5, 4];
  const productRender = useSelector((state) => state.products);

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
          {/* <h2 className={styles.title}>Productos Recomendados</h2> */}
          <div className={styles.carouselHomeContainer}>
            <CarouselComponent text={['Productos Recomendados']} />
            {/* <Carousel /> */}
          </div>
          <div className={styles.resultsContainer}>
            <p>Resultados: {productRender?.totalCount}</p>
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
        </div>
      </div>
    </div>
  );
}

export default Home;
