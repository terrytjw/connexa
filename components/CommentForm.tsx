import { useEffect, useState } from "react";
import img from "../public/assets/images/postphoto.jpg";
import Image from "next/image";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { title } from "process";
import toast from "react-hot-toast";
import { auth } from "../lib/firebase";

type CommentFormProps = {
  autoFocus: boolean;
  setReplying: Function;
  initialValue?: string;
  slug: string;
  parentId?: string | null;
  uid: string;
};

const CommentForm = ({
  autoFocus,
  setReplying,
  initialValue = "",
  slug,
  parentId = null,

  uid,
}: CommentFormProps) => {
  const [comment, setComment] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    setLoading(true);
    e.preventDefault();

    // const uid = auth.currentUser?.uid;

    const ref =
      uid &&
      collection(getFirestore(), "users", uid, "posts", slug, "comments");

    ref &&
      addDoc(ref, {
        displayName: auth.currentUser?.displayName,
        photoURL: auth.currentUser?.photoURL,
        message: comment,
        parentId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        heartCount: 0,
      });

    // ref && (await setDoc(ref, data));

    toast.success("Comment created!");
    setReplying(false);
    setComment("");
    setLoading(false);
  };

  return (
    <div className="flex items-center p-3 bg-gray-100 rounded-xl ml-4 mt-1">
      <div className="img w-9 h-9 rounded-full overflow-hidden mr-3">
        <img src={auth.currentUser?.photoURL || undefined} />
      </div>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <textarea
          placeholder="What are your thoughts?"
          className="resize-none bg-inherit border rounded-xl w-full"
          autoFocus={autoFocus}
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <div className="buttons flex justify-end text-sm">
          <div
            className="btn p-1 cursor-pointer"
            onClick={() => setComment("")}
          >
            Clear
          </div>
          <button className="btn p-1" onClick={() => setReplying(false)}>
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn p-1">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;