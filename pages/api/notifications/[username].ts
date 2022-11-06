import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { notificationToJSON } from "../../../lib/firebase";
import { getUidFromUsername } from "../../../lib/getUidFromUsername";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const username = req.query.username;
  const requestMethod = req.method;

  // console.log("username -> ", username);
  // console.log("requestMethod -> ", requestMethod);

  // @ts-ignore
  const uid = await getUidFromUsername(username);

  if (uid) {
    try {
      if (req.method === "POST") {
        // post logic when a like, comment and/or reply is made
        // await db
        //   .collection("entries")
        //   .doc(id)
        //   .update({
        //     ...req.body,
        //     updated: new Date().toISOString(),
        //   });
      } else if (req.method === "GET") {
        const notificationRef = collection(
          getFirestore(),
          "users",
          uid,
          "notifications"
        );
        const notifications = (await getDocs(notificationRef)).docs.map(
          notificationToJSON
        );

        res.status(200).json(notifications);
      } else if (req.method === "DELETE") {
        // delete logic when a notification is to be deleted
        // await db.collection("entries").doc(id).delete();
      }
      res.status(200).end();
    } catch (e) {
      res.status(400).end();
    }
  }
};
