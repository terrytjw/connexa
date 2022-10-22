import Head from "next/head";
import Image from "next/image";
import NewPost from "../components/NewPost";
import CryptoFeed from "../components/NewPrices";
import Categories from "../components/Categories/Categories";
import NewsArticle from "../components/NewNews";
import { collectionGroup } from "firebase/firestore";
import {
  getFirestore,
  query,
  orderBy,
  limit,
  getDocs,
  postToJSON,
} from "../lib/firebase";
import PostList from "../components/Posts";

type Article = {
  Date: string;
  Link: string;
  Time: string;
  Title: string;
  slug: string;
};

type Crypto = {
  Token: string;
  Price: string;
  Change: string;
  slug: string;
};

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
  articles: Article[];
  price_feed: Crypto[];
  posts: Post[];
};

const LIMIT = 2;

const HomePage = ({ posts, articles, price_feed }: Props) => {
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
        {/* Left Side bar */}
        <div className="grow-[2]">
          <Categories />
        </div>
        <div className="border border-x-gray-300 grow-[5.5]">
          <h1 className="mb-10 text-5xl font-bold pt-20 text-center">
            Welcome to Connexa!
          </h1>
          <NewPost />
          <PostList posts={posts} />
        </div>
        {/* Right side bar */}
        <div className="grow-[2.5]">
          <a className="top p-4 text-red-500 font-semibold text-2xl text-center mb-1 leading-none">
            Trending News
          </a>
          <div className="grow-[2.5]">
            <NewsArticle articles={articles} />
          </div>
          <br></br>
          <a className="top p-4 text-red-500 font-semibold text-2xl text-center mb-1 leading-none">
            Price Action
          </a>
          <div className="grow-[2.5]">
            <CryptoFeed cryptocurrencies={price_feed} />
          </div>
        </div>
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

export async function getServerSideProps() {
  // get post data
  const postRef = collectionGroup(getFirestore(), "posts");
  const postsQuery = query(postRef, orderBy("createdAt", "desc"), limit(LIMIT));
  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  // get articles data
  const articleRef = collectionGroup(getFirestore(), "news");
  const articlesQuery = query(articleRef);
  const articles = (await getDocs(articlesQuery)).docs.map((doc) => doc.data());

  // get price data
  const ref_price = collectionGroup(getFirestore(), "prices");
  const priceQuery = query(ref_price);
  const price_feed = (await getDocs(priceQuery)).docs.map((doc) => doc.data());

  return {
    props: { posts, articles, price_feed },
  };
}
