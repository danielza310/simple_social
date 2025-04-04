import { initializeApp, getApps, } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({

    apiKey: "AIzaSyBTHvalVjj0mJtSea-H9fmzBW1khbj79kA",
    authDomain: "ecommerce-a91ab.firebaseapp.com",
    projectId: "ecommerce-a91ab",
    storageBucket: "ecommerce-a91ab.firebasestorage.app",
    messagingSenderId: "905005446213",
    appId: "1:905005446213:web:711ea8c45438f2194adf2c",

    measurementId: "G-14867TFB6Q"


});

export const app = firebaseApp
export const db = getFirestore();
export const auth = getAuth(app)




