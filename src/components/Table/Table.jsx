import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import ButtonComponent from '../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';
import ReviewsModal from '../Modals/ReviewsModal';
import { API_URL } from '../../helpers/config';
import axios from 'axios';
import Loading from '../loading/Loading';

function Table(props) {
    const [reloadPage, setReloadPage] = useState(false);
    const [modal, setModal] = useState(false);
    const [productId, setProductId] = useState(null);
    const [userId, setUserId] = useState(props.userId || '');
    const [breakPoint, setBreakPoint] = useState(false);
    const [loading, setLoading] = useState(true);
    const [displayTable, setDisplayTable] = useState(false);
    const [porpsRecords, setPorpsRecords] = useState(props.records || {
        purchases: [
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
                id: 65,
            }
        ],
        id: '1ad23',
        totalPaid: 61.9,
        date: '2024-01-08',
        time: '15:45:33'
    });
    const [recordArray, setRecordArray] = useState([
        'Producto',
        'Cantidad',
        'Precio unitario',
        'Precio total',
        'Calificar'
    ]);

    function handleDisplayTable() {
        setDisplayTable(!displayTable);
    }

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
        if (productId && porpsRecords.status !== 'cancelled') {
            setModal(true);
            setProductId(productId);
        }
    }

    async function getReview(porpsRecords) {
        setLoading(true);
        try {
            const myProductReviews = await Promise.all(porpsRecords?.userProducts.map(async (product) => {
                try {
                    const { data } = await axios(`${API_URL}/reviews?productId=${product.productId}&userId=${userId}`);
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
            setPorpsRecords({ ...porpsRecords, userProducts: myProductReviews });
        } catch (error) {
            console.error({ error: error.message });
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getReview(porpsRecords);
    }, [reloadPage]);

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
        <div className={`${styles.mainView} ${porpsRecords.status === 'cancelled' && styles.cancelled}`}>
            <p className={styles.codigoOrden}>Código de la compra: {porpsRecords.orderIdPaypal}</p>
            {porpsRecords.status === 'cancelled' && <p className={styles.codigoOrden}>Orden cancelada</p>}
            {porpsRecords.status === 'accepted' && <p className={styles.codigoOrden}>Orden aceptada ✓</p>}
            {modal &&
                <ReviewsModal setModal={setModal} modal={modal} userId={userId} productId={productId} reloadPage={reloadPage} setReloadPage={setReloadPage} />
            }
            {loading ? <Loading /> :
                <div className={`${styles.tableContainer} ${!displayTable ? styles.displayTableOff : styles.displayTableOn}`}>
                    <div className={styles.orderContainer} onClick={handleDisplayTable}>
                        <p onClick={handleDisplayTable}>Fecha de compra: </p>
                        <p onClick={handleDisplayTable}>Hora: </p>
                        <p onClick={handleDisplayTable}>Total: ${porpsRecords.totalOrder}</p>
                    </div>
                    <div className={styles.paramsContainer}>
                        <p className={styles.counterParam}>#</p>
                        {recordArray?.map((param, i) => {
                            return <p className={styles.param} key={i}>{param}</p>
                        })}
                    </div>
                    <div className={styles.recordsContainer}>
                        {porpsRecords?.userProducts.map((record, i) => {
                            return (
                                <div className={styles.records} key={i}>
                                    <p className={styles.counterValue}>{record.productId}</p>
                                    <p className={styles.value} id={styles.p} key={i}>{record.title}</p>
                                    <p className={styles.value} id={styles.p} key={i}>{record.quantity}</p>
                                    <p className={styles.value} id={styles.p} key={i}>{record.price}</p>
                                    <p className={styles.value} id={styles.p} key={i}>{record.subtotal}</p>
                                    <div id={record.productId} className={styles.buttonReviews} onClick={HandleDisplayModal}>
                                        {record.reviewData ?
                                            <p className={porpsRecords.status === 'cancelled' ? styles.buttonCancelled : styles.coment} id={record.productId}>Editar</p>
                                            :
                                            <button id={record.productId} className={porpsRecords.status === 'cancelled' ? styles.buttonCancelled : styles.button}>Nuevo</button>
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