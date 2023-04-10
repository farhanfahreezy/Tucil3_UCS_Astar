// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEJTALuborPDjG5TlW8bsLaiPMMfPRucs",
  authDomain: "tucil3-ucs-astar.firebaseapp.com",
  projectId: "tucil3-ucs-astar",
  storageBucket: "tucil3-ucs-astar.appspot.com",
  messagingSenderId: "4908213873",
  appId: "1:4908213873:web:45aba5891135d6f37cddd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);