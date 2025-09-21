import React, { useEffect, useRef, useState } from 'react'
import FilterProducts from './FilterProducts';

export default function FilterLayout({onFilterClick, filters, setFilters, isFilterOpen, setIsFilterOpen}) {
  const filterRef = useRef(null);

  // Handle click outside to close filter
  const handleClickOutside = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setIsFilterOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ isFilterOpen]);

  return (
    <div>
      <FilterProducts
        className="lg:block md:block hidden"
        onFilterClick={onFilterClick}
        filters={filters}
        setFilters={setFilters}
      />
      {isFilterOpen && (
        <div className="fixed rounded inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div
            ref={filterRef}
            className=" w-[80%] relative top-5 "
          >
            <FilterProducts
              className="lg:hidden md:hidden overflow-y-auto block dark:bg-black dark:text-white bg-white"
              onFilterClick={onFilterClick}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}
