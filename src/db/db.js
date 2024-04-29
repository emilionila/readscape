import {initializeApp} from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const firebaseConfig = initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});



const auth = getAuth(firebaseConfig);

export const checkUser = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('there is user')
            const uid = user.uid;
            console.log(user.email)
        } else {
            console.log('there is no user')
        }
    });
}


