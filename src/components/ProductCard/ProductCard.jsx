import styles from "./ProductCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import capitalize from '../../utils/capitalize.js';

function ProductCard({ productData }) {
    const navigate = useNavigate();
    const [imgHover, setImgHover] = useState(false);
    const id = productData?.id ? productData.id : "";
    const Colors = productData?.Colors.length ? productData.Colors : [""];
    const Images = productData?.Images.length ? productData.Images : [""];
    const Stocks = productData?.Stocks.length ? productData.Stocks : [""];
    const available = productData?.available ? productData.available : "";
    const category = productData?.category ? productData.category : "";
    const description = productData?.description ? productData.description : "";
    const discount = productData?.discount > 0 ? productData.discount : "";
    const gender = productData?.gender ? productData.gender : "";
    const brand = productData?.brand ? capitalize(productData.brand) : "";
    const subCategory = productData?.subCategory ? productData.subCategory : "";
    const title = productData?.title ? capitalize(productData.title) : "";
    let currentPrice = productData?.price ? Number(productData.price) : '';
    let oldPrice = (discount && Number(discount) > 0) ? currentPrice * 100 / (100 - discount) : '';
    currentPrice = (currentPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    oldPrice = (oldPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const countReviews = productData?.countReviews ? productData?.countReviews : 0;
    let avgScore = productData?.averageScore ? productData?.averageScore : 0;
    avgScore = parseFloat(avgScore.toFixed(1));

    function handleMouseEnter() {
        setImgHover(true);
    }

    function handleMouseLeave() {
        setImgHover(false);
    }

    function handleNavigate() {
        navigate(`/detail/${id}`);
    }

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <p className={`${styles.newProduct} ${(id && parseInt(id) >= 30) ? '' : styles.hiddenText}`}>Nuevo</p>
                <div
                    onClick={handleNavigate}
                    className={styles.imgContainer}
                    id={imgHover && styles.imgHover}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src={Images[0]} alt="imagen" />
                    {imgHover && (
                        <div className={styles.layout}>
                            <div>
                                <i className="fa-regular fa-heart"></i>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.downSideContainer}>
                    <div className={styles.categoryNameContainer}>
                        <p className={styles.category}>{category}</p>
                        <div className={styles.starContainer}>
                            <p>{avgScore}</p>
                            {(avgScore > 0 && avgScore < 1) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 1 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 1 && avgScore < 2) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 2 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 2 && avgScore < 3) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 3 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 3 && avgScore < 4) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 4 && <i className="fa-solid fa-star"></i>}
                            {(avgScore > 4 && avgScore < 5) && <i className="fa-solid fa-star-half-stroke"></i>}
                            {avgScore >= 5 && <i className="fa-solid fa-star"></i>}

                            {(avgScore <= 4) && <i className="fa-regular fa-star"></i>}
                            {(avgScore <= 3) && <i className="fa-regular fa-star"></i>}
                            {(avgScore <= 2) && <i className="fa-regular fa-star"></i>}
                            {(avgScore <= 1) && <i className="fa-regular fa-star"></i>}
                            {(avgScore === 0) && <i className="fa-regular fa-star"></i>}
                            <p>{`(${countReviews})`}</p>
                        </div>
                    </div>
                    <div className={styles.titleContainer}>
                        <p>{title}</p>
                    </div>
                    <div className={styles.brandContainer}>
                        <p>{brand}</p>
                    </div>
                    <div className={styles.priceContainer}>
                        {!discount ?
                            <p>$USD {currentPrice}</p> :
                            <div>
                                <p className={styles.newPrice}>$USD {currentPrice}</p>
                                <div className={styles.discountContainer}>
                                    <p className={styles.discount}><span>-{discount}%</span></p>
                                    <p className={styles.oldPrice}>Antes: <span>$USD {oldPrice}</span></p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
