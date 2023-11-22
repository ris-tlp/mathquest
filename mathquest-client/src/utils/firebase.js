// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_VGwW1aVD4f65r-tRjgOMN8u7fY4gvQE",
  authDomain: "mathquest-2d0ec.firebaseapp.com",
  projectId: "mathquest-2d0ec",
  storageBucket: "mathquest-2d0ec.appspot.com",
  messagingSenderId: "170729430788",
  appId: "1:170729430788:web:c0549ca8ba72c57144fa51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const provider = new GoogleAuthProvider()