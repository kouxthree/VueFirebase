import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMzuELPHqvdrLPOIMl9ls2U_o7pzJKESU",
  authDomain: "vue-firebase-auth-4dff9.firebaseapp.com",
  projectId: "vue-firebase-auth-4dff9",
  storageBucket: "vue-firebase-auth-4dff9.appspot.com",
  messagingSenderId: "755357102363",
  appId: "1:755357102363:web:a3fb5046beddcef6c0a3be"
};
initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, browserSessionPersistence);
export { auth }