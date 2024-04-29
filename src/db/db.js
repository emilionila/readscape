import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


export const firebaseConfig = initializeApp({

});

export const firestore = getFirestore(firebaseConfig);
export const storage = getStorage(firebaseConfig);


const auth = getAuth(firebaseConfig);


export const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User ID:', user.uid);

            console.log('there is user')
            const uid = user.uid;
            console.log(user.email)
        } else {
            console.log('there is no user')
        }
    });
}