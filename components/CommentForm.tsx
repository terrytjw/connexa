import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { auth } from "../lib/firebase";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

type CommentFormProps = {
  autoFocus: boolean;
  setState: Function;
  initialValue?: string;
  slug: string;
  parentId?: string | null;
  uid: string;
  id?: string;
  username: string;
};

const CommentForm = ({
  autoFocus,
  setState,
  initialValue = "",
  slug,
  parentId = null,
  uid,
  id,
  username,
}: CommentFormProps) => {
  const [comment, setComment] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  console.log("Comment form", username);

  const handleUserKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ): Promise<any> => {
    setLoading(true);
    e.preventDefault();
    if (comment.length === 0) {
      setError(true);
      toast.error("Please enter a comment!");
      return;
    }
    if (initialValue) {
      if (initialValue === comment) {
        toast("No changes were made!");
        return;
      }

      const ref = doc(
        getFirestore(),
        "users",
        uid,
        "posts",
        slug,
        "comments",
        id!
      );

      updateDoc(ref, {
        message: comment,
        updatedAt: serverTimestamp(),
      });
      toast.success("Comment edited successfully!");
    } else {
      const ref =
        uid &&
        collection(getFirestore(), "users", uid, "posts", slug, "comments");

      ref &&
        addDoc(ref, {
          displayName: auth.currentUser?.displayName,
          authorUid: auth.currentUser?.uid,
          photoURL: auth.currentUser?.photoURL,
          username,
          message: comment,
          parentId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          heartCount: 0,
        });

      toast.success("Comment created!");
    }
    setState(false);
    setComment("");
    setLoading(false);
  };

  return (
    <div
      className={`comment-form flex items-center  bg-gray-100 rounded-xl mt-1 ${
        parentId === null || " ml-4"
      } ${initialValue ? "" : "p-3"}`}
    >
      <div className="img w-9 h-9 rounded-full overflow-hidden mr-3 flex-none">
        <img src={auth.currentUser?.photoURL || undefined} />
      </div>
      <form className="w-full flex flex-col" onSubmit={handleSubmit}>
        <textarea
          placeholder="What are your thoughts?"
          className={`resize-none bg-inherit border rounded-xl w-full focus: ${
            initialValue ? "bg-gray-300" : ""
          } ${error && "animate-[shake_0.3s_ease_1] border-red-600 "}`}
          autoFocus={autoFocus}
          value={comment}
          onKeyPress={handleUserKeyPress}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <div className="buttons flex justify-end text-sm items-center mr-1">
          <button className="btn p-1 w-7 h-7" onClick={() => setState(false)}>
            <XMarkIcon />
          </button>
          <button type="submit" disabled={loading} className="btn p-1 w-7 h-7 ">
            <CheckIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
