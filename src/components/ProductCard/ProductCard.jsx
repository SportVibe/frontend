import styles from './ProductCard.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';

function ProductCard({ productData }) {
    const [imgHover, setImgHover] = useState(false);
    const { id, title, price, description, category, images } = productData;
    const categoryName = category.name;
    let priceFormat = (price / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    function handleMouseEnter() {
        setImgHover(true);
    }

    function handleMouseLeave() {
        setImgHover(false);
    }

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.imgContainer} id={imgHover && styles.imgHover} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={images[0]} alt="" />
                    {imgHover &&
                        <div className={styles.layout}>
                            <div>
                                <i className="fa-regular fa-heart"></i>
                            </div>
                        </div>}
                </div>
                <div className={styles.downSideContainer}>
                    <div className={styles.categoryNameContainer}>
                        <p>{categoryName}</p>
                    </div>
                    <div className={styles.titleContainer}>
                        <p>{title}</p>
                    </div>
                    <div className={styles.priceContainer}>
                        <p>$ {priceFormat}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;