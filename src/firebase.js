// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAfFoZKBprwd7WQFzLfdB5FdPTqc6wV8r4",
    authDomain: "personal-gym--application.firebaseapp.com",
    projectId: "personal-gym--application",
    storageBucket: "personal-gym--application.firebasestorage.app",
    messagingSenderId: "685854297468",
    appId: "1:685854297468:web:b7cfe98bb2c93a0bbea8f9",
    measurementId: "G-XRE601NB7T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, googleProvider };
