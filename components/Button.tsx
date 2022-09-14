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
      className={`bg-black hover:bg-gray-600 transition-all border-none text-white 
              px-4 py-2 flex items-center text-center justify-center no-underline cursor-pointer 
              rounded ${disabled && `bg-gray-200`} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
