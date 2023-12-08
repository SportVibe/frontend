import styles from './CategoryBar.module.css';
import { useState } from 'react';

function CategoryBar() {
    const [imgHover, setImgHover] = useState(false);
    const categories = [
        'Category',
        'Category',
        'Category',
        'Category',
        'Category',
    ]


    function handleMouseEnter() {
        setImgHover(true);
    }

    function handleMouseLeave() {
        setImgHover(false);
    }

    return (
        <div className={styles.mainView}>
            <div className={styles.subMainView}>
                <div className={styles.categoryContainer}>
                    {categories.map((cat, i) => {
                        return <p className={styles.p} key={i}>{cat}</p>
                    })}
                    <div className={styles.masFiltrosContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <p>Mas filtros</p>
                        <i className="fa-solid fa-caret-down"></i>
                    </div>
                </div>
            </div>
            <div className={imgHover ? styles.dropDown : styles.dropDownHidden}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <p>tukis</p>
                <p>tukis</p>
                <p>tukis</p>
                <p>tukis</p>
                <p>tukis</p>
            </div>
        </div>
    );
}

export default CategoryBar;