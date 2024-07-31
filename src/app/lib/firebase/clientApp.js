// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcKDh5iaea2_8yGpfECcE48NdbFmztj2w",
  authDomain: "recipehub-4f83f.firebaseapp.com",
  projectId: "recipehub-4f83f",
  storageBucket: "recipehub-4f83f.appspot.com",
  messagingSenderId: "1056716500699",
  appId: "1:1056716500699:web:56359cf5686e6b169f26fe",
  measurementId: "G-RYSP5VKC4K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider, collection, addDoc };
