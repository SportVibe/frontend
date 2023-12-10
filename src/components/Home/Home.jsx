import styles from "./Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterBar from "../FilterBar/FilterBar";
import CategoryBar from "../FilterBar/CategoryBar/CategoryBar";
import { CarouselComponent } from "../../helpers/indexComponents";
import { useSelector } from "react-redux";

function Home() {
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
          <div className={styles.carouselHomeContainer}>
            <CarouselComponent text={['Productos Recomendados']} />
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
