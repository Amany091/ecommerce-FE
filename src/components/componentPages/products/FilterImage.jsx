import React, { useState } from 'react'
import filterImage from "../../../assets/images/filter.png"


export default function FilterImage({setIsFilterOpen, isFilterOpen}) {    
  return (
    <div className="flex items-center justify-between mb-3 px-2 gap-6">
      <img
        src={filterImage}
        alt="filter-icon"
        className={"cursor-pointer md:hidden"}
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        width="32"
        height="32"
      />
    </div>
  );
}
