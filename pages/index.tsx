import Head from "next/head";
import Image from "next/image";
// import toast from "react-hot-toast";
import NewPost from "../components/NewPost";

import {
  collectionGroup,
  getFirestore,
  query,
  where,
  limit,
  getDocs,
  orderBy,
  postToJSON,
  onSnapshot,
} from "../lib/firebase";
import PostList from "../components/Posts";

// Number of posts to be shown
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
};

type Props = {
  posts: Post[];
};

export async function getServerSideProps() {
  const ref = collectionGroup(getFirestore(), "posts");
  const postsQuery = query(ref, orderBy("createdAt", "desc"), limit(LIMIT));

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  return {
    props: { posts }, // will be passed to the page component as props
  };
}

const HomePage = ({ posts }: Props) => {
  return (
    <div className="bg-[#faf5f8]">
      <Head>
        <title>Connexa</title>
        <meta
          name="description"
          content="Building a community of Web3 enthusiasts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between h-screen">
        <div className="grow-[2]">Left side bar</div>

        <div className="border border-x-gray-300 grow-[5.5]">
          <h1 className="mb-10 text-5xl font-bold pt-20 text-center">
            Welcome to Connexa!
          </h1>
          <NewPost />
          <div className="flex items-center justify-center ">
            <PostList posts={posts} />
          </div>
          ;
        </div>

        <div className="grow-[2.5]">Right side bar</div>
      </div>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
