import React from "react";

type UsernameProps = {
  username: string;
  isValid: boolean;
  loading: boolean;
};
const UsernameMessage = ({ username, isValid, loading }: UsernameProps) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p>That username is taken!</p>;
  } else {
    return <p className="h-6"></p>;
  }
};

export default UsernameMessage;
