import styles from './CardTeam2.module.css';
import banner1 from '../../../Images/banner.jpeg';
import banner2 from '../../../Images/bannerDark.jpeg';
import banner3 from '../../../Images/bannerAboutUs.png';

function CardTeam2({ name, image, banner, description, linkedin, github }) {
    return (
        <div className={styles.mainView}>
            <div className={styles.bannerContainer}>
                <img src={banner3} alt="" />
            </div>
            <div className={styles.subMainView}>
                <div className={styles.imgContainer}>
                    <img src={image} alt="" />
                </div>
                <p className={styles.name}>{name}</p>
                <p className={styles.description}>{description}</p>
                <div className={styles.links}>
                    <a href={linkedin} target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a>
                    <a href={github} target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                </div>
            </div>
        </div>
    );
}

export default CardTeam2;