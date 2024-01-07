import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import styles from './Reviews.module.css';

const Reviews = ({ productId, userId, setModal }) => {
    const [stars, setStars] = useState([]);
    const [score, setScore] = useState(0);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [error, setError] = useState('');

    const handleSubmitReview = async () => {
        try {
            if (score && description.length) {
                const { data } = await axios.post(`${API_URL}/reviews`, {
                    UserId: userId ? userId : null,
                    ProductId: productId ? productId : null,
                    score,
                    description,
                    status,
                });
                if (data) {
                    setModal(false);
                }
            }
            else {
                alert('Debe completar todos los campos')
            }
        } catch (error) {
            console.error('Error al enviar la reseña:', error.message);
            setError('Error al enviar la reseña. Por favor, intenta nuevamente.');
            alert('El usuario ya comentó este producto');
        }
    };

    const handleStar = (e) => {
        let starId = e.target.id;
        starId = starId.split(',');
        setStars(starId);
    }

    const handleStarOff = () => {
        setStars([]);
    }

    const handleScore = (e) => {
        const value = e.target.id;
        setScore(value);
    }

    return (
        <div className={styles.reviewsContainer}>
            <i onClick={() => setModal(false)} id={styles.closeIcon} className="fa-solid fa-circle-xmark"></i>
            <h2>Deja tu Reseña</h2>
            <p className={styles.productCode}>Código del producto: {productId}</p>
            <div className={styles.Pruntuacion}>
                <p className={styles.Pruntuacion}>Puntuación:</p>
                <div className={styles.starsContainer}>
                    {stars.includes('1') || score > '0' ? <i id='1' onClick={handleScore} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1' onMouseOver={handleStar} className="fa-regular fa-star"></i>}
                    {stars.includes('2') || score > '1' ? <i id='2' onClick={handleScore} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2' onMouseOver={handleStar} className="fa-regular fa-star"></i>}
                    {stars.includes('3') || score > '2' ? <i id='3' onClick={handleScore} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2,3' onMouseOver={handleStar} className="fa-regular fa-star"></i>}
                    {stars.includes('4') || score > '3' ? <i id='4' onClick={handleScore} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2,3,4' onMouseOver={handleStar} className="fa-regular fa-star"></i>}
                    {stars.includes('5') || score > '4' ? <i id='5' onClick={handleScore} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2,3,4,5' onMouseOver={handleStar} className="fa-regular fa-star"></i>}
                </div>
            </div>
            <div className={styles.descriptionContainer}>
                <label>Comentario:</label>
                <textarea
                    placeholder='Deja aquí tu comentario sobre el producto...'
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