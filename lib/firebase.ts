import { initializeApp, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  writeBatch,
  doc,
  onSnapshot,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  QueryDocumentSnapshot,
  DocumentData,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCvBbc4XqIpln355K-G1rctsHRIt6-t2v4",
  authDomain: "connexa-crypto.firebaseapp.com",
  projectId: "connexa-crypto",
  storageBucket: "connexa-crypto.appspot.com",
  messagingSenderId: "476337055520",
  appId: "1:476337055520:web:017a7dce8d9b7f08fcd945",
  measurementId: "G-4CN2M7B5L7",
};

function createFirebaseApp(config: any) {
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

// Firebase Storage
export const storage = getStorage(firebaseApp);
export const STATE_CHANGED = "state_changed";

/********************* Helper functions **********************/
/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username: any) {
  // const usersRef = collection(firestore, 'users');
  // const query = usersRef.where('username', '==', username).limit(1);

  const q = query(
    collection(firestore, "users"),
    where("username", "==", username),
    limit(1)
  );
  const userDoc = (await getDocs(q)).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc: QueryDocumentSnapshot<DocumentData>) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}

export {
  useAuthState,
  doc,
  onSnapshot,
  getFirestore,
  writeBatch,
  signInWithPopup,
  signOut,
  useDocumentData,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  limit,
  orderBy,
  serverTimestamp,
  setDoc,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
