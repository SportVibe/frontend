import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import styles from './Reviews.module.css';

const Reviews = ({ productId, userId, setModal }) => {
    const [score, setScore] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');

    const handleSubmitReview = async () => {
        try {
            if (score && description.length) {
                const { data }= await axios.post(`${API_URL}/reviews`, {
                    UserId: userId ? userId : null,
                    ProductId: productId ? productId : null,
                    score,
                    description,
                    status,
                });
                if(data){
                    setModal(false);
                }
            }


        } catch (error) {
            console.error('Error al enviar la reseña:', error.message);
            setError('Error al enviar la reseña. Por favor, intenta nuevamente.');
        }
    };
    console.log(description);
    return (
        <div className={styles.reviewsContainer}>
            <h2>Deja tu Reseña</h2>
            <div className={styles.ratingContainer}>
                <label>Puntuación:</label>
                <select onChange={(e) => setScore(parseInt(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div className={styles.descriptionContainer}>
                <label>Descripción:</label>
                <textarea
                    rows="4"
                    cols="50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={handleSubmitReview} className={styles.submitButton}>
                Enviar Reseña
            </button>
        </div>
    );


}


export default Reviews;