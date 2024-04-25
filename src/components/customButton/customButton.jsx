import './cutomButton.scss';

export const  CustomButton = (props) =>  {

    const {
        title,
        type,
        disabled,
        onClick,
        btnStyle,
        // loading
    } = props;

    const buttonClassName = (btnStyle === 'empty') ? 'empty' : 'full';

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            // onLoad={loading}
            className={`button ${buttonClassName}`}
        >
            {title}
        </button>
    )
}
