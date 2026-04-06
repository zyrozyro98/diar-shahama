import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAhmJ3_2V0OOP26nZOMWMOyTDePiyI01Yk",
  authDomain: "diar-shahama-1088b.firebaseapp.com",
  projectId: "diar-shahama-1088b",
  storageBucket: "diar-shahama-1088b.firebasestorage.app",
  messagingSenderId: "887214900924",
  appId: "1:887214900924:web:0a265e755c852f0113b2b9",
  measurementId: "G-HB41E2SHWR",
  databaseURL: "https://diar-shahama-1088b-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); // Realtime Database
export const auth = getAuth(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
