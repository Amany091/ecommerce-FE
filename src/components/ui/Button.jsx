import React from "react";
import LoaderSpinner from "./LoaderSpinner";

const Button = ({ children, width, className, type, click, isLoading=false}) => {
  return (
    <button
      type={type}
      className={`p-buttonPadding bg-buttonBackground border-[2px] border-buttonBackground hover:bg-black/50 hover:text-inherit hover:border-[2px] hover:border-gray-300  text-white rounded-buttonRadius duration-200 font-inter ${className} `}
      onClick={click}
    >
      {isLoading ? <LoaderSpinner/> : children }
      {/* {children} */}
    </button>
  );
};

export default Button;
