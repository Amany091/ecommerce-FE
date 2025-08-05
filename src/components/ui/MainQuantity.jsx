import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const MainQuantity = ({ quantity, className }) => {
  return (
    <div
      className={`flex justify-evenly items-center gap-1 rounded-buttonRadius bg-inputBackground p-quantitySm lg:p-quantityLg flex-1`}
    >
      <FaPlus className="cursor-pointer" />
      <span>{quantity}</span>
      <FaMinus className="cursor-pointer" />
    </div>
  );
};

export default MainQuantity;
