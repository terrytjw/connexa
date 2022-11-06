//different categories

import React, { useState } from "react";

type Props = {
  category: string;
  setCategory: any;
  setNumberPosts: any;
};

const Categories = ({ category, setCategory, setNumberPosts }: Props) => {
  return (
    <aside className="px-4" aria-label="Sidebar">
      <h1 className="ml-2 mb-2 text-2xl text-gray-600 font-semibold">
        Categories
      </h1>
      <ul className="space-y-2">
        <li
          onClick={() => {
            setNumberPosts(1);
            setCategory("all");
          }}
        >
          <a
            href="#Markets"
            className={`py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-black hover:text-white  transition-all
              ${category == "all" && "bg-black text-white "}
            `}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">All</span>
          </a>
        </li>
        <li
          onClick={() => {
            setNumberPosts(1);
            setCategory("general");
          }}
        >
          <a
            href="#Markets"
            className={`py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg hover:bg-black hover:text-white  transition-all
              ${category == "general" && "bg-black text-white "}
            `}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">General</span>
          </a>
        </li>
        <li
          onClick={() => {
            setNumberPosts(1);
            setCategory("investing");
          }}
        >
          <a
            href="#investing"
            className={`py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg  hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all
             ${category == "investing" && "bg-black text-white "}
            `}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">
              Crypto Investing
            </span>
          </a>
        </li>

        <li
          onClick={() => {
            setNumberPosts(1);
            setCategory("defi");
          }}
        >
          <a
            href="#DeFi"
            className={`py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg  hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all
            ${category == "defi" && "bg-black text-white "}
            `}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">DeFi</span>
          </a>
        </li>
        <li
          onClick={() => {
            setCategory("nft");
            setNumberPosts(1);
          }}
        >
          <a
            href="#investing"
            className={`py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg  hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all
             ${category == "nft" && "bg-black text-white "}
            `}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">NFTs</span>
          </a>
        </li>

        <li onClick={() => setCategory("metaverse")}>
          <a
            href="#gaming"
            className={`py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg  hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all
             ${category == "metaverse" && "bg-black text-white "}
            `}
          >
            <span className="flex-1 ml-3 whitespace-nowrap">
              Gaming and Metaverse
            </span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Categories;
