import LoginImage from "../../images/login.svg";
import {useState} from "react";
import styles from './LogInPage.module.scss'; // Import styles
import {CustomButton} from "../../components/customButton";
import {BackButton} from "../../components/backButton";

export const LogInPage = () => {
    const [disabled, setDisabled] = useState(true);

    return (
        <>
            <BackButton/>
            <div className={styles.loginContainer}>
                <img
                    src={LoginImage}
                    alt="login image"
                    className={styles.loginContainer__loginImage}
                />
                <div className={styles.loginContainer__loginInputs}>
                    <input
                        type="email"
                        placeholder={'Enter your email'}
                        className={styles.loginContainer__input}
                    />
                    <input
                        type="password"
                        placeholder={'Enter your password'}
                        className={styles.loginContainer__input}
                    />
                </div>

                <CustomButton
                    type={'submit'}
                    title={'LogIn'}
                    disabled={disabled}
                    btnStyle='full'
                />
            </div>
        </>
    )
}
