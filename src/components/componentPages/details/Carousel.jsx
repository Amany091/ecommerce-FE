import React, { useState } from "react";

const Carousel = ({ images = [] , isLoading}) => {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-3 h-fit  ">
      {isLoading ? <p>Loading Image...</p> : (
        <img
        src={images[active]}
        alt={`image${active}`}
        className=" rounded p-10 border border-slate-300/50 object-cover min-w-[30%] max-w-[80%] h-[50%] bg-slate-300/10"
        loading="lazy"
      />
      )}
      <div className="flex gap-2 ">
        {images.map((image, index) => (
          <div
            className={` ${active === index ? "opacity-50 " : ""
              } cursor-pointer flex    mb-10 `}
            key={index}
          >
            
            <img
              src={image}
              className=" object-cover w-12 h-12 "
              alt={`image${index}`}
              loading="lazy"
              onClick={() => setActive(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
