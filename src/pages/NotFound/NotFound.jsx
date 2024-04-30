import NotFoundImage from "../../images/404.svg";
import { BackButton } from "../../components/backButton";
import styles from "./NotFound.module.scss";

export const NotFound = () => {
    return (
        <div className={styles.notFoundContainer}>
            <BackButton />
            <img
                src={NotFoundImage}
                alt="not found"
                className={styles.notFoundImage}
            />
        </div>
    );
};
