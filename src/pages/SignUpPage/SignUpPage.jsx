import { BackButton } from "../../components/backButton";
import styles from "./SignUpPage.module.scss";
import SignUpImage from "../../images/signup.svg";
import { CustomButton } from "../../components/customButton";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {firebaseConfig, firestore} from "../../db/db";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const auth = getAuth(firebaseConfig);

export const SignUpPage = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const handleSignUp = async (email, password, repeatedPassword) => {
        setError('');
        setLoading(true);
        if (password === repeatedPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const docRef = await addDoc(collection(firestore, "users"), {
                    name: email,
                    surname: '',
                    email: email,
                    uid: userCredential.user.uid,
                    accessToken: userCredential.user.stsTokenManager.accessToken,
                    createdAt: userCredential.user.reloadUserInfo.createdAt,
                });
                console.log("Document written with ID: ", docRef.id);
                const user = userCredential.user;
                console.log(user);
                navigate("/inprogress");
            } catch (error) {
                if (error.code === 'auth/invalid-email') {
                    setError('Invalid email');
                } else {
                    setError('An error occurred. Please try again later.');
                }
                console.log(error);
            } finally {
                setLoading(false);
            }
        } else {
            setError('Passwords do not match');
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            const docRef = await addDoc(collection(firestore, "users"), {
                name: user.displayName,
                email: user.email,
                uid: user.uid,
                accessToken: token,
            });
            console.log("Document written with ID: ", docRef.id);

            navigate("/inprogress");
        } catch (error) {
            console.log(error);
            setError("An error occurred while signing up with Google. Please try again later.");
        } finally {
            setLoading(false);
        }
    };
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
                    loading={loading}
                    btnStyle="full"
                    onClick={() => handleSignUp(email, password, repeatedPassword)}
                />
                <p className={styles.googleSignUp} onClick={handleGoogleSignUp}>Signup with Google</p>
            </div>
        </>
    );
};
