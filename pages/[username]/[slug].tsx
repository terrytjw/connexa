// the post page bound to a specific username
import {
  getDoc,
  firestore,
  getUserWithUsername,
  doc,
  getPostWithUsernameAndSlug,
} from "../../lib/firebase";
import { GetServerSideProps } from "next";
import React from "react";
import PostList from "../../components/Posts";
import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

type PostPageProps = {
  post: any;
};

const PostPage = ({ post }: PostPageProps) => {
  const test = post.post;
  const singlepost = [];
  singlepost.push(test);
  console.log("SinglePOST", singlepost);
  return (
    <div className="w-full flex p-10 justify-around relative">
      <div className="absolute top-10 left-10 cursor-pointer transition-all hover:-translate-x-1">
        <Link href="/">
          <div className="flex gap-2 items-center">
            <ArrowUturnLeftIcon className="w-5 h-5" />
            Return to Home
          </div>
        </Link>
      </div>
      <div className="w-3/5">
        <PostList posts={singlepost} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const { username, slug } = urlQuery;

  const post = await getPostWithUsernameAndSlug(username, slug);

  return {
    props: { post },
  };
};

export default PostPage;
