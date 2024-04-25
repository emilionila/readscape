import styles from './CustomButton.module.scss';

export const CustomButton = (props) => {
    const {
        title,
        type,
        disabled,
        onClick,
        btnStyle,
        // loading
    } = props;

    const buttonClassName = btnStyle === 'empty' ? styles.empty : styles.full;

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${buttonClassName}`}
        >
            {title}
        </button>
    );
};
