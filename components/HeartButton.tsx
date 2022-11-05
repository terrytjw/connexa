import { auth } from "../lib/firebase";
import {
  increment,
  writeBatch,
  doc,
  getFirestore,
  DocumentReference,
  onSnapshot,
} from "firebase/firestore";
import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

type Props = {
  docRef: DocumentReference<any>;
};

// Allows user to heart or like a post
const Heart = ({ docRef }: Props) => {
  // Listen to heart document for currently logged in user
  const [exists, setExists] = useState(false);

  const uid = auth.currentUser && auth.currentUser.uid;
  const authorUid = docRef.path.split("/", 2);
  const authorPath = "users/" + authorUid[1];
  const path = docRef.path + "/hearts/" + uid;

  const heartRef = doc(getFirestore(), path);
  const authorRef = doc(getFirestore(), authorPath);

  onSnapshot(heartRef, (doc) => {
    setExists(doc.exists());
  });

  // Create a user-to-post relationship
  const addHeart = async () => {
    if (!auth.currentUser) {
      toast.error("Please login to like content!");
      return;
    }
    const uid = auth.currentUser && auth.currentUser.uid;
    const batch = writeBatch(getFirestore());

    batch.update(docRef, { heartCount: increment(1) });
    batch.update(authorRef, { points: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    const batch = writeBatch(getFirestore());

    batch.update(docRef, { heartCount: increment(-1) });
    batch.update(authorRef, { points: increment(-1) });

    batch.delete(heartRef);

    await batch.commit();
  };

  return exists ? (
    <button onClick={removeHeart} className="flex items-center">
      <HeartIconSolid className="w-4 h-4" />
    </button>
  ) : (
    <button onClick={addHeart} className="flex items-center">
      <HeartIcon className="w-4 h-4" />
    </button>
  );
};

export default Heart;
