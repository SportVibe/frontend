import styles from './Footer.module.css';
import logoSportVibe from '../../Images/Logo.jpg';

function Footer() {
    return (
        <div className={styles.mainView}>
            <div className={styles.logoContainer}>
            <img src={logoSportVibe} alt="" />
            </div>
            <p>2023</p>
        </div>
    );
}

export default Footer;