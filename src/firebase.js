import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDeDfOH6dP31bKIrRTXP2zWfKnRQOYdvEg",
  authDomain: "phimmoi-web.firebaseapp.com",
  projectId: "phimmoi-web",
  storageBucket: "phimmoi-web.firebasestorage.app",
  messagingSenderId: "1036782724108",
  appId: "1:1036782724108:web:4924bc0a54ebcc687f3a29",
  measurementId: "G-56SNE81KMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;