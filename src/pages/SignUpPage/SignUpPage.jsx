import {BackButton} from "../../components/backButton";
import styles from "./SignUpPage.module.scss";
import SignUpImage from "../../images/signup.svg";
import {CustomButton} from "../../components/customButton";


export const SignUpPage = () => {

    return (
        <>
            <BackButton/>
            <div className={styles.signupContainer}>
                <img
                    src={SignUpImage}
                    alt="signup image"
                    className={styles.signupContainer__signupImage}
                />
                <div className={styles.signupContainer__signupInputs}>
                    <input
                        type="email"
                        placeholder={'Enter your email'}
                        className={styles.signupContainer__input}
                    />
                    <input
                        type="password"
                        placeholder={'Enter your password'}
                        className={styles.signupContainer__input}
                    />
                    <input
                        type="password"
                        placeholder={'Repeat your password'}
                        className={styles.signupContainer__input}
                    />
                </div>

                <CustomButton
                    type={'submit'}
                    title={'Continue'}
                    btnStyle='full'
                />
                <p className={styles.googleSignUp}>Signup with Google</p>
            </div>
        </>
    )
}
