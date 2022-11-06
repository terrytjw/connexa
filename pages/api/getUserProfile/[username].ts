// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// A way to easily create BE API
// Only executes on the server, will not add to JS bundle size

import { NextApiRequest, NextApiResponse } from "next";
import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
  getUserWithUsername,
  limit,
  orderBy,
  postToJSON,
  query,
  where,
} from "../../../lib/firebase";

const POST_LIMIT = 5;
const COMMENT_LIMIT = 10;

export const getUserProfileData = async (username: any) => {
  const userDoc = await getUserWithUsername(username);

  let user;
  let posts;
  let comments;

  if (!userDoc) {
    return {
      notFound: true,
    };
  } else {
    // get the user data object
    user = userDoc.data();

    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      orderBy("createdAt", "desc"),
      limit(POST_LIMIT)
    );

    const commentsRef = collectionGroup(getFirestore(), "comments");
    const commentsQuery = query(
      commentsRef,
      where("username", "==", user.username),
      orderBy("createdAt", "desc"),
      limit(COMMENT_LIMIT)
    );

    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    comments = (await getDocs(commentsQuery)).docs.map(postToJSON);

    return { user, posts, comments };
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;
  const userProfileData = await getUserProfileData(username);

  res.status(200).json(userProfileData);
};
