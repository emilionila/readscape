import {CustomButton} from "../../components/customButton";
import styles from "./WelcomePage.module.scss";
import WelcomeImage from "../../images/welcome.svg";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../components/loader";

export const WelcomePage = () => {
    let navigate = useNavigate();
    const handleSignUpClick = () => {
        navigate('signup');
    }

    const handleLogInClick = () => {
        navigate('/login');
    }

    return (
        <div className={styles.container}>
            <img
                src={WelcomeImage}
                alt="welcome image"
                className={styles.welcomeImage}
            />
            <h2 className={styles.title}>
                Let's start your reading journey?
            </h2>
            <CustomButton
                type={'submit'}
                title={'LogIn'}
                onClick={handleLogInClick}
                btnStyle='full'
            />

            <CustomButton
                type={'submit'}
                title={'SignUp'}
                onClick={handleSignUpClick}
                btnStyle='empty'
            />
        </div>
    )
}
