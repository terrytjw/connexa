import React from "react";

type ButtonProps = {
  children: string;
};
const Button = ({ children }: ButtonProps) => {
  return (
    <button className="bg-gray-500 hover:bg-gray-400 transition-all border-none text-white px-4 py-2 flex items-center text-center justify-center no-underline cursor-pointer rounded">
      {children}
    </button>
  );
};

export default Button;
