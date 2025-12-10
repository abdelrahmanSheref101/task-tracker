// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
        apiKey: "AIzaSyCNjBGqd3GNAljTUTYpTh8oCG7tfVRAEFw",
        authDomain: "taskmanagerapp-ad7b5.firebaseapp.com",
        projectId: "taskmanagerapp-ad7b5",
        storageBucket: "taskmanagerapp-ad7b5.firebasestorage.app",
        messagingSenderId: "48752406091",
        appId: "1:48752406091:web:530434c6a87ab25346a7ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
