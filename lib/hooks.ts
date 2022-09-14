import { useEffect, useState } from "react";
import { auth, doc, getFirestore, onSnapshot } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Custom hook to read  auth record and user profile doc
export const useUserData = () => {
  const [user, isAuthLoading, isAuthError] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [isUsernameLoading, setIsUsernameLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      // const ref = firestore.collection('users').doc(user.uid);
      const ref = doc(getFirestore(), "users", user.uid);
      unsubscribe = onSnapshot(ref, (doc) => {
        setUsername(doc.data()?.username);
        setIsUsernameLoading(false);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username, isAuthLoading, isUsernameLoading };
};
