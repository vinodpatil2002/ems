// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-18bea.firebaseapp.com",
    projectId: "mern-estate-18bea",
    storageBucket: "mern-estate-18bea.appspot.com",
    messagingSenderId: "643452164035",
    appId: "1:643452164035:web:5d59c76194e04803e24f76",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
