import app from 'firebase/app';
import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyAzJkw_mqWpVahJRWAs8Lz2MAC0a_0xsJw",
    authDomain: "proyecto-integrador-ca94a.firebaseapp.com",
    projectId: "proyecto-integrador-ca94a",
    storageBucket: "proyecto-integrador-ca94a.firebasestorage.app",
    messagingSenderId: "1059619989059",
    appId: "1:1059619989059:web:90a6cd757be7eb264c56f6"
  };

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()  