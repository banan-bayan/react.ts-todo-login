import React from "react";

interface ButtonProps {
  clickHandler: (id?: number) => void;
  children: React.ReactNode;
  className?: string;
  id?: number;
}
const Button = ({
  clickHandler,
  children,
  className,
  id,
}: ButtonProps) => {

  return (
    <>
      <button
        className={className}
        onClick={() => clickHandler(id)}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
