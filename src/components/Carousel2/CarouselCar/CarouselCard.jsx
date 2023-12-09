import styles from './CarouselCard.module.css';

function CarouselCard({ productData }) {
    const Images = productData?.Images.length ? productData.Images : [''];
    const title = productData?.title ? productData.title : '';
    let price = productData?.price ? productData.price : '';
    price = (price / 1).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div className={styles.imgContainer}>
            <div className={styles.img}>
                <img src={Images[0]} alt="" />
            </div>
            <p className={styles.nameAfter}>{title}</p>
            <p className={styles.priceAfter}>$USD {price}</p>
        </div>
    );
}

export default CarouselCard;