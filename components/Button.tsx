import React, { MouseEventHandler } from "react";

type ButtonProps = {
  children: string;
  type?: "submit";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};
const Button = ({
  children,
  type,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${
        disabled ? `bg-gray-200 cursor-not-allowed` : `hover:bg-gray-600`
      }
            bg-black  transition-all border-none text-white 
              px-4 py-2 flex items-center text-center justify-center no-underline cursor-pointer 
              rounded
       ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
