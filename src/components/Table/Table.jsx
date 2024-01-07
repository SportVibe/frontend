import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import ButtonComponent from '../FilterBar/FilterBoxes/ButtonComponent/ButtonComponent';
import ReviewsModal from '../Modals/ReviewsModal';

function Table(props) {
    const [modal, setModal] = useState(true);
    const [productId, setProductId] = useState(1);
    const [userId, setUserId] = useState(props.userId);

    const porpsRecords = props.records || [{
        id:1,
        Producto: 'pala de padelpala de padelpala de padelpala de padel',
        Cantidad: 3,
        'Precio unitario': 5.10,
        'Precio total': 15.30
    },
    {
        id:2,
        Producto: 'pala de padel',
        Cantidad: 1,
        'Precio unitario': 5.10,
        'Precio total': 5.10
    }
    ];
    const [recordArray, setRecordArray] = useState([
        'Producto',
        'Cantidad',
        'Precio unitario',
        'Precio total'
    ]);

    function handleResize() {
        if (window.innerWidth < 700) {
            setRecordArray([
                'Producto',
                'Cantidad',
                'Precio total'
            ])
        }
        else {
            setRecordArray([
                'Producto',
                'Cantidad',
                'Precio unitario',
                'Precio total'
            ])
        }
    }

    function HandleDisplayModal(e){
        let productId = e.target.id;
        console.log(productId);
        // productId = parseInt(productId);
        if(productId){
            setModal(true);
            setProductId(productId);
        }
    }

    useEffect(() => {
        // Agrega un event listener para el evento de redimensionamiento de la ventana
        window.addEventListener('resize', handleResize);
        handleResize()

        // Limpia el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles.mainView}>
            {modal && 
            <ReviewsModal setModal={setModal} modal={modal} userId={userId} productId={productId}/>
            }
            <div className={styles.tableContainer}>
                <div className={styles.paramsContainer}>
                    <p className={styles.counterParam}>#</p>
                    {recordArray?.map((param, i) => {
                        return <p className={styles.param} key={i}>{param}</p>
                    })}
                     <p className={styles.counterParam}>Comentarios</p>
                </div>
                <div className={styles.recordsContainer}>
                    {porpsRecords?.map((record, i) => {
                        return (
                            <div className={styles.records} key={i}>
                                <p className={styles.counterValue}>{i + 1}</p>
                                {recordArray?.map((param, i) => {
                                    let recordValue = Object.values(record)[i];
                                    return <p className={styles.value} id={styles.p} key={i}>{recordValue}</p>
                                })}
                                <button id='tukis' className={styles.buttonReviews} onClick={HandleDisplayModal}>
                                    <ButtonComponent text="Entrar"/>
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Table;