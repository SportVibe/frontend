import styles from './CarouselCard.module.css';
import { useNavigate } from "react-router-dom";

function CarouselCard({ productData }) {
    const navigate = useNavigate();
    const id = productData?.id ? productData.id : "";
    const Images = productData?.Images.length ? productData.Images : [''];
    const title = productData?.title ? productData.title : '';
    let price = productData?.price ? productData.price : '';
    price = (price / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    function handleNavigate() {
        navigate(`/detail/${id}`);
    }

    return (
        <div onClick={handleNavigate} className={styles.imgContainer}>
            <div className={styles.img}>
                <img src={Images[0]}  alt=""/>
            </div>
            <p className={styles.nameAfter}>{title}</p>
            <p className={styles.priceAfter}>$USD {price}</p>
        </div>
    );
}

export default CarouselCard;