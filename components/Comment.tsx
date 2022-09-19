import img from "../public/assets/images/postphoto.jpg";
import Image from "next/image";
import { ArrowUturnLeftIcon, HeartIcon } from "@heroicons/react/24/outline";
import { comments } from "../data/commentData";
import { useState } from "react";

interface CommentProp {
  id: Number;
  body: String;
  isRootComment: Boolean;
  parentId: Number;
  createdAt: Number;
  likes: Number;
  fullName: String;
}

const Comment = ({
  id,
  body,
  isRootComment,
  parentId,
  createdAt,
  likes,
  fullName,
}: CommentProp) => {
  const [childrenHidden, setChildrenHidden] = useState(false);

  const childComments = comments.filter((comment) => {
    return comment.parentId === id;
  });
  return (
    <>
      <div className="comment flex items-center p-3 bg-gray-100 justify-between rounded-xl mt-3">
        <div className="img w-9 h-9 rounded-full overflow-hidden mr-3">
          <Image src={img} />
        </div>
        <div className="comment-content flex flex-col mr-auto">
          <div className="name font-bold text-sm">{fullName}</div>
          <div className="message text-sm">{body}</div>
        </div>
        <div className="reply p-2 bg-gray-200 rounded-full mr-2">
          <ArrowUturnLeftIcon className="w-5 h-5" />
        </div>
        <div className="hearts flex items-center gap-1 p-2 rounded-full bg-gray-200">
          <div className="img">
            <HeartIcon className="w-5 h-5" />
          </div>
          <div className="number">{likes.toString()}</div>
        </div>
      </div>

      <div className="children flex">
        <button
          className={`w-4 relative before:absolute before:content-[""] before:bg-gray-600 before:w-px
         before:top-0 before:bottom-0 before:left-1/2 ${
           childrenHidden && "hidden"
         }
        `}
          onClick={() => setChildrenHidden((prev) => !prev)}
        ></button>
        {childrenHidden ? (
          <button
            onClick={() => setChildrenHidden((prev) => !prev)}
            className="mt-1 ml-2 text-sm text-blue-500"
          >
            Show replies
          </button>
        ) : (
          <div className="grow">
            {childComments.length !== 0 &&
              childComments.map((comment) => {
                return <Comment {...comment} />;
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
