import { useEffect, useState } from "react";
import img from "../public/assets/images/postphoto.jpg";
import Image from "next/image";

const CommentForm = ({ autoFocus, setReplying }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setComment("");
  };

  return (
    <div className="flex items-center p-3 bg-gray-100 rounded-xl ml-4 mt-1">
      <div className="img w-9 h-9 rounded-full overflow-hidden mr-3">
        <Image src={img} />
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
