//different categories

import React from "react";

const Categories = () => {
    return (
<aside  className="grow-[2]" aria-label="Sidebar">
      <ul className="space-y-2">
       
        <li>
            <a  className="top items-center p-20 text-base font-semibold  text-gray-900">
               <span className="text-2xl font pt-10 text-center">Categories</span>
            </a>
         </li>
         <li>
            <a href="#Markets" className="flex items-center p-5 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-200 dark:hover:bg-gray-190">
               <span className="flex-1 ml-3 whitespace-nowrap">Markets</span>
            </a>
         </li>

         <li>
            <a href="#DeFi" className="flex items-center p-5 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-200 dark:hover:bg-gray-190">
               <span className="flex-1 ml-3 whitespace-nowrap">DeFi</span>
            </a>
         </li>

         <li>
            <a href="#Gaming&Metaverse" className="flex items-center p-5 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:bg-gray-200 dark:hover:bg-gray-190">
                  <span className="flex-1 ml-3 whitespace-nowrap">Gaming and Metaverse</span>
            </a>
         </li>
         
      </ul>
</aside>
);
};

export default Categories;
