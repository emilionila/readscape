import LoginImage from "../../images/login.svg";
import {useEffect, useState} from "react";
import styles from './LogInPage.module.scss';
import {CustomButton} from "../../components/customButton";
import {BackButton} from "../../components/backButton";
import {useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth";
import {firebaseConfig} from "../../db/db";


const auth = getAuth(firebaseConfig);

export const LogInPage = () => {
    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (email !== '' && password !== '') {
            setDisabled(false)
        }
    }, [email, password]);

    const handleLogIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                navigate('/inprogress');
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Enter your email'}
                        className={styles.loginContainer__input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Enter your password'}
                        className={styles.loginContainer__input}
                    />
                </div>

                <CustomButton
                    type={'submit'}
                    title={'LogIn'}
                    disabled={disabled}
                    btnStyle='full'
                    onClick={() => handleLogIn(email, password)}
                />
            </div>
        </>
    )
}
