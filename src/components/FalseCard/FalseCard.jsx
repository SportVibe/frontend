import styles from '../FalseCard/FalseCard.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import logoImage from '../../Images/Logo.jpg';

function FalseCard() {
    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.imgContainer}>
                    <img src={logoImage} alt="" />
                    <div className={styles.layout}>
                    </div>
                </div>
                <div className={styles.downSideContainer}>
                    <div className={styles.titleContainer}>
                        <p>title</p>
                    </div>
                    <div className={styles.categoryNameContainer}>
                        <p>categoryName</p>
                    </div>
                    <div className={styles.priceContainer}>
                        <p>$ priceFormat</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FalseCard;