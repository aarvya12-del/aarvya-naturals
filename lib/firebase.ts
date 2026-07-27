import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLGsoCXBH9UDVXPuNAiYIzzAYw7D6m3oo",
  authDomain: "aarvya-naturals.firebaseapp.com",
  projectId: "aarvya-naturals",
  storageBucket: "aarvya-naturals.firebasestorage.app",
  messagingSenderId: "52656731154",
  appId: "1:52656731154:web:491bfa9f07b54c23a3d4cb",
  measurementId: "G-78V8VQ7QRR",
};

const app =
  !getApps().length
    ? initializeApp(firebaseConfig)
    : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

export default app;