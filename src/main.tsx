import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log("DEBUG import.meta.env:", import.meta.env);
console.log("DEBUG firebaseConfig:", {
        apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
        projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
        authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
        appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
});


createRoot(document.getElementById('root')!).render(
        <StrictMode>
                <App />
        </StrictMode>,
)
