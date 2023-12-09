import styles from './Carousel2.module.css';
import logoImage from '../../Images/Logo.jpg';
import CarouselCard from './CarouselCar/CarouselCard';
import { useSelector } from "react-redux";

function Carousel2() {
    const count = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const productRender = useSelector((state) => state.mostSoldProducts);

    return (
        <div className={styles.mainView}>
            <div className={styles.mostSold}>
                Productos más vendidos
            </div>
            <div className={styles.backgroundMidle}>
            </div>
            <div className={styles.subMainView}>
                <ul className={styles.ul}>
                    {productRender.data?.length ? count.map((item, i) => {
                        return (
                            <div key={i} className={styles.imgContainer}>
                                <CarouselCard productData={productRender.data[i]}/>
                            </div>
                        )
                    }) :
                        count.map((item, i) => {
                            return (
                                <div key={i} className={styles.imgContainer}>
                                    <div className={styles.img}>
                                        <img src={logoImage} alt="" />
                                    </div>
                                    <p className={styles.nameAfter}>Mas vendido</p>
                                </div>
                            )
                        })}
                </ul>
            </div>
            {/* <div className={styles.layoutLeft}>
            </div>
            <div className={styles.layoutRight}>
            </div> */}
        </div>
    );
}

export default Carousel2;