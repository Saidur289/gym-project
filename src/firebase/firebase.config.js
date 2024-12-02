// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPVUQfuz1rQw1sLZcMFqBIybgt8ISOT7Q",
  authDomain: "gym-project-992a7.firebaseapp.com",
  projectId: "gym-project-992a7",
  storageBucket: "gym-project-992a7.firebasestorage.app",
  messagingSenderId: "1083657655306",
  appId: "1:1083657655306:web:86852078dc180fd59a7bf3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
