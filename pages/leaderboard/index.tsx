import React, { useState } from "react";
import {
  collectionGroup,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

type User = {
  username: string;
  points: string;
  slug: string;
};

type Props = {
  usernames: User[];
};

const User = ({ username, points, slug }: User) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-2 md:p-4">
      {username} {points}
    </div>
  );
};

const Leaderboard = ({ usernames }: Props) => {
  var count = 0;
  return (
    <div>
      <h1 className="mb-10 text-5xl font-bold pt-20 text-center">
        Leaderboard
      </h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="m-auto p-1.5 w-[60%] align-middle">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Points
                    </th>
                  </tr>
                </thead>
                {usernames.map((user) => {
                  count = count + 1;
                  return (
                    <tbody
                      key={user.username}
                      className="divide-y divide-gray-200"
                    >
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {count}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400 font-semibold whitespace-nowrap">
                          @{user.username}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {user.points}
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

export async function getServerSideProps() {
  // get user data
  const ref_users = collectionGroup(getFirestore(), "users");
  const leaderQuery = query(ref_users, orderBy("points", "desc"));

  const usernames = (await getDocs(leaderQuery)).docs.map((doc) => doc.data());

  return {
    props: { usernames },
  };
}

export async function getServerSideProps1() {
  // get user data
  const ref_users = collectionGroup(getFirestore(), "users");
  const leaderQuery = query(ref_users);

  const usernames = (await getDocs(leaderQuery)).docs.map((doc) => doc.data());

  return {
    props: { usernames },
  };
}
