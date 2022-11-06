// the post page bound to a specific username
import { getDoc, firestore, getUserWithUsername } from "../../lib/firebase";
import { GetServerSideProps } from "next";
import React from "react";
import { getUserProfileData } from "../api/getUserProfile/[username]";
import { User } from "../../types";

type PostPageProps = {
  user: User;
  posts: any;
  comments: any;
  userDoc: any;
};
const PostPage = ({ userDoc }: PostPageProps) => {
  console.log(userDoc);
  return <div>PostPage</div>;
};

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const { username, slug } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  // const postPath = "users/" + username + "/posts/" + slug;
  // const postDoc = await getDoc(firestore, postPath);

  return {
    props: { userDoc },
  };
};

export default PostPage;
