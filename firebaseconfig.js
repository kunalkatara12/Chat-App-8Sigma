// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxDGpnww61UCEAmsPuYn01coWnCorvhco",
  authDomain: "chatapp-a1079.firebaseapp.com",
  projectId: "chatapp-a1079",
  storageBucket: "chatapp-a1079.appspot.com",
  messagingSenderId: "993358783605",
  appId: "1:993358783605:web:be3cfd40673a6f1f7f843c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db=getFirestore();
export {auth,db};