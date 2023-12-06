import styles from "./Home.module.css";
import CardComponent from "../Card/Card";
// import Carousel from "../Carousel/Carousel";

function Home() {
  return (
    <div className={styles.conteinerHome}>
      <h1 className={styles.title}>Productos Recomendados</h1>
      <div className={styles.conteinerCards}>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </div>
    </div>
  );
}

export default Home;
