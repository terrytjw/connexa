import Link from "next/link";
import React from "react";
import Image from "next/image";
import Button from "./Button";

const Navbar = () => {
  const user = null;
  const username = null;
  return (
    <nav className="h-16 w-full bg-blue-700 fixed top-0 py-0 px-[10vw] z-99">
      <ul className="flex list-none m-0 p-0 items-center justify-evenly h-full">
        <li>
          <Link href="/">FEED</Link>
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
              <Button>Login</Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
