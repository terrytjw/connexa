import { useEffect, useState } from "react";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../lib/firebase";

type Article = {
  Date: string;
  Link: string;
  Time: string;
  Title: string;
  slug: string;
};

type Props = {
  articles: Article[];
};

const NewsArticle = ({ articles }: Props) => {
  return (
    <div className="flex flex-col w-5 lg:w-8/12">
      {articles.map((article: Article) => {
        return <Article {...article} key={article.slug} />;
      })}
    </div>
  );
};

const Article = ({ Date, Link, Time, Title, slug }: Article) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-2 md:p-5">
      <h3 className="font-semibold mb-1 text-m leading-tight sm:leading-normal">
        <u>
          <a href={Link}>{Title}</a>
        </u>
      </h3>
      <div className="text-sm flex items-center">
        <span className="flex-1 ml-3 ">
          {Date}, {Time}
        </span>
      </div>
    </div>
  );
};

export default NewsArticle;
