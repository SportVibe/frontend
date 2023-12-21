import { useEffect, useState } from 'react';
import styles from './Table.module.css';

function Table(props) {
    const porpsRecords = props.records || [{
        Producto: 'pala de padelpala de padelpala de padelpala de padel',
        Cantidad: 3,
        'Precio unitario': 5.10,
        'Precio total': 15.30
    },
    {
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
                                <p className={styles.counterValue}>{i + 1}</p>
                                {recordArray?.map((param, i) => {
                                    let recordValue = Object.values(record)[i];
                                    return <p className={styles.value} id={styles.p} key={i}>{recordValue}</p>
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Table;