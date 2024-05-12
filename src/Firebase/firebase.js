// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS96JCM54SIYQJq9BJ1ddWVT_ZioazQRk",
  authDomain: "fresh-produce-7badc.firebaseapp.com",
  projectId: "fresh-produce-7badc",
  storageBucket: "fresh-produce-7badc.appspot.com",
  messagingSenderId: "195981799142",
  appId: "1:195981799142:web:4807064d9037fed0a09527",
  measurementId: "G-Q7SWTT1KES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

