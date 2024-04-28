import {BackButton} from "../../components/backButton";
import styles from "./SignUpPage.module.scss";
import SignUpImage from "../../images/signup.svg";
import {CustomButton} from "../../components/customButton";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {firebaseConfig} from "../../db/db";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const auth = getAuth(firebaseConfig);

export const SignUpPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = (email, password, repeatedPassword) => {
        if (password === repeatedPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(user);

                    navigate('inprogress');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            console.log('wrong')
        }
    }

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.signupContainer__input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Enter your password'}
                        className={styles.signupContainer__input}
                    />
                    <input
                        type="password"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        placeholder={'Repeat your password'}
                        className={styles.signupContainer__input}
                    />
                </div>

                <CustomButton
                    type={'submit'}
                    title={'Continue'}
                    btnStyle='full'
                    onClick={() => handleSignUp(email, password, repeatedPassword)}
                />
                <p className={styles.googleSignUp}>Signup with Google</p>
            </div>
        </>
    )
}
