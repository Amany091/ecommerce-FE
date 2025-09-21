import { useState } from "react";

const MainSize = ({ className, setFilter }) => {
  const [selectedSize, setSelectedSize] = useState('')

  const handleSizeClick = (size) => {
    if (size === selectedSize) {
      // If the selected size is clicked again, clear the selection
      setSelectedSize(null)
    } else {
      // Otherwise, set the new size
      setFilter("size", size)
      setSelectedSize(size)
    }
  };
  const sizes=["XX-Small", "X-Small", "Small", "Medium", "Large", "X-large", "XX-Large"];

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
