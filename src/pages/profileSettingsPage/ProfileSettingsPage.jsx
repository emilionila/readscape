import React, {useEffect, useState} from 'react';
import ProfileIcon from '../../images/userIcon.svg';
import {ShortInput} from '../../components/shortInput';
import {CustomButton} from '../../components/customButton';
import {BackButton} from '../../components/backButton';
import useAuth, {auth} from '../../db/user';
import {firestore} from '../../db/db';
import styles from './ProfileSettingsPage.module.scss';
import {deleteDoc, doc, getDoc, updateDoc} from 'firebase/firestore';
import {getAuth, deleteUser, signOut, EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth';
import {useNavigate} from "react-router-dom";

export const ProfileSettingsPage = () => {
    const user = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            if (user) {
                const docRef = doc(firestore, 'users', user.uid)
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUsername(docSnap.get('username'))
                }
            }
        }

        getUserData();
    }, [user]);

    const handleEditClick = () => {
        const getUserData = async () => {
            if (user) {
                const docRef = doc(firestore, 'users', user.uid)
                const docSnap = await getDoc(docRef);
                console.log(docSnap.get("name"))
            } else {
                console.log("no user")
            }
        }

        getUserData();
        setIsEditing(true);
    };

    const updateUserData = async () => {
        if (user) {
            console.log(user.email);
            const docRef = await doc(firestore, 'users', user.firestoreUserId)
            await updateDoc(docRef, {
                username: username,
            })

        }
    }

    const handleSaveClick = async () => {
        setIsEditing(false);
        await updateUserData();
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const handleDeleteAccount = async (user) => {
        const currentUser = getAuth().currentUser;
        const password = prompt('Please enter your password to confirm account deletion:');
        const credential = EmailAuthProvider.credential(currentUser.email, password);

        try {
            await reauthenticateWithCredential(currentUser, credential);

            await deleteUser(currentUser);

            if (user) {
                const docRef = doc(firestore, 'users', user.firestoreUserId);
                await deleteDoc(docRef);
            }

        } catch (error) {
            console.error("Error deleting account:", error);
        }
    };

    return (
        <div className={styles.container}>
            <BackButton/>
            <div className={styles.profileSettingsContainer}>
                <img
                    src={ProfileIcon}
                    alt="user icon"
                    className={styles.profilePicture}
                />
                <div className={styles.profileInfo}>
                    {isEditing ? (
                        <ShortInput
                            label={"Username"}
                            type={"text"}
                            value={username}
                            onChange={(newValue) => setUsername(newValue)}
                            placeholder={"Type your username..."}
                        />
                    ) : (
                        <div className={styles.profileUsername}>{username}</div>
                    )}
                    {isEditing ? (
                            <CustomButton
                                title={"Save Changes"}
                                type={"button"}
                                disabled={false}
                                onClick={handleSaveClick}
                                loading={false}
                            />
                    ) : (
                        <CustomButton
                            title={"Edit"}
                            type={"button"}
                            disabled={false}
                            onClick={handleEditClick}
                            loading={false}
                        />
                    )}
                    <CustomButton
                        title={"Log Out"}
                        type={"button"}
                        disabled={false}
                        onClick={handleLogout}
                        btnStyle={"empty"}
                        loading={false}
                    />
                    <CustomButton
                        title={"Delete  Account"}
                        type={"button"}
                        disabled={false}
                        onClick={handleDeleteAccount}
                        btnStyle={"danger"}
                        loading={false}
                    />
                </div>
            </div>
        </div>
    );
};
