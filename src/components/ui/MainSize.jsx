import { useState } from "react";

const MainSize = ({ sizes, className, selectedSize,setSelectedSize }) => {

  const handleSizeClick = (size) => {
    if (size === selectedSize) {
      // If the selected size is clicked again, clear the selection
      setSelectedSize(null)
    } else {
      // Otherwise, set the new size
      setSelectedSize(size)
    }
  };

  return (
    <div className="flex gap-1 flex-wrap cursor-pointer">
      {sizes.map((size, index) => (
        <div
          key={index}
          className={`${className} ${selectedSize === size  ? "bg-black  text-white" : "bg-inputBackground text-black "
            } rounded-buttonRadius p-sizeSm lg:p-sizeLg `}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </div>
      ))}
    </div>
  );
};

export default MainSize;
