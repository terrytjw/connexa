import { Fragment, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserContext } from "../lib/Context";
import {
  auth,
  doc,
  getFirestore,
  googleAuthProvider,
  signInWithPopup,
  signOut,
} from "../lib/firebase";
import UsernameForm from "./UsernameForm";
import Loader from "./Loader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { user, username, isAuthLoading } = useContext(UserContext);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider).catch((error) => {
      console.error(error);
    });
  };

  const signOutGoogle = () => {
    signOut(auth);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  <p className="block h-8 w-auto lg:hidden text-black font-bold text-2xl">
                    connexa
                  </p>
                  <p className="hidden h-8 w-auto lg:block text-black font-bold text-2xl">
                    connexa
                  </p>
                  {/* <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end"></div>
                {/* Searchbar */}
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border-[1px] border-gray-400 py-2 pl-10 pr-3 leading-5 text-gray-400 placeholder-gray-400 focus:border-black focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-black hover:text-white transition-all">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a
                        href="#"
                        className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-all"
                      >
                        Leaderboard
                      </a>
                      <a
                        href="#"
                        className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-all"
                      >
                        Categories
                      </a>
                    </div>
                  </div>

                  {/* Profile dropdown */}
                  {user ? (
                    !username ? (
                      <UsernameForm />
                    ) : (
                      <>
                        <button
                          type="button"
                          className="mx-4 flex-shrink-0 rounded-full p-1 text-black hover:bg-black hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <Menu as="div" className="relative ml-4 flex-shrink-0">
                          <div>
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm text-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-xl"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition-all rounded"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition-all rounded"
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={signOutGoogle}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block w-full text-left px-4 py-2 text-sm text-black hover:bg-black hover:text-white transition-all rounded"
                                    )}
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </>
                    )
                  ) : (
                    <button
                      onClick={signInWithGoogle}
                      className="ml-4 rounded-md px-3 py-2 text-sm font-medium text-black border-gray-500 border-[1px] hover:text-white hover:bg-black transition-all"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
              >
                Team
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
              >
                Projects
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
              >
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-700 pt-4 pb-3">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-xl"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full p-1 text-black hover:bg-black hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-black hover:bg-black hover:text-white transition-all"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
