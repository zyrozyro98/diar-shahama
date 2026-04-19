import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQodWTn2wa0WzQuHqzZt2Ex6CdnQdrlUU",
  authDomain: "onecar1.firebaseapp.com",
  projectId: "onecar1",
  storageBucket: "onecar1.firebasestorage.app",
  messagingSenderId: "735648367644",
  appId: "1:735648367644:web:44ae368553280b14bdcbd9",
  measurementId: "G-RSTPV8SRXT",
  databaseURL: "https://onecar1-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, db, auth, firestore, storage };
