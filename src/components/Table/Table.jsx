import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import ButtonComponent from '../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';
import ReviewsModal from '../Modals/ReviewsModal';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import Loading from '../loading/Loading';

function Table(props) {
    const [modal, setModal] = useState(false);
    const [productId, setProductId] = useState(null);
    const [userId, setUserId] = useState(props.userId);
    const [breakPoint, setBreakPoint] = useState(false);
    const [loading, setLoading] = useState(true);

    const [porpsRecords, setPorpsRecords] = useState(props.records || [
        {
            Producto: 'pala de padelpalapapapapappa de padelpala de padelpala de padel ',
            Cantidad: 3,
            'Precio unitario': 5.10,
            'Precio total': 15.30,
            id: 5,
        },
        {
            Producto: 'pala de padel',
            Cantidad: 1,
            'Precio unitario': 5.10,
            'Precio total': 5.10,
            id: 15,
        },
        {
            Producto: 'pala de padel',
            Cantidad: 5,
            'Precio unitario': 5.10,
            'Precio total': 25.50,
            id: 10,
        },
        {
            Producto: 'pala de padel',
            Cantidad: 1,
            'Precio unitario': 8,
            'Precio total': 8,
            id: 35,
        },
        {
            Producto: 'pala de padel',
            Cantidad: 1,
            'Precio unitario': 8,
            'Precio total': 8,
            id: 85,
        }
    ]);
    const [recordArray, setRecordArray] = useState([
        'Producto',
        'Cantidad',
        'Precio unitario',
        'Precio total',
        'Calificar'
    ]);

    function handleResize() {
        if (window.innerWidth < 600) {
            setRecordArray([
                'Producto',
                'Cantidad',
                'Precio total',
                'Comentario'
            ])
            setBreakPoint(true);
        }
        else {
            setRecordArray([
                'Producto',
                'Cantidad',
                'Precio unitario',
                'Precio total',
                'Comentario'
            ])
            setBreakPoint(false);
        }
    }

    function HandleDisplayModal(e) {
        const productId = parseInt(e.target.id);
        if (productId) {
            setModal(true);
            setProductId(productId);
        }
    }

    async function getReview(porpsRecords) {
        setLoading(true);
        try {
            const myProductReviews = await Promise.all(porpsRecords.map(async (product) => {
                try {
                    const { data } = await axios(`${API_URL}/reviews?productId=${product.id}&userId=${userId}`);
                    if (data) {
                        return { ...product, reviewData: data.data };
                    } else {
                        return product;
                    }
                } catch (error) {
                    console.error({ error: error.message });
                    return product;
                }
            }));
            setPorpsRecords(myProductReviews);
            console.log(myProductReviews);
        } catch (error) {
            console.error({ error: error.message });
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getReview(porpsRecords);
    }, []);

    useEffect(() => {
        // Agrega un event listener para el evento de redimensionamiento de la ventana
        /* window.addEventListener('resize', handleResize);
        handleResize() */

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            /* window.removeEventListener('resize', handleResize); */
        };
    }, []);

    return (
        <div className={styles.mainView}>
            {modal &&
                <ReviewsModal setModal={setModal} modal={modal} userId={userId} productId={productId} />
            }
            {loading ? <Loading /> :
                <div className={styles.tableContainer}>
                    <div className={styles.paramsContainer}>
                        <p className={styles.counterParam}>#</p>
                        {recordArray?.map((param, i) => {
                            return <p className={styles.param} key={i}>{param}</p>
                        })}
                    </div>
                    <div className={styles.recordsContainer}>
                        {porpsRecords?.map((record, i) => {
                            return (
                                <div className={styles.records} key={i}>
                                    <p className={styles.counterValue}>{record.id}</p>
                                    {[0, 1, 2, 3]?.map((param, i) => {
                                        let recordValue = Object.values(record)[i];
                                        return <p className={styles.value} id={styles.p} key={i}>{recordValue}</p>
                                    })}
                                    <div id={record.id} className={styles.buttonReviews} onClick={HandleDisplayModal}>
                                        {record.reviewData ?
                                            <p className={styles.coment} id={record.id}>Editar</p>
                                            :
                                            <button id={record.id}>Nuevo</button>
                                        }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    );
}

export default Table;