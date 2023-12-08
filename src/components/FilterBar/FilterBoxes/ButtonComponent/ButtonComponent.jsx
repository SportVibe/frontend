import styles from './ButtonComponent.module.css';

function ButtonComponent(prop) {
    const text = prop.text ? prop.text : 'Button';
    return (
        <div className={styles.buttonContainer}>
            <button>{text}</button>
        </div>
    );
}

export default ButtonComponent;