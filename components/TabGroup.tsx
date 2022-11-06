import { useState } from "react";
import { Tab } from "@headlessui/react";
import PostList from "./Posts";

type TabGroupProps = {
  posts: any;
  comments: any;
};

const TabGroup = ({ posts, comments }: TabGroupProps) => {
  let [categories] = useState({
    Posts: posts,
    Comments: comments,
  });

  return (
    <div className="w-full max-w-3xl px-8 mt-8 sm:mt-12 lg:mt-28">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-white">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2 text-sm font-medium leading-5 text-white
                  focus:outline-none transition-all
                  ${
                    selected
                      ? "bg-black"
                      : "text-black hover:bg-gray-300 hover:text-black"
                  }`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={`rounded-xl bg-white p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`}
            >
              <PostList posts={posts} />
              {/* <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={`absolute inset-0 rounded-md ring-blue-400 focus:z-10 focus:outline-none focus:ring-2`}
                    />
                  </li>
                ))}
                </ul> */}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabGroup;
