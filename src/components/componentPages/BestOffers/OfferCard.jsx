import React from "react";

const OfferCard = ({ brand, discount, price, img }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg">
      <img
        src={img}
        alt={brand}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-2xl font-bold">{brand}</h3>
        {discount ? (
          <p className="text-orange-500 text-xl font-semibold mt-2">
            {discount} discount up
          </p>
        ) : (
          <p className="text-white text-xl font-semibold mt-2">from {price}</p>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
