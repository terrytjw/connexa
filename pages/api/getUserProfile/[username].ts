// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// A way to easily create BE API
// Only executes on the server, will not add to JS bundle size

import { NextApiRequest, NextApiResponse } from "next";
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
} from "../../../lib/firebase";

export const getUserProfileData = async (username: any) => {
  const userDoc = await getUserWithUsername(username);

  let user;
  let posts;

  if (!userDoc) {
    return {
      notFound: true,
    };
  } else {
    // get the user data object
    user = userDoc.data();

    const postsQuery = query(
      collection(getFirestore(), userDoc.ref.path, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    return { user, posts };
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;
  const userProfileData = await getUserProfileData(username);

  res.status(200).json(userProfileData);
};
