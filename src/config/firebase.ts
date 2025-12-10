// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
        VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID,
        VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_MESSAGING_SENDER_ID,
        VITE_FIREBASE_APP_ID,
} = import.meta.env;

if (!VITE_FIREBASE_API_KEY || !VITE_FIREBASE_PROJECT_ID) {
        console.error("Missing VITE_FIREBASE_* env vars at build time.");
}

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: String(VITE_FIREBASE_API_KEY),
        authDomain: String(VITE_FIREBASE_AUTH_DOMAIN),
        projectId: String(VITE_FIREBASE_PROJECT_ID),
        storageBucket: String(VITE_FIREBASE_STORAGE_BUCKET),
        messagingSenderId: String(VITE_FIREBASE_MESSAGING_SENDER_ID),
        appId: String(VITE_FIREBASE_APP_ID)
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
