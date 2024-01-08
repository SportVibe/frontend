import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../helpers/config';
import Loading from '../loading/Loading';
import styles from './Reviews.module.css';

const Reviews = ({ productId, userId, setModal }) => {
    const [inputsUsed, setInputUsed] = useState(false);
    const [stars, setStars] = useState([]);
    const [score, setScore] = useState(0);
    const [reviewId, setReviewId] = useState(null);
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [reviewExists, setReviewExists] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const handleSubmitReview = async () => {
        try {
            if (reviewExists) {
                if (score && description.trim().length && inputsUsed) {
                    const { data } = await axios.put(`${API_URL}/reviews`, {
                        id: reviewId,
                        description,
                        status: 'pending',
                        score
                    });
                    if (data) {
                        setModal(false);
                        alert('Calificación actualizada');
                    }
                }
                else {
                    alert('Modifique alguno de los campos')
                }
            }
            else {
                if (score && description.trim().length && inputsUsed) {
                    const { data } = await axios.post(`${API_URL}/reviews`, {
                        UserId: userId ? userId : null,
                        ProductId: productId ? productId : null,
                        score,
                        description,
                        status: 'pending',
                    });
                    if (data) {
                        setModal(false);
                        alert('Calificación enviada');
                    }
                }
                else {
                    alert('Debe completar todos los campos')
                }
            }
        } catch (error) {
            console.error('Error al enviar la reseña:', error.message);
            setError('Error al enviar la reseña. Por favor, intenta nuevamente.');
            alert('El usuario ya comentó este producto');
        }
    };

    const handleStarOn = (e) => {
        let starId = e.target.id;
        starId = starId.split(',');
        setStars(starId);
    }

    const handleStarOff = () => {
        setStars([]);
    }

    const keepStar = (e) => {
        let starId = e.target.id;
        starId = starId.split(',');
        setStars(starId);
    }

    const handleScore = (e) => {
        const value = e.target.id;
        setScore(value[value.length - 1]);
        setInputUsed(true);
    }

    async function getReview(userId, productId) {
        try {
            setLoading(true);
            const { data } = await axios(`${API_URL}/reviews?productId=${productId}&userId=${userId}`);
            if (data) {
                setScore(data.data[0].score);
                setDescription(data.data[0].description);
                setStatus(data.data[0].status);
                setReviewExists(true);
                setReviewId(data.data[0].id);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error({ error: error.message });
        }
    }

    useEffect(() => {
        getReview(userId, productId);
    }, []);

    if (loading) {
        return (
            <div className={styles.reviewsContainer}>
                <Loading />
            </div>
        )
    }
    else {
        return (
            <div className={styles.reviewsContainer}>
                <i onClick={() => setModal(false)} id={styles.closeIcon} className="fa-solid fa-circle-xmark"></i>
                <h2>Deja tu Reseña</h2>
                <p className={styles.productCode}>Código del producto: {productId}</p>
                <div className={styles.Pruntuacion}>
                    <p className={styles.Pruntuacion}>Puntuación:</p>
                    <div className={styles.starsContainer}>
                        {(stars.includes('1') || score > '0' || score === '1') ? <i id='1' onClick={handleScore} onMouseOver={keepStar} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1' onMouseOver={handleStarOn} className="fa-regular fa-star"></i>}
                        {(stars.includes('2') || score > '1' || score === '2') ? <i id='1,2' onClick={handleScore} onMouseOver={keepStar} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2' onMouseOver={handleStarOn} className="fa-regular fa-star"></i>}
                        {(stars.includes('3') || score > '2' || score === '3') ? <i id='1,2,3' onClick={handleScore} onMouseOver={keepStar} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2,3' onMouseOver={handleStarOn} className="fa-regular fa-star"></i>}
                        {(stars.includes('4') || score > '3' || score === '4') ? <i id='1,2,3,4' onClick={handleScore} onMouseOver={keepStar} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2,3,4' onMouseOver={handleStarOn} className="fa-regular fa-star"></i>}
                        {(stars.includes('5') || score > '4' || score === '5') ? <i id='1,2,3,4,5' onClick={handleScore} onMouseOver={keepStar} onMouseLeave={handleStarOff} className="fa-solid fa-star"></i> : <i id='1,2,3,4,5' onMouseOver={handleStarOn} className="fa-regular fa-star"></i>}
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <label>Comentario:</label>
                    <textarea
                        placeholder='Deja aquí tu comentario sobre el producto...'
                        value={description}
                        onChange={(e) => { setDescription(e.target.value); setInputUsed(true); }}
                    />
                    {(status && reviewExists) && <p>Comentario en revisión</p>}
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button onClick={handleSubmitReview} className={(score && description.trim().length && inputsUsed) ? styles.submitButton : styles.submitButtonOff}>
                    {reviewExists ? 'Guardar cambios' : 'Enviar Reseña'}
                </button>
            </div>
        );
    }
}


export default Reviews;