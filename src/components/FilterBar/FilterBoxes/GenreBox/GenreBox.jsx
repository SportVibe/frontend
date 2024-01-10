import styles from './GenreBox.module.css';

function GenreBox({ genreHandler, genre }) {

    return (
        <div className={styles.mainView}>
            <p className={styles.title}>Géneros</p>
            <div className={styles.genreBox}>
                <p id='' onClick={genreHandler} className={genre[0].gender === '' ? styles.selected : ''}>Todo</p>
                <p id='HOMBRE' onClick={genreHandler} className={genre[0].gender === 'HOMBRE' ? styles.selected : ''}>Hombre</p>
                <p id='MUJER' onClick={genreHandler} className={genre[0].gender === 'MUJER' ? styles.selected : ''}>Mujer</p>
            </div>
        </div>
    );
}

export default GenreBox;