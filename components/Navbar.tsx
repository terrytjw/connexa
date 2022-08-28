import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  const user = null;
  const username = null;
  return (
    <nav className="h-16 w-screen bg-white fixed top-0 py-0 px-10 z-99">
      <ul className="flex list-none m-0 p-0 items-center justify-between h-full">
        <li>
          <Link href="/">
            <a className="font-black tracking-widest py-1 px-2 border-2 border-gray-600 rounded hover:bg-gray-200 hover:border-gray-500 transition-all">
              HOME
            </a>
          </Link>
        </li>

        {username ? (
          <>
            <li>
              <Link href="/admin">Write Posts</Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoUrl}
                  width={100}
                  height={100}
                  alt="user's profile photo"
                />
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <Button onClick={() => {}}>Login</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
