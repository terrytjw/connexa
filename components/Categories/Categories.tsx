//different categories

import React from "react";

const Categories = () => {
  return (
    <aside className="px-4" aria-label="Sidebar">
      <h1 className="ml-2 mb-2 text-2xl text-gray-600 font-semibold">
        Categories
      </h1>
      <ul className="space-y-2">
        <li>
          <a
            href="#Markets"
            className="py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all"
          >
            <span className="flex-1 ml-3 whitespace-nowrap">Markets</span>
          </a>
        </li>

        <li>
          <a
            href="#DeFi"
            className="py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all"
          >
            <span className="flex-1 ml-3 whitespace-nowrap">DeFi</span>
          </a>
        </li>

        <li>
          <a
            href="#Gaming&Metaverse"
            className="py-4 pr-2 flex items-center text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-black hover:text-white dark:hover:bg-gray-190 transition-all"
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
