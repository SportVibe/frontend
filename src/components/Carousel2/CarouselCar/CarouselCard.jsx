import styles from './CarouselCard.module.css';
import { useNavigate } from "react-router-dom";

function CarouselCard({ productData }) {
    const navigate = useNavigate();
    const id = productData?.id ? productData.id : "";
    const discount = productData?.discount ? productData.discount : "";
    const Images = productData?.Images.length ? productData.Images : [''];
    const title = productData?.title ? productData.title : '';
    let currentPrice = productData?.price ? Number(productData.price) : '';
    let oldPrice = (discount && Number(discount) > 0) ? currentPrice * 100 / (100 - discount) : '';
    currentPrice = (currentPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    oldPrice = (oldPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    function handleNavigate() {
        navigate(`/detail/${id}`);
    }

    return (
        <div onClick={handleNavigate} className={styles.imgContainer}>
            <div className={styles.img}>
                <img src={Images[0].url}  alt=""/>
            </div>
            <p className={styles.nameAfter}>{title}</p>
            <p className={styles.discount}><span>-{discount}%</span></p>
            {currentPrice && <p className={styles.newPriceAfter}><span> $USD {currentPrice}</span></p>}
            <p className={styles.priceAfter}><span> $USD {oldPrice}</span> </p>
        </div>
    );
}

export default CarouselCard;