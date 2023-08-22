// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB2N_6_30xAXx_TlDxzyxbzqA-qzg2JsKI",
    authDomain: "chat-app-a0b5a.firebaseapp.com",
    projectId: "chat-app-a0b5a",
    storageBucket: "chat-app-a0b5a.appspot.com",
    messagingSenderId: "794872079122",
    appId: "1:794872079122:web:fdf11c18974dbbc49189cb",
    measurementId: "G-XCLQ3KXFMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

// const db = getFirestore();
connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

export { db, auth, analytics };