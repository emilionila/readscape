import Arrow from "../../images/arrow.svg";
import {Link} from "react-router-dom";
import styles from './BackButton.module.scss'

export const BackButton =() => {
    return (
        <Link to='/' className={styles.container}>
            <img
                src={Arrow}
                alt="arrow back"
            />
            <p>Back</p>
        </Link>
    )
}
