import styles from './ButtonComponent.module.css';

function ButtonComponent(prop) {
    const text = prop.text ? prop.text : 'Button';
    const logo = prop.logo ? prop.logo : '';
    return (
        <div className={styles.buttonContainer}>
            <button>{text}</button>
        </div>
    );
}

export default ButtonComponent;