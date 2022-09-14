import { GetServerSideProps } from "next";
import React from "react";
import Image from "next/image";
import {
  collection,
  getDocs,
  getFirestore,
  getUserWithUsername,
  limit,
  orderBy,
  postToJSON,
  query,
  where,
} from "../../lib/firebase";
import TabGroup from "../../components/TabGroup";
import { User } from "../../types";

type UserProfilePageProps = {
  user: User;
  posts: any;
};
const UserProfilePage = ({ user, posts }: UserProfilePageProps) => {
  const { photoURL, username, displayName } = user;
  return (
    <div className="bg-slate-200 h-screen w-screen">
      <div className="m-auto flex flex-wrap justify-around max-w-7xl">
        <div className="relative mt-28 w-[23rem]">
          <div className="absolute top-[-4.5rem] left-[50%] translate-x-[-50%]">
            <Image
              className="rounded-full"
              src={photoURL}
              alt="Profile picture"
              width={200}
              height={200}
            />
          </div>

          <div className="flex flex-col justify-center text-center p-4 h-[35rem] bg-white border rounded-xl">
            <p className="mb-1 text-4xl font-bold">{displayName}</p>
            <p className="mb-4 text-gray-400">@{username}</p>
            <div className="mb-4 h-[10rem] bg-black text-white p-4 rounded">
              Rewards section
            </div>
            <button className="mx-12 p-1 font-medium border border-black rounded-3xl hover:bg-black hover:text-white transition-all">
              Edit profile
            </button>
          </div>
        </div>

        <TabGroup />
      </div>
    </div>
  );
};

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async ({
  query: urlQuery,
}) => {
  const { username } = urlQuery;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();

    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
};
