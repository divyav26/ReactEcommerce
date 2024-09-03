// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyhtg5n0sbtH7Qctcd1yQOEnEEf4xNtOM",
  authDomain: "fir-authentication-36c5b.firebaseapp.com",
  projectId: "fir-authentication-36c5b",
  storageBucket: "fir-authentication-36c5b.appspot.com",
  messagingSenderId: "1036490929674",
  appId: "1:1036490929674:web:e833676aad40690fec51f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);