import styles from './CarouselComponent.module.css';
import image1 from "../../Images/camiseta-seleccion-argentina-adidas.webp";
import image2 from "../../Images/1366_2000.jpeg";
import image3 from "../../Images/121296-960w.webp";
import image4 from "../../Images/BOCA-RIVER-CAMISETAS-ADIDAS02.jpg";
import image5 from "../../Images/river202.webp";
import { useState } from 'react';


function CarouselComponent(props) {
    const text = props.text?.length ? props.text : ['', ''];
    const [imgHover, setImgHover] = useState(false);

    function handleMouseEnter() {
        setImgHover(true);
    }

    function handleMouseLeave() {
        setImgHover(false);
    }

    return (
        <div className={styles.mainView} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                    <div>
                        <img src={image4} alt="" />
                    </div>
                    <div>
                        <img src={image5} alt="" />
                    </div>
                </div>
            </div>
            <div className={styles.discounts}>
                {props.text.length > 1 ?
                    <div>
                        <p className={styles.frase}>{text[0]}</p>
                        <p className={styles.fraseSeparador}>|</p>
                        <p className={styles.frase}>{text[1]}</p>
                    </div> :
                    <p className={styles.frase}>{text[0]}</p>
                }
            </div>
            <div className={imgHover ? styles.leftArrow : styles.hiddenArrow}>
                ←
            </div>
            <div className={imgHover ? styles.rightArrow : styles.hiddenArrow}>
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