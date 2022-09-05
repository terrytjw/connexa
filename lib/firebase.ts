import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"; //docs: https://firebase.google.com/docs/firestore/quickstart
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
  writeBatch,
  doc,
  onSnapshot,
} from "firebase/firestore"; // docs: https://firebase.google.com/docs/auth/web/start
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNggaajrkeN9VfcyxgNqNKcrLt7tAJdyk",
  authDomain: "connexa-f5c15.firebaseapp.com",
  projectId: "connexa-f5c15",
  storageBucket: "connexa-f5c15.appspot.com",
  messagingSenderId: "159035113357",
  appId: "1:159035113357:web:57e31887a8b1c9090407c4",
  measurementId: "G-EBP1VR7WPV",
};

function createFirebaseApp(config) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseConfig);

// Auth
export const auth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

// Firestore (DB)
export const firestore = getFirestore(firebaseApp);

export {
  useAuthState,
  doc,
  onSnapshot,
  getFirestore,
  writeBatch,
  signInWithPopup,
  signOut,
};
