import styles from './CustomButton.module.scss';
import {Loader} from "../loader";

export const CustomButton = (props) => {
    const {
        title,
        type,
        disabled,
        onClick,
        btnStyle,
        loading,
        classBtn
    } = props;

    const buttonClassName = btnStyle === 'empty' ? styles.empty : btnStyle === 'danger' ? styles.danger : styles.full;
    const widthClass = classBtn ? styles.wide : '';


    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${buttonClassName} ${widthClass}`}
        >
            {title}
            {loading && (
                <Loader />
            )}
        </button>
    );
};
