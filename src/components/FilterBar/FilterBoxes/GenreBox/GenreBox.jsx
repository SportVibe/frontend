import styles from './GenreBox.module.css';

function GenreBox() {
    return (
        <div className={styles.mainView}>
            <p>Genre</p>
            <div className={styles.genreBox}>
                <div className={styles.button}>
                    <button>Hombre</button>
                </div>
                <div className={styles.button}>
                    <button>Mujer</button>
                </div>
                <div className={styles.button}>
                    <button>Unisex</button>
                </div>
            </div>
        </div>
    );
}

export default GenreBox;