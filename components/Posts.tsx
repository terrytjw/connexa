import Image from "next/image";
import img from "../public/assets/images/postphoto.jpg";
import ethimg from "../public/assets/images/eth.jpg";
import {
  BookmarkIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  BellIcon,
  ArrowUturnLeftIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { comments } from "../data/commentData";
import Comment from "./Comment";

const PostList = ({ posts, limit }) => {
  posts.map((post) => {
    <Post post />;
  });
};

const Post = ({ post }) => {
  const parentComments = comments.filter((comment) => {
    return comment.isRootComment;
  });

  return (
    <div className="flex flex-col w-11/12 h-max border border-black rounded-2xl p-5 lg:w-5/12">
      <div className="top-row flex items-center justify-between mb-2">
        <div className="profile-pic w-10 h-10 overflow-hidden rounded-full mr-3">
          <Image src={img} />
        </div>
        <div className="flex flex-col mr-auto">
          <div className="">Full Name</div>
          <div className="text-xs text-gray-400">6h ago</div>
        </div>
        <div className="tags flex gap-2">
          <div className="p-2 rounded border bg-purple-200">Tag 1</div>
          <div className="p-2 rounded border bg-gray-300">Tag 2</div>
        </div>
        <div className="save-button rounded-full p-3 bg-blue-100 ml-3">
          <BookmarkIcon className="w-5 h-5" />
        </div>
      </div>
      <div className="content mb-3">Checkout this new coin!</div>
      <div className="picture rounded overflow-hidden mb-3 ">
        <Image src={ethimg} />
      </div>
      <div className="options flex text-sm items-center justify-between mb-3">
        <div className="likes-dislikes flex p-3 rounded-3xl bg-gray-100 gap-2 mr-2">
          <div className="likes flex gap-1">
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
          </div>
        </div>
        <div className="comments flex items-center rounded-3xl bg-gray-100 p-3 gap-1 mr-2">
          <div className="img">
            <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
          </div>
          <div className="number">6</div>
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
      <div className="comments-section flex flex-col">
        {parentComments.length !== 0 ? (
          parentComments.map((comment) => {
            return <Comment {...comment} key={comment.id} />;
          })
        ) : (
          <div>Be the first to comment!</div>
        )}
      </div>
    </div>
  );
};

export default Post;
