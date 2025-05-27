import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLH7K_-fkz3YdHbogdxKxsR-tZeUVmz5s",
  authDomain: "medmap360.firebaseapp.com",
  projectId: "medmap360",
  storageBucket: "medmap360.appspot.com", // ⚠️ FIXED: ".app" → ".app**spot.com**"
  messagingSenderId: "1004551576532",
  appId: "1:1004551576532:web:2de5fcb83e75632d5b1441",
  measurementId: "G-6J7JDLB290",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const facilitiesRef = collection(db, "facilities");
const analytics = getAnalytics(app); // Optional, only used if needed

export { app, db };
