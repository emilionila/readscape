import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firebaseConfig } from "./db";

const auth = getAuth(firebaseConfig);

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
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
