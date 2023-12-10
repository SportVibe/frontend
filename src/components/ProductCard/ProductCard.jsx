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
  const discount = productData?.discount ? productData.discount : "";
  const gender = productData?.gender ? productData.gender : "";
  const mark = productData?.mark ? productData.mark : "";
  const subCategory = productData?.subCategory ? productData.subCategory : "";
  const title = productData?.title ? productData.title : "";
  let price = productData?.price ? productData.price : "";
  price = (price / 1).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
          <img src={Images[0]} alt="" />
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
            <p>{category}</p>
          </div>
          <div className={styles.titleContainer}>
            <p>{title}</p>
          </div>
          <div className={styles.priceContainer}>
            <p>$USD {price}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
