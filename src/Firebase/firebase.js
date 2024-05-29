import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCrlH1gutMGkcVdz6Dgf1LhMnNru80siU",
  authDomain: "market-64867.firebaseapp.com",
  projectId: "market-64867",
  storageBucket: "market-64867.appspot.com",
  messagingSenderId: "1075018003757",
  appId: "1:1075018003757:web:8a6f44b3004e16e8898fa4",
  measurementId: "G-S85RQ5D4LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

