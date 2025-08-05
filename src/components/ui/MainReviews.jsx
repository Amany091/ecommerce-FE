import React, { useMemo } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
const MainReviews = ({ rate, size = "md" }) => {
  const iconSize = useMemo(() => {
    if (size === "lg") return 20;
    if (size === "sm") return 10;
    return 15;
  }, [size]);
  return (
    <div style={{ gap: iconSize / 2 }} className="flex text-iconStarColor">
      {Array.from({ length: 6 }).map((_, index) => {
        if (index + 1 < rate) {
          return <FaStar key={index} size={iconSize} />;
        } else if (index + 1 - rate <= 0.5) {
          return <FaStarHalfAlt key={index} size={iconSize} />;
        } else {
          return <FaRegStar key={index} size={iconSize} />;
        }
      })}
    </div>
  );
};

export default MainReviews;
