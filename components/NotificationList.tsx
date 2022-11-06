/* This example requires Tailwind CSS v2.0+ */
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { dateFormatter } from "../lib/dateFormatter";

// const timeline = [
//   {
//     id: 1,
//     content: "Applied to",
//     target: "Front End Developer",
//     href: "#",
//     date: "Sep 20",
//     datetime: "2020-09-20",
//     icon: UserIcon,
//     iconBackground: "bg-gray-400",
//   },
//   {
//     id: 2,
//     content: "Advanced to phone screening by",
//     target: "Bethany Blake",
//     href: "#",
//     date: "Sep 22",
//     datetime: "2020-09-22",
//     icon: HandThumbUpIcon,
//     iconBackground: "bg-blue-500",
//   },
//   {
//     id: 3,
//     content: "Completed phone screening with",
//     target: "Martha Gardner",
//     href: "#",
//     date: "Sep 28",
//     datetime: "2020-09-28",
//     icon: CheckIcon,
//     iconBackground: "bg-green-500",
//   },
//   {
//     id: 4,
//     content: "Advanced to interview by",
//     target: "Bethany Blake",
//     href: "#",
//     date: "Sep 30",
//     datetime: "2020-09-30",
//     icon: HandThumbUpIcon,
//     iconBackground: "bg-blue-500",
//   },
//   {
//     id: 5,
//     content: "Completed interview with",
//     target: "Katherine Snyder",
//     href: "#",
//     date: "Oct 4",
//     datetime: "2020-10-04",
//     icon: CheckIcon,
//     iconBackground: "bg-green-500",
//   },
// ];

type NotificationListProps = {
  notifications: any;
};
const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <div className="top-16 w-full max-w-sm px-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                className="mx-4 flex-shrink-0 rounded-full p-1 text-black hover:bg-black hover:text-white transition-all`}
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute mt-5 px-4 -right-10 z-10 w-[25rem]">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative bg-white p-8">
                    {/* <button
                      type="button"
                      className="absolute top-2 right-1 lg:hidden mx-4 rounded-full p-1 text-black hover:bg-black hover:text-white transition-all focus:outline-none"
                    >
                      <span className="sr-only">Close notifications</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    <div className="flow-root">
                      <ul role="list" className="-mb-8">
                        {notifications &&
                          notifications.map((item: any, itemIdx: number) => (
                            <li key={item.createdAt}>
                              <div className="relative pb-8">
                                {/* divider */}
                                {itemIdx !== notifications.length - 1 ? (
                                  <span
                                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                ) : null}

                                <div className="relative flex space-x-3">
                                  <div className="flex min-w-0 flex-1 justify-between space-x-4">
                                    {item.content}
                                    <div className="whitespace-nowrap text-right text-sm text-black">
                                      <time dateTime={item.createdAt}>
                                        {dateFormatter(item.createdAt)}
                                      </time>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default NotificationList;
