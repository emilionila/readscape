import { useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import { firebaseConfig } from "./db";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from './db';

export const auth = getAuth(firebaseConfig);

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const usersRef = collection(firestore, "users");
                const q = query(usersRef, where("uid", "==", firebaseUser.uid));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        firestoreUserId: doc.id,
                    });
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
};



export default useAuth;
