// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "helplinebot-71d02.firebaseapp.com",
  projectId: "helplinebot-71d02",
  storageBucket: "helplinebot-71d02.appspot.com",
  messagingSenderId: "495530564580",
  appId: "1:495530564580:web:c994d70516b0bc85f2c5f1",
  measurementId: "G-BVNB4TT8BQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
