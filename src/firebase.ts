// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF2y_zXLzXk43jK1buGAgS5tUrPCRBpjA",
  authDomain: "socket-io-97649.firebaseapp.com",
  projectId: "socket-io-97649",
  storageBucket: "socket-io-97649.appspot.com",
  messagingSenderId: "820829514022",
  appId: "1:820829514022:web:65df645aeb9a269aae39e7",
  measurementId: "G-2F7SMZ1D1Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Auth = getAuth();
export const storage=getStorage();
export const db =getFirestore();
