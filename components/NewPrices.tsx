import { useEffect, useState } from "react";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../lib/firebase";

type Crypto = {
  Token: string;
  Price: string;
  Change: string;
  slug: string;
};

type Props = {
  cryptocurrencies: Crypto[];
};

const CryptoFeed = ({ cryptocurrencies }: Props) => {
  return (
    <div>
      {cryptocurrencies.map((crypto: Crypto) => {
        return <Crypto {...crypto} key={crypto.slug} />;
      })}
    </div>
  );
};
const Crypto = ({ Token, Price, Change, slug }: Crypto) => {
  const [loading, setLoading] = useState(false);

  const changeVal = parseFloat(Change.substring(0, Change.length - 1));

  return (
    <div className="p-2 md:p-4">
      <h3 className="font-bold text-lg">{Token}</h3>
      <h4>
        <span className="text-lg">{Price}</span>
        <span
          className={`ml-2 p-1 border ${
            changeVal > 0
              ? `bg-green-100 text-green-600 border-green-600`
              : `bg-red-100 text-red-600 border-red-600`
          } rounded`}
        >
          {changeVal > 0 && <span>+</span>}
          {changeVal}%
        </span>{" "}
      </h4>
    </div>
  );
};

export default CryptoFeed;
