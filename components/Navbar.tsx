import Link from "next/link";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import {
  auth,
  googleAuthProvider,
  signInWithPopup,
  signOut,
} from "../lib/firebase";
import { UserContext } from "../lib/Context";
import UsernameForm from "./UsernameForm";
import useWindowDimensions from "../lib/useWindowDimensions";
import { slide as Menu } from "react-burger-menu";
import { NavbarCustomStyles } from "./NavbarCustomStyles";

const Navbar = () => {
  const { user, username } = useContext(UserContext);
  const { width } = useWindowDimensions();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(undefined);

  const SignInButton = () => {
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleAuthProvider);
    };

    return <Button onClick={signInWithGoogle}>Login</Button>;
  };

  const SignOutButton = () => {
    const signOutGoogle = () => {
      signOut(auth);
    };
    return <Button onClick={signOutGoogle}>sign out</Button>;
  };

  return (
    <>
      <nav className="h-16 w-screen bg-white fixed top-0 py-0 px-10 z-99">
        <ul className="flex list-none m-0 p-0 items-center justify-between h-full">
          <li>
            <Link href="/">
              <a className="font-black tracking-widest py-1 px-2 border-2 border-gray-600 rounded hover:bg-gray-200 hover:border-gray-500 transition-all">
                HOME
              </a>
            </Link>
          </li>

          {typeof window !== "undefined" && width && width > 767 ? (
            <>
              <li></li>
            </>
          ) : (
            <Menu styles={NavbarCustomStyles} slide right>
              <div>hi</div>
              <div>there</div>
              <div>alice</div>
            </Menu>
          )}

          {/* {user ? (
            username ? (
              <li>
                <Link href={`/${username}`}>
                  <Image
                    src={user?.photoUrl}
                    width={100}
                    height={100}
                    alt="user's profile photo"
                  />
                </Link>
                Profile Photo
                <SignOutButton />
              </li>
            ) : (
              <UsernameForm />
            )
          ) : (
            <li>
              <SignInButton />
            </li>
          )} */}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
