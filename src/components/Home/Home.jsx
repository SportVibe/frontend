import styles from "./Home.module.css";
import CardComponent from "../Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import FilterBar from "../FilterBar/FilterBar";

function Home() {
  const holi = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 4,5,4,5,4,5,4,5,4];

  return (
    <div className={styles.mainView}>
      <div className={styles.FilterBarContainer}>
        <FilterBar />
      </div>
      <div className={styles.conteinerHome}>
        <h1 className={styles.title}>Productos Recomendados</h1>
        <Carousel />
        <div className={styles.conteinerCards}>
          {holi.map(number => {
            return (
              <div key={number} className={styles.cardComponentContainer}>
                <CardComponent />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
