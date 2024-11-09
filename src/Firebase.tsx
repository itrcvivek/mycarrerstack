// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCdTx_JlcstQlZSnZXqoMs1c5yjzS-_gy8",
  authDomain: "resume-72390.firebaseapp.com",
  projectId: "resume-72390",
  storageBucket: "resume-72390.appspot.com",
  messagingSenderId: "241857191716",
  appId: "1:241857191716:web:889c4da413fe1de3905db1",
  measurementId: "G-91NGY53NP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app); 

const auth = getAuth()

export{app, auth, storage};