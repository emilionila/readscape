import { BackButton } from "../../components/backButton";
import styles from "./SignUpPage.module.scss";
import SignUpImage from "../../images/signup.svg";
import { CustomButton } from "../../components/customButton";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../../db/db";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const auth = getAuth(firebaseConfig);

export const SignUpPage = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignUp = (email, password, repeatedPassword) => {
        if (password === repeatedPassword) {
            setError('');
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/inprogress");
                })
                .catch((error) => {
                    if (error.code === 'auth/invalid-email') {
                        setError('Invalid email')
                    }
                    console.log(error);
                });
        } else {
            setError('Passwords do not match')
        }
    };

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token, 'userGoogleToken')
                const user = result.user;
                console.log(user, 'user')
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

            // ...
        });
    }

    return (
        <>
            <BackButton />
            <div className={styles.signupContainer}>
                <img
                    src={SignUpImage}
                    alt="signup image"
                    className={styles.signupContainer__signupImage}
                />
                <div className={styles.signupContainer__signupInputs}>
                    <input
                        type="email"
                        placeholder={"Enter your email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.signupContainer__input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder={"Enter your password"}
                        className={styles.signupContainer__input}
                    />
                    <input
                        type="password"
                        value={repeatedPassword}
                        onChange={(e) => setRepeatedPassword(e.target.value)}
                        placeholder={"Repeat your password"}
                        className={styles.signupContainer__input}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <CustomButton
                    type={"submit"}
                    title={"Continue"}
                    btnStyle="full"
                    onClick={() => handleSignUp(email, password, repeatedPassword)}
                />
                <p className={styles.googleSignUp} onClick={handleGoogleSignUp}>Signup with Google</p>
            </div>
        </>
    );
};
