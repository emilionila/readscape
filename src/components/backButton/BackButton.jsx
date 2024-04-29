import Arrow from "../../images/arrow.svg";
import {useNavigate} from "react-router-dom";
import styles from './BackButton.module.scss'

export const BackButton =() => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    }
    return (
        <div onClick={goBack} className={styles.container}>
            <img
                src={Arrow}
                alt="arrow back"
            />
            <p>Back</p>
        </div>
    )
}
