import styles from './ReviewsModal.module.css';
import Reviews from '../Reviews/Reviews';


function LoginModal({ setModal, modal, userId, productId, reloadPage, setReloadPage }) {

    function handleCloseModal(e) {
        const id = e.target.id;
        if (id === 'outSideModal') {
            setModal(null)
        }
    }

    return (
        <div id='outSideModal' className={styles.mainView} onClick={handleCloseModal}>
            <div className={styles.reviewsContainer}>
                <Reviews userId={userId} productId={productId} setModal={setModal} setReloadPage={setReloadPage} reloadPage={reloadPage} />
            </div>
        </div>
    )
}

export default LoginModal;