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
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>
            <div id={styles.imagesBigContainer} class="carousel-inner">
                <div id={styles.imgContainer} class="carousel-item active">
                    <img src={image1} alt="..." />
                    {/* <div id={styles.textBelow} class="carousel-caption d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
                <div id={styles.imgContainer} class="carousel-item">
                    <img src={image2} alt="..." />
                    {/* <div id={styles.textBelow} class="carousel-caption d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
                <div id={styles.imgContainer} class="carousel-item">
                    <img src={image3} alt="..." />
                    {/* <div id={styles.textBelow} class="carousel-caption d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
                <div id={styles.imgContainer} class="carousel-item">
                    <img src={image4} alt="..." />
                    {/* <div id={styles.textBelow} class="carousel-caption d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
                <div id={styles.imgContainer} class="carousel-item">
                    <img src={image5} alt="..." />
                    {/* <div id={styles.textBelow} class="carousel-caption d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div> */}
                </div>
            </div>
            <div className={styles.discounts}>
                {props.text?.length > 1 ?
                    <div>
                        <p className={styles.frase}>{text[0]}</p>
                        <p className={styles.fraseSeparador}>|</p>
                        <p className={styles.frase}>{text[1]}</p>
                    </div> :
                    <p className={styles.frase}>{text[0]}</p>
                }
            </div>
            <button id={imgHover ? styles.leftArrow : styles.hiddenArrow} class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <i class="bi bi-chevron-left"></i>
            </button>
            <button id={imgHover ? styles.rightArrow : styles.hiddenArrow} class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <i class="bi bi-chevron-right"></i>
            </button>
        </div>
    );
}

export default CarouselComponent;