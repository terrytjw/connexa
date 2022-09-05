import React from "react";
import {
  auth,
  googleAuthProvider,
  signInWithPopup,
  signOut,
} from "../lib/firebase";
import { useContext } from "react";
import { UserContext } from "../lib/Context";
import UsernameForm from "../components/UsernameForm";

const LoginPage = () => {
  const { user, username } = useContext(UserContext);

  const SignInButton = () => {
    const signInWithGoogle = async () => {
      await signInWithPopup(auth, googleAuthProvider);
    };

    return <button onClick={signInWithGoogle}>sign in w google</button>;
  };
  const SignOutButton = () => {
    const signOutGoogle = () => {
      signOut(auth);
    };
    return <button onClick={signOutGoogle}>sign out</button>;
  };

  return (
    <div className="mt-32 text-center">
      {user ? (
        <>
          {username || <UsernameForm />}
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

export default LoginPage;
