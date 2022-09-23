import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
<<<<<<< Updated upstream
import Button from "../components/Button";
=======
import NewPost from "../components/NewPost";
import CryptoFeed from "../components/NewPrices";
import Categories from "../components/Categories/Categories"
import NewsArticle from "../components/NewNews"
import { collectionGroup } from "firebase/firestore";
import { getFirestore, query, orderBy, limit, getDocs, postToJSON } from "../lib/firebase";
>>>>>>> Stashed changes

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
  slug: string
};

type Props = {
  articles: Article[];
  crypto_feed: Crypto[];
};


export async function getServerSideProps() {
  const ref = collectionGroup(getFirestore(), "news");
  const articlesQuery = query(ref);
  const articles = (await getDocs(articlesQuery)).docs.map(doc => doc.data());


  const ref_price = collectionGroup(getFirestore(), "prices");
  const priceQuery = query(ref_price);
  const crypto_feed = (await getDocs(priceQuery)).docs.map(doc => doc.data());
  
  return {
    props: { articles, crypto_feed }, // will be passed to the page component as props
  };
}


const HomePage = ({articles, crypto_feed}: Props) => 
{
  return (
<<<<<<< Updated upstream
    <div className="bg-slate-200">
=======
    
    
    <div className="bg-[#faf5f8]">

      
>>>>>>> Stashed changes
      <Head>
        <title>Crypto Connect</title>
        <meta
          name="description"
          content="A forum for cryptocurrency enthusiasts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

<<<<<<< Updated upstream
      <div className="mt-16 h-screen">
        <h1 className="text-3xl font-serif font-bold pt-20 text-center">
          Welcome to Crypto Connect!
        </h1>
        <Button
          className="m-auto mt-6"
          onClick={() => toast.success("Hooray!")}
        >
          Trigger Toast
        </Button>
=======
      <div className="flex justify-between h-screen">
        <div><Categories/></div>

        <div className="border border-x-gray-300 grow-[5.5]">
          <h1 className="mb-10 text-5xl font-bold pt-20 text-center">
            Welcome to Connexa!
          </h1>
          <NewPost />
        </div>

        <div className="grow-[2.5]">

          <a className="top p-4 text-red-500 font-semibold text-2xl text-center mb-1 leading-none">
                Trending News
          </a>
        
        <div className="grow-[2.5]">
        <NewsArticle articles={articles}/>
        </div>
        <br></br>
        <a className="top p-4 text-red-500 font-semibold text-2xl text-center mb-1 leading-none">
                Price Action
          </a>
        
        <div className="grow-[2.5]">
        <CryptoFeed cryptocurrencies={crypto_feed}/>
        </div>
        
        </div>

>>>>>>> Stashed changes
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
