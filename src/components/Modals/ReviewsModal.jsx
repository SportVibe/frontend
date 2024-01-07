import styles from './ReviewsModal.module.css';
import ButtonComponent from '../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';
import logo from '../../Images/logoSportvibeSolid.jpeg'
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import Loading from '../loading/Loading';
import { useNavigate } from 'react-router-dom';
import Reviews from '../Reviews/Reviews';


function LoginModal({ setModal, modal, userId, productId }) {

    function handleCloseModal(e) {
        const id = e.target.id;
        if (id === 'outSideModal') {
            setModal(null)
        }
    }

    return (
        <div id='outSideModal' className={styles.mainView} onClick={handleCloseModal}>
            <div className={styles.reviewsContainer}>
                <Reviews userId={userId} productId={productId} setModal={setModal} />
            </div>
        </div>
    )
}

export default LoginModal;