import styles from './Table.module.css';

function Table(props) {
    const porpsRecords = props.records;
    const recordArray = (porpsRecords && porpsRecords.length && Object.keys(porpsRecords).length) ? props.records : [{first: 'text', second: 'textcbdhsjcbhjbjbjhbjhbjhbhjbhjbjhbhjbhjbhjbhjbhjbjhbj', third: 'text'}, {first: 'text', second: 'textcbdhsjcbhjbjbjhbjhbjhbhjbhjbjhbhjbhjbhjbhjbhjbjhbj', third: 'text'}];
    const paramsArray = Object.entries(recordArray[0]).map(([key, value]) => {
        return key
    });

    return (
        <div className={styles.mainView}>
            <div className={styles.tableContainer}>
                <div className={styles.paramsContainer}>
                    <p className={styles.counterParam}>#</p>
                    {paramsArray.map((param, i) => {
                        return <p key={i}>{param}</p>
                    })}
                </div>
                <div className={styles.recordsContainer}>
                    {recordArray.map((record, i) => {
                        return (
                            <div className={styles.records} key={i}>
                                <p className={styles.counterValue}>{i + 1}</p>
                                {paramsArray.map((param, i) => {
                                    let recordValue = Object.values(record)[i];
                                    if (typeof recordValue === 'object') {
                                        recordValue = JSON.stringify(recordValue);
                                    }
                                    return <p key={i}>{recordValue}</p>
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