import img from "../public/assets/images/postphoto.jpg";
import Image from "next/image";
import {
  ArrowUturnLeftIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { comments } from "../data/commentData";
import { useState } from "react";
import CommentForm from "./CommentForm";
import { StringIterator } from "lodash";

type CommentProp = {
  id: string;
  message: string;
  parentId: number | null;
  createdAt: Date;
  heartCount: number;
  displayName: string;
  photoURL: string;
  slug: string;
  key: string;
  uid: string;
  comments: CommentType[] | undefined;
};

type CommentType = {
  id: string;
  message: string;
  parentId: number | null;
  createdAt: Date;
  heartCount: number;
  displayName: string;
  photoURL: string;
  slug: string;
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
  key,
  comments,
  uid,
}: CommentProp) => {
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const [childrenHidden, setChildrenHidden] = useState(false);
  const [replying, setReplying] = useState(false);

  const childComments = comments?.filter((comment) => {
    return comment.parentId?.toString() === id;
  });

  return (
    <>
      <div className="comment flex items-center p-3 bg-gray-100 justify-between rounded-xl mt-3">
        <div className="img w-9 h-9 rounded-full overflow-hidden mr-3">
          <img src={photoURL || undefined} />
        </div>
        <div className="comment-content flex flex-col mr-auto">
          <div className="name font-bold text-sm first-letter:uppercase">
            {displayName}
          </div>
          <div className="message text-sm">{message}</div>
        </div>
        <div className="flex flex-col gap-1 justify-between ">
          <div className="date text-xs self-end text-gray-500">6h ago</div>
          <div className="buttons flex">
            <div className="delete p-2 bg-gray-200 rounded-full mr-2 cursor-pointer">
              <TrashIcon className="w-4 h-4" />
            </div>
            <div className="edit p-2 bg-gray-200 rounded-full mr-2 cursor-pointer">
              <PencilSquareIcon className="w-4 h-4" />
            </div>
            <div
              className="reply p-2 bg-gray-200 rounded-full mr-2 cursor-pointer"
              onClick={() => setReplying((prev) => !prev)}
            >
              <ArrowUturnLeftIcon className="w-4 h-4" />
            </div>
            <div className="hearts flex items-center gap-1 p-2 rounded-full bg-gray-200 cursor-pointer text-sm">
              <div className="img">
                <HeartIcon className="w-4 h-4" />
              </div>
              <div className="number">{heartCount.toString()}</div>
            </div>
          </div>
        </div>
      </div>
      {replying && (
        <CommentForm
          autoFocus={true}
          setReplying={setReplying}
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
