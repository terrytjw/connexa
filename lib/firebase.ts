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
  apiKey: "AIzaSyCvBbc4XqIpln355K-G1rctsHRIt6-t2v4",
  authDomain: "connexa-crypto.firebaseapp.com",
  projectId: "connexa-crypto",
  storageBucket: "connexa-crypto.appspot.com",
  messagingSenderId: "476337055520",
  appId: "1:476337055520:web:017a7dce8d9b7f08fcd945",
  measurementId: "G-4CN2M7B5L7",
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
