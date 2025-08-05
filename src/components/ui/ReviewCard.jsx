import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import MainReviews from "./MainReviews";

const ReviewCard = ({name, comment, postDate, className}) => {
  return (
    <div className={`border border-slate-400/30 py-7 px-8 rounded-cardRadius  ${className}`}>
      <div className="flex px-2 justify-between">
        <MainReviews rate={5.5} />
        <BsThreeDots />
      </div>
      <div className="my-4 flex items-center gap-1 ">
        <p className="font-inter  text-lg font-bold">{ name}</p>
        <MdVerified className="text-iconVerifiedBackground" />
      </div>
      <p className="text-descriptionColor dark:text-slate-300">
        {comment}
      </p>
      <p className="text-descriptionColor mt-6 dark:text-white ">{ postDate}</p>
    </div>
  );
};

export default ReviewCard;
