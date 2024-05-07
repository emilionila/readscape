import styles from './CustomButton.module.scss';
import {Loader} from "../loader";

export const CustomButton = (props) => {
    const {
        title,
        type,
        disabled,
        onClick,
        btnStyle,
        loading
    } = props;

    const buttonClassName = btnStyle === 'empty' ? styles.empty : btnStyle === 'danger' ? styles.danger : styles.full;

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${buttonClassName}`}
        >
            {title}
            {loading && (
                <Loader />
            )}
        </button>
    );
};
