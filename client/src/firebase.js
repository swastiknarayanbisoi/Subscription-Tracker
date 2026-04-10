import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCIjwIpqIBVp6AEjycW77hgSA9fi-DrzVg",
  authDomain: "subscription-tracker-80f2d.firebaseapp.com",
  projectId: "subscription-tracker-80f2d",
  storageBucket: "subscription-tracker-80f2d.firebasestorage.app",
  messagingSenderId: "585170723682",
  appId: "1:585170723682:web:22930404d45ac4430d823b",
  measurementId: "G-ZNJHLQSDEY"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 