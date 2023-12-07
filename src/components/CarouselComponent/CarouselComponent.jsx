import styles from './CarouselComponent.module.css';
/* import Carousel from 'react-bootstrap/Carousel'; */
import image1 from "../../Images/camiseta-seleccion-argentina-adidas.webp";
import image2 from "../../Images/1366_2000.jpeg";
import image3 from "../../Images/121296-960w.webp";

function CarouselComponent() {
    return (
        <div className={styles.mainView}>
            <div className={styles.discounts}>
                <p className={styles.frase}>Descuentos de hasta 50%</p>
                <p className={styles.fraseSeparador}>|</p>
                <p className={styles.frase}>No te pierdas estas ofertas!</p>
            </div>
            {/* <Carousel>
                <Carousel.Item>
                    <div className={styles.imgBox}>
                        <img src={image1} alt="" />
                    </div>
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={styles.imgBox}>
                        <img src={image2} alt="" />
                    </div>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={styles.imgBox}>
                        <img src={image3} alt="" />
                    </div>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
            <div className={styles.leftArrow}>
                ←
            </div>
            <div className={styles.carouselBox}>
                <div className={styles.divImages}>
                    <div>
                        <img src={image1} alt="" />
                    </div>
                    <div>
                        <img src={image2} alt="" />
                    </div>
                    <div>
                        <img src={image3} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.rightArrow}>
                →
            </div>
            <div className={styles.miniPagination}>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
                <button></button>
            </div>
        </div>
    );
}

export default CarouselComponent;