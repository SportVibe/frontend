import styles from "./Carousel.module.css";
import image1 from "../../Images/camiseta-seleccion-argentina-adidas.webp";
import image2 from "../../Images/1366_2000.jpeg";
import image3 from "../../Images/121296-960w.webp";
import image4 from "../../Images/qué-usar-cuando-haces-running-en-diferentes-temperaturas.jpg";
import image5 from "../../Images/BOCA-RIVER-CAMISETAS-ADIDAS02.jpg";
import image6 from "../../Images/river202.webp";

function Carousel() {
  return (
    <div className={styles.conteinerCar}>
      <div
        id="carouselExample"
        className="carousel slide"
        style={{ width: "100%" }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active text-center">
            <img
              src={image1}
              className="mx-auto d-block w-50 rounded "
              alt=""
            />
          </div>
          <div className="carousel-item text-center">
            <img
              src={image2}
              className="mx-auto d-block w-50  rounded "
              alt="..."
            />
          </div>
          <div className="carousel-item text-center">
            <img
              src={image3}
              className="mx-auto d-block w-50 rounded "
              alt="..."
            />
          </div>
          <div className="carousel-item text-center">
            <img
              src={image4}
              className="mx-auto d-block w-50 rounded  "
              alt="..."
            />
          </div>
          <div className="carousel-item text-center">
            <img
              src={image5}
              className="mx-auto d-block w-50 rounded "
              alt="..."
            />
          </div>
          <div className="carousel-item text-center">
            <img
              src={image6}
              className="mx-auto d-block w-50 rounded "
              alt="..."
            />
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
