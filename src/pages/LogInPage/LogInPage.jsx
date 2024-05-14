import React, { useEffect, useState } from 'react';
import LoginImage from "../../images/login.svg";
import styles from './LogInPage.module.scss';
import { CustomButton } from "../../components/customButton";
import { BackButton } from "../../components/backButton";
import { useNavigate } from "react-router-dom";
import {signInWithEmailAndPassword, getAuth, UserCredential, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { firebaseConfig } from "../../db/db";

const auth = getAuth(firebaseConfig);

export const LogInPage = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (email !== '' && password !== '') {
            setDisabled(false)
        }
    }, [email, password]);

    const validateEmail = () => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValidEmail && email !== '') {
            setError("Invalid email");
            setLoading(false)
        }
        setLoading(false)
    }

    const handleLogIn = async (email, password) => {
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setLoading(false);
            navigate('/inprogress');
        } catch (error) {
            console.error("Login error:", error);
            let errorMessage = "";
            switch (error.code) {
                case "auth/user-not-found":
                    errorMessage = "User not found, try to SignIn";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Wrong password, try again";
                    break;
                case "auth/invalid-credential":
                    errorMessage = "Incorrect email or password";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email";
                    break;

                default:
                    errorMessage = "An unknown error occurred";
            }
            setError(errorMessage);
        }
    };

    const handleGoogleLogIn = () => {
        setLoading(true);

        signInWithPopup(auth, provider)
            .then((result) => {
                setLoading(false);
                navigate("/inprogress");
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            }).catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

        });
    }

    return (
        <>
            <BackButton />
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
                        id='emailLogIn'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Enter your email'}
                        className={styles.loginContainer__input}
                    />
                    <input
                        type="password"
                        value={password}
                        id='passwordLogIn'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Enter your password'}
                        className={styles.loginContainer__input}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                </div>

                <CustomButton
                    type={'submit'}
                    title={'LogIn'}
                    disabled={disabled}
                    btnStyle='full'
                    loading={loading}
                    onClick={async () => {
                        await handleLogIn(email, password)
                        validateEmail()
                    }}
                />
                <p className={styles.googleLogIn} onClick={handleGoogleLogIn}>LogIn with Google</p>

            </div>
        </>
    );
};
