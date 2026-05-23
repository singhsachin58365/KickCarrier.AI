
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-d54b1.firebaseapp.com",
  projectId: "interviewiq-d54b1",
  storageBucket: "interviewiq-d54b1.firebasestorage.app",
  messagingSenderId: "949280744869",
  appId: "1:949280744869:web:4af5c0f067ee66e41d744c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}