// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, onValue, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5wAF1ewSeUUZK3TRelNUvfz1QnPUoRPs",
  authDomain: "first-meet-c9321.firebaseapp.com",
  databaseURL: "https://first-meet-c9321-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "first-meet-c9321",
  storageBucket: "first-meet-c9321.firebasestorage.app",
  messagingSenderId: "637827355717",
  appId: "1:637827355717:web:3fe95cdcf4be64856d7f2c",
  measurementId: "G-5YF2MXE3DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { analytics, db, ref, set, get, onValue, remove };

