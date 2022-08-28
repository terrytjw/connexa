import React, { MouseEventHandler } from "react";

type ButtonProps = {
  children: string;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-700 hover:bg-blue-500 transition-all border-none text-white px-4 py-2 flex items-center text-center justify-center no-underline cursor-pointer rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
