import Head from "next/head";
import Image from "next/image";
import NewPost from "../components/NewPost";
import CryptoFeed from "../components/NewPrices";
import Categories from "../components/Categories/Categories";
import NewsArticle from "../components/NewNews";
import { collectionGroup, onSnapshot, where } from "../lib/firebase";
import {
  getFirestore,
  query,
  orderBy,
  limit,
  getDocs,
  postToJSON,
} from "../lib/firebase";
import PostList from "../components/Posts";
import { useEffect, useState } from "react";

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
  // posts: Post[];
};

const LIMIT = 10;

const HomePage = ({ articles, price_feed }: Props) => {
  const [category, setCategory] = useState("all");
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    const postRef = collectionGroup(getFirestore(), "posts");
    const postsQuery =
      category !== "all"
        ? query(
            postRef,
            where("category", "==", category),
            orderBy("createdAt", "desc"),
            limit(LIMIT)
          )
        : query(postRef, orderBy("createdAt", "desc"), limit(LIMIT));
    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const postSnapshot = querySnapshot.docs;
      const data = postSnapshot.map(postToJSON);
      const postlist: any[] = [];
      data.forEach((doc) => {
        postlist.push(doc);
      });
      setPosts(postlist);
    });
    // const snapshot = (await getDocs(postsQuery)).docs.map(postToJSON);
    // const postlist: Post[] = [];
    // snapshot.forEach((doc) => {
    //   postlist.push(doc);
    // });
    // setPosts(postlist);
    // getPosts();
  }, [category]);

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

      <div className="flex justify-between">
        {/* Left Side bar */}
        <div className="mt-20 grow-[1]">
          <Categories category={category} setCategory={setCategory} />
        </div>
        <div className="border border-x-gray-300 grow-[6.5]">
          <h1 className="mb-10 text-5xl font-bold pt-20 text-center">
            Welcome to Connexa!
          </h1>
          <NewPost />
          <PostList posts={posts} />
        </div>
        {/* Right side bar */}
        <div className="pl-8 mt-20 w-[30rem]">
          <a className="top p-4 font-semibold text-2xl text-gray-600 text-center mb-1 leading-none">
            Trending News
          </a>
          <div>
            <NewsArticle articles={articles} />
          </div>
          <br></br>
          <a className="top p-4 font-semibold text-2xl text-gray-600 text-center mb-1 leading-none">
            Prices
          </a>
          <div>
            <CryptoFeed cryptocurrencies={price_feed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  // get post data
  // const postRef = collectionGroup(getFirestore(), "posts");
  // const postsQuery = query(postRef, orderBy("createdAt", "desc"), limit(LIMIT));
  // const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  // get articles data
  const articleRef = collectionGroup(getFirestore(), "news");
  const articlesQuery = query(articleRef);
  const articles = (await getDocs(articlesQuery)).docs.map((doc) => doc.data());

  // get price data
  const ref_price = collectionGroup(getFirestore(), "prices");
  const priceQuery = query(ref_price);
  const price_feed = (await getDocs(priceQuery)).docs.map((doc) => doc.data());

  return {
    props: { articles, price_feed },
  };
}
