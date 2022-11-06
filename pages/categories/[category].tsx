import {
  collectionGroup,
  getFirestore,
  query,
  orderBy,
  getDocs,
  limit,
  postToJSON,
  where,
} from "../../lib/firebase";
import { GetServerSideProps } from "next";
import React from "react";
import PostList from "../../components/Posts";

const LIMIT = 2;

type Post = {
  questionTitle: string;
  content: string;
  imageURL: string;
  heartCount: number;
  photoURL: string;
  username: string;
  createdAt: number;
  slug: string;
  uid: string;
  displayName: string;
  category: string;
};

type Props = {
  posts: Post[];
};

const CategoryPage = ({ posts }: Props) => {
  return (
    <div>
      <PostList posts={posts} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const { category } = urlQuery;
  const catRef = collectionGroup(getFirestore(), "posts");
  const catQuery = query(
    catRef,
    where("category", "==", category),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );
  const posts = (await getDocs(catQuery)).docs.map(postToJSON);

  if ("notFound" in posts) {
    return { notFound: true };
  }

  return {
    props: { posts },
  };
};

export default CategoryPage;
