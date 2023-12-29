import styles from "./ProductCard.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const brand = productData?.brand ? productData.brand : "";
    const subCategory = productData?.subCategory ? productData.subCategory : "";
    const title = productData?.title ? productData.title : "";
    let price = productData?.price ? Number(productData.price) : '';
    price = (price / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let newPrice = discount ? (price * (100 - Number(discount)) / 100) : '';
    newPrice = (newPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
                    </div>
                    <div className={styles.titleContainer}>
                        <p>{title}</p>
                    </div>
                    <div className={styles.priceContainer}>
                        {!discount ?
                            <p>$USD {price}</p> :
                            <div>
                                <p className={styles.newPrice}>$USD {newPrice}</p>
                                <div className={styles.discountContainer}>
                                    <p className={styles.discount}><span>-{discount}%</span></p>
                                    <p className={styles.oldPrice}>Antes: <span>$USD {price}</span></p>
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
