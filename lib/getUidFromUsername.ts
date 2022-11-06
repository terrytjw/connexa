import { doc, getDoc, getFirestore } from "firebase/firestore";

export const getUidFromUsername = async (username: string) => {
  const uidRef = doc(getFirestore(), "usernames", username);
  const uidSnap = await getDoc(uidRef);
  const uid = await uidSnap.data();

  if (uid) {
    return uid.uid;
  }

  return null;
};
