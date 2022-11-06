import img from "../public/assets/images/postphoto.jpg";
import Image from "next/image";
import {
  ArrowUturnLeftIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { auth, doc, getFirestore } from "../lib/firebase";
import HeartButton from "./HeartButton";
import toast from "react-hot-toast";
import { deleteDoc, Timestamp } from "firebase/firestore";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

type CommentProp = {
  id: string;
  message: string;
  parentId: number | null;
  createdAt: Timestamp;
  heartCount: number;
  displayName: string;
  photoURL: string;
  slug: string;
  uid: string;
  comments: CommentType[] | undefined;
};

type CommentType = {
  id: string;
  message: string;
  parentId: number | null;
  createdAt: Timestamp;
  heartCount: number;
  displayName: string;
  photoURL: string;
  slug: string;
};

const compare = (a: CommentType, b: CommentType) => {
  if (a.createdAt < b.createdAt) return -1;
  else return 1;
};

const Comment = ({
  id,
  message,
  parentId,
  createdAt,
  heartCount,
  displayName,
  photoURL,
  slug,
  comments,
  uid,
}: CommentProp) => {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const [childrenHidden, setChildrenHidden] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const commentRef = doc(
    getFirestore(),
    "users",
    uid!,
    "posts",
    slug,
    "comments",
    id
  );

  let timeAgo;
  const datePosted = new Date(createdAt?.toMillis());
  let minutesAgo = Math.floor(
    (new Date().getTime() - datePosted.getTime()) / 1000 / 60
  );
  const hoursAgo = Math.floor(
    (new Date().getTime() - datePosted.getTime()) / 1000 / 60 / 60
  );

  minutesAgo = minutesAgo < 0 ? 0 : minutesAgo;

  timeAgo =
    minutesAgo < 60
      ? `${minutesAgo} min ago`
      : hoursAgo < 24
      ? `${hoursAgo}h ago`
      : createdAt && dateFormatter.format(datePosted);

  const childComments = comments?.filter((comment) => {
    return comment.parentId?.toString() === id;
  });

  const handleReply = () => {
    if (!auth.currentUser) {
      toast.error("Please login to write a comment!");
      return;
    }
    setReplying((prev) => !prev);
  };

  const handleDelete = () => {
    deleteDoc(commentRef).then(() =>
      toast.success("Comment deleted successfully")
    );
    setShowAlert(false);
  };

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  return (
    <>
      <div className="comment flex items-center p-3 bg-gray-100 rounded-xl mt-3 relative">
        <div
          id="alert-additional-content-2"
          className={`p-4 mb-4 border  border-red-300 rounded-lg ${
            showAlert ? "scale-100" : "scale-0"
          } bg-red-50 dark:bg-red-200 absolute w-96 left-16 z-10 transition-all duration-100 ease`}
          role="alert"
        >
          <div className="flex items-center">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 text-red-900 dark:text-red-800"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium text-red-900 dark:text-red-800">
              Caution
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm text-red-900 dark:text-red-800">
            Are you sure you want to delete this comment?
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="text-red-900 bg-transparent hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-red-800 dark:text-red-800 dark:hover:text-white"
              data-dismiss-target="#alert-additional-content-2"
              onClick={() => setShowAlert(false)}
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <form>
              <button
                type="button"
                onClick={handleDelete}
                autoFocus={showAlert}
                className="text-white  bg-red-900 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-900"
              >
                <CheckIcon className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
        {editing ? (
          <div className="w-full flex flex-col">
            <div className="text-sm font-bold ml-12">Edit Comment</div>
            <CommentForm
              autoFocus={true}
              setState={setEditing}
              slug={slug}
              initialValue={message}
              uid={uid}
              id={id}
            />
          </div>
        ) : (
          <>
            <div className="img h-9 w-9 rounded-full overflow-hidden mr-3 flex-none">
              <img src={photoURL} />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="comment-content flex w-full mr-auto items-center justify-between">
                <div className="name font-bold text-sm first-letter:uppercase">
                  {displayName}
                </div>
                <div className="date text-xs text-gray-500 ">{timeAgo}</div>
              </div>
              <div className="message text-sm mb-3">{message}</div>
              <div className="buttons flex justify-end items-center">
                {auth.currentUser?.uid === uid && (
                  <>
                    <div className="delete  mr-2 cursor-pointer">
                      <TrashIcon
                        className="w-4 h-4"
                        onClick={() => setShowAlert(true)}
                      />
                    </div>
                    <div className="edit  mr-2 cursor-pointer">
                      <PencilSquareIcon
                        className="w-4 h-4"
                        onClick={handleEdit}
                      />
                    </div>
                  </>
                )}
                <div
                  className="reply mr-2 cursor-pointer"
                  onClick={handleReply}
                >
                  <ArrowUturnLeftIcon className="w-4 h-4" />
                </div>
                <div className="hearts flex items-center gap-px text-sm">
                  <div className="img">
                    <HeartButton docRef={commentRef} />
                  </div>
                  <div className="number w-2">{heartCount.toString()}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {replying && (
        <CommentForm
          autoFocus={true}
          setState={setReplying}
          slug={slug}
          parentId={id}
          uid={uid}
        />
      )}

      <div className="children flex">
        <button
          className={`w-4 relative before:absolute before:content-[""] before:bg-gray-600 before:w-px
         before:top-0 before:bottom-0 before:left-1/2 ${
           childrenHidden && "hidden"
         }
        `}
          onClick={() => setChildrenHidden((prev) => !prev)}
        />
        {childrenHidden ? (
          <button
            onClick={() => setChildrenHidden((prev) => !prev)}
            className="mt-1 ml-2 text-sm text-blue-500"
          >
            Show replies
          </button>
        ) : (
          <div className="grow">
            {childComments?.length !== 0 &&
              childComments?.map((comment) => {
                return (
                  <Comment
                    {...comment}
                    key={comment.id}
                    slug={slug}
                    comments={comments}
                    uid={uid}
                  />
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
