import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = initializeApp({
    apiKey: "AIzaSyCIDQ06opVNDk8rwxTThOwg52yGAsZqrPE",
    authDomain: "readscape-f2a84.firebaseapp.com",
    projectId: "readscape-f2a84",
    storageBucket: "readscape-f2a84.appspot.com",
    messagingSenderId: "812663682414",
    appId: "1:812663682414:web:647c32f179d96018563d7f",
    measurementId: "G-F6RD5Y90PC"
});

export const firestore = getFirestore(firebaseConfig);
export const storage = getStorage(firebaseConfig);
