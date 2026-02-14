import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBv1jP7i2bioNjJFTfPJMl14_3766zif3U",
    authDomain: "diplom1-90cd5.firebaseapp.com",
    projectId: "diplom1-90cd5",
    storageBucket: "diplom1-90cd5.firebasestorage.app",
    messagingSenderId: "363599872086",
    appId: "1:363599872086:web:c1626644bffddbf086bbf7",
    measurementId: "G-3DYEL8XL1F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
