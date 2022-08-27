import firebase from "firebase/app";
import { getAuth } from "firebase/auth"; //docs: https://firebase.google.com/docs/firestore/quickstart
import { getFirestore } from "firebase/firestore"; // docs: https://firebase.google.com/docs/auth/web/start

let app;

const firebaseConfig = {
  apiKey: "AIzaSyBhJMtwdYlPM2zj_dltuAR9s64wqYD89yY",
  authDomain: "cryptorookie-io.firebaseapp.com",
  projectId: "cryptorookie-io",
  storageBucket: "cryptorookie-io.appspot.com",
  messagingSenderId: "289361538010",
  appId: "1:289361538010:web:1e7413ed101ac560f6aee3",
  measurementId: "G-QS5D7DLDN3",
};

// condition to make sure initializeApp only runs once, coz Next.js sometimes runs the code
// in this file twice, leading to errors
if (!firebase.getApps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
