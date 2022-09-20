import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
import NewPost from "../components/NewPost";

const HomePage = () => {
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
