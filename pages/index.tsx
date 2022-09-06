import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
import Button from "../components/Button";

//test

const HomePage = () => {
  return (
    <div className="bg-slate-200">
      <Head>
        <title>Crypto Connect</title>
        <meta
          name="description"
          content="A forum for cryptocurrency enthusiasts"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
