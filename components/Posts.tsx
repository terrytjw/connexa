import Image from "next/image";
import img from "../public/assets/images/postphoto.jpg";
// import ethimg from "../public/assets/images/eth.jpg";
import {
  BookmarkIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  BellIcon,
  // ArrowUturnLeftIcon,
  // HeartIcon,
} from "@heroicons/react/24/outline";
// import { comments } from "../data/commentData";
import Comment from "./Comment";
import { useState } from "react";
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  auth,
  Timestamp,
  DocumentSnapshot,
} from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import CommentForm from "./CommentForm";
import HeartButton from "./HeartButton";
import toast from "react-hot-toast";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

type Post = {
  questionTitle: string;
  content: string;
  imageURL: string;
  heartCount: number;
  username: string;
  displayName: string;
  photoURL: string;
  createdAt: number;
  slug: string;
  uid: string;
};

type Props = {
  posts: Post[];
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

const PostList = ({ posts }: Props) => {
  return (
    <div className="m-auto mt-16 flex flex-col w-11/12 lg:w-5/12">
      {posts.map((post: Post) => {
        return <Post {...post} key={post.slug} />;
      })}
    </div>
  );
};

const Post = ({
  questionTitle,
  content,
  imageURL,
  heartCount,
  photoURL,
  username,
  createdAt,
  slug,
  uid,
}: Post) => {
  const [replying, setReplying] = useState(false);
  const [hearts, setHearts] = useState(heartCount);

  const ref = collection(
    getFirestore(),
    "users",
    uid,
    "posts",
    slug,
    "comments"
  );

  const postRef = doc(getFirestore(), "users", uid, "posts", slug);

  const postQuery = ref && query(ref, orderBy("createdAt", "desc"));

  onSnapshot(postRef, (doc: DocumentSnapshot) => {
    setHearts(doc.data()?.heartCount);
  });

  const [querySnapshot] = useCollection(postQuery);

  const comments2 = querySnapshot?.docs.map((doc) => {
    return { ...doc.data(), id: doc.id } as CommentType;
  });

  let timeAgo: string;

  const datePosted = new Date(createdAt);
  const minutesAgo = Math.floor(
    (new Date().getTime() - datePosted.getTime()) / 1000 / 60
  );
  const hoursAgo = Math.floor(
    (new Date().getTime() - datePosted.getTime()) / 1000 / 60 / 60
  );

  timeAgo =
    minutesAgo < 60
      ? `${minutesAgo} min ago`
      : hoursAgo < 24
      ? `${hoursAgo}h ago`
      : dateFormatter.format(datePosted);

  const parentComments = comments2?.filter((comment) => {
    return comment.parentId === null;
  });

  const handleReply = () => {
    if (!auth.currentUser) {
      toast.error("Please login to write a comment!");
      return;
    }
    setReplying((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full h-max border border-black rounded-2xl p-5 mb-8">
      <div className="top-row flex items-center justify-between mb-2">
        <div className="profile-pic w-10 h-10 overflow-hidden rounded-full mr-3">
          <img src={photoURL} />
        </div>
        <div className="flex flex-col mr-auto">
          <div className="text-lg font-semibold first-letter:uppercase ">
            {username}
          </div>
          <div className="text-xs text-gray-400">{timeAgo}</div>
        </div>
        <div className="tags flex gap-2">
          <div className="p-2 rounded border bg-purple-200">Tag 1</div>
          <div className="p-2 rounded border bg-gray-300">Tag 2</div>
        </div>
        <div className="save-button rounded-full p-3 bg-blue-100 ml-3">
          <BookmarkIcon className="w-5 h-5" />
        </div>
      </div>
      <div className="title font-bold text-lg mb-1">{questionTitle}</div>
      <div className="content mb-3">{content}</div>
      {imageURL && (
        <div className="picture rounded overflow-hidden mb-3 w-max max-w-full">
          <img src={imageURL} />
        </div>
      )}
      <div className="options flex text-sm items-center justify-between mb-3">
        <div className="likes-dislikes flex p-3 w-14 rounded-3xl bg-gray-100 gap-2 mr-2 items-center">
          {/* <div className="likes flex gap-1">
            <div className="img">
              <HandThumbUpIcon className="w-5 h-5" />
            </div>
            <div className="number">4</div>
          </div>
          <div className="dislikes flex gap-1">
            <div className="img">
              <HandThumbDownIcon className="w-5 h-5" />
            </div>
            <div className="number">1</div>
          </div> */}
          <HeartButton docRef={postRef} />
          {hearts.toString()}
        </div>
        <div
          className="comments flex items-center rounded-3xl bg-gray-100 p-3 gap-1 mr-2 cursor-pointer"
          onClick={handleReply}
        >
          <div className="img">
            <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
          </div>
          <div className="number">{comments2?.length}</div>
        </div>
        <div className="views items-center p-3 rounded-3xl bg-gray-100 gap-1 mr-auto hidden lg:flex">
          <div className="img">
            <EyeIcon className="w-5 h-5" />
          </div>
          <div className="number">20</div>
        </div>
        <div className="follow-post flex items-center p-3 rounded-3xl bg-gray-100 gap-1">
          <div className="img">
            <BellIcon className="w-5 h-5" />
          </div>
          <div className="text">Follow this post</div>
        </div>
      </div>
      {replying && (
        <CommentForm
          autoFocus={true}
          setState={setReplying}
          slug={slug}
          uid={uid}
        />
      )}
      <div className="comments-section flex flex-col">
        {parentComments?.length !== 0
          ? parentComments?.map((comment) => {
              return (
                <Comment
                  {...comment}
                  key={comment.id}
                  slug={slug}
                  comments={comments2}
                  uid={uid}
                />
              );
            })
          : replying || <div>Be the first to comment!</div>}
      </div>
    </div>
  );
};

export default PostList;
