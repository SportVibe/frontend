import styles from './CarouselCard.module.css';
import { useNavigate } from "react-router-dom";

function CarouselCard({ productData }) {
    const navigate = useNavigate();
    const id = productData?.id ? productData.id : "";
    const discount = productData?.discount ? productData.discount : "";
    const Images = productData?.Images.length ? productData.Images : [''];
    const title = productData?.title ? productData.title : '';
    let price = productData?.price ? Number(productData.price) : '';
    price = (price / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    let newPrice = discount ? (price * (100 - Number(discount)) / 100) : '';
    newPrice = (newPrice / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
            {newPrice && <p className={styles.newPriceAfter}><span> $USD {newPrice}</span></p>}
            <p className={styles.priceAfter}><span> $USD {price}</span> </p>
        </div>
    );
}

export default CarouselCard;