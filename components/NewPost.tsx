import { Fragment, useState } from "react";
import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "./Button";

const NewPost = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(undefined);

  return !isExpanded ? (
    <div className="m-auto p-2 w-[80%] flex justify-between items-center bg-white rounded-lg border border-gray-300 shadow">
      <div className="ml-4 text-gray-500">What am I wondering today?</div>
      <Button className="w-20" onClick={() => setIsExpanded(true)}>
        Ask
      </Button>
    </div>
  ) : (
    <form action="#" className="relative m-auto w-[80%]">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow">
        <label htmlFor="title" className="sr-only">
          Question
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="p-4 block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:outline-none border-b-[1px] border-gray-300"
          placeholder="Ask a question"
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={5}
          name="description"
          id="description"
          className="p-4 block w-full resize-none border-0 placeholder-gray-500 focus:outline-none sm:text-sm"
          placeholder="Try to be as descriptive as possible..."
          defaultValue={""}
        />

        {/* Spacer element to match the height of the toolbar */}
        {/* <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div> */}

        <RadioGroup
          value={selectedCategory}
          onChange={setSelectedCategory}
          className="p-4"
        >
          <RadioGroup.Label className="">Pick a category</RadioGroup.Label>
          <div className="mt-2 flex flex-wrap gap-3">
            <RadioGroup.Option
              value="general"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-yellow-600 bg-yellow-100 border-yellow-500"
                      : "bg-white border-gray-400"
                  }
                    text-gray-500 border-[1px] hover:text-yellow-600 hover:bg-yellow-100 hover:border-yellow-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              General
            </RadioGroup.Option>
            <RadioGroup.Option
              value="investing"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-purple-600 bg-purple-100 border-purple-500"
                      : "bg-white border-gray-400"
                  }
                    text-gray-500 border-[1px] hover:text-purple-600 hover:bg-purple-100 hover:border-purple-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              Crypto Investing
            </RadioGroup.Option>
            <RadioGroup.Option
              value="defi"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-blue-600 bg-blue-100 border-blue-500"
                      : "bg-white border-gray-400"
                  }
                    text-gray-500 border-[1px] hover:text-blue-600 hover:bg-blue-100 hover:border-blue-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              DeFi
            </RadioGroup.Option>

            <RadioGroup.Option
              value="nft"
              className={({ active, checked }) =>
                `${active ? "" : ""}
                  ${
                    checked
                      ? "text-green-600 bg-green-100 border-green-500"
                      : "bg-white border-gray-400"
                  }
                   text-gray-500 border-[1px] hover:text-green-600 hover:bg-green-100 hover:border-green-500 transition-all relative flex cursor-pointer rounded-lg px-2 py-1 shadow-md focus:outline-none`
              }
            >
              NFTs
            </RadioGroup.Option>
          </div>
        </RadioGroup>

        <div className="m-4 flex justify-end gap-3">
          <button
            type="button"
            className="mr-auto group inline-flex items-center rounded-full p-2 text-gray-400"
          >
            <PaperClipIcon
              className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
              Attach a file
            </span>
          </button>
          <button
            className="items-center rounded-md border px-4 py-2 text-sm font-medium text-black hover:border-gray-700 transition-all focus:outline-none"
            onClick={() => setIsExpanded(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="items-center rounded-md border bg-black border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 transition-all focus:outline-none"
          >
            Ask
          </button>
        </div>
      </div>

      {/* <div className="absolute inset-x-px bottom-0">

        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon
                className="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="text-sm italic text-gray-500 group-hover:text-gray-600">
                Attach a file
              </span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Create
            </button>
          </div>
        </div>
      </div> */}
    </form>
  );
};

export default NewPost;
