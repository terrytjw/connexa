import { useEffect, useState } from "react";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth } from "../lib/firebase";
import * as FaIcons from 'react-icons/fa' 


type Crypto = {
    Token: string;
    Price: string;
    Change: string;
    slug: string
  };
  
type Props = {
    cryptocurrencies: Crypto[];
  };

const CryptoFeed = ({ cryptocurrencies }: Props) => {
    return (
      <div className="">
        {cryptocurrencies.map((crypto: Crypto ) => {
          return <Crypto {...crypto} key={crypto.slug} />;
        })}
      </div>
    );
  };
const Crypto = ({
    Token, 
    Price, 
    Change, 
    slug,
  }: Crypto) => {
    const [loading, setLoading] = useState(false);
  
  
    return (
      <div className="p-2 md:p-4">
    
    <h3 className=" mb-1 text-m leading-tight sm:leading-normal">
    {Token}, {Price}, {Change}
    </h3>
  </div>
  
    );
  };
  
export default CryptoFeed;