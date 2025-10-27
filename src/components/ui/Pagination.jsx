import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Pagination({ total = 1, page, changePage, hasNextPage, hasPrevPage, totalPages }) {
  const [activePageNumber, setActivePageNumber] = useState(1);

  const pageNums = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    const windowSize = 5;
    const start = Math.max(1, page - Math.floor(windowSize / 2));
    const end = Math.min(total, start + windowSize - 1);

    return pageNums.slice(start - 1, end);
  };

  return (
    <div className="pagination-btns flex justify-between my-5 items-center gap-2">
      {/* Prev button */}
      <button
        className="rounded-[8px] text-[14px] border border-whiteBtnBorderColor py-[8px] px-[14px] flex items-center disabled:opacity-50"
        disabled={!hasPrevPage}
        onClick={() => changePage(page-1)}
      >
        <FaArrowLeft />
      </button>

      {/* Page numbers */}
      <div className="pages-nums flex items-center flex-wrap justify-center gap-1">
        {getVisiblePages().map((pageNum) => (
          <button
            key={pageNum}
            className={`rounded-[8px] text-[14px] px-3 py-2 transition ${
              page === pageNum
                ? "bg-inputBackground dark:text-black"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            onClick={() => changePage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next button */}
      <button
        className="rounded-[8px] text-[14px] border border-whiteBtnBorderColor py-[8px] px-[14px] flex items-center disabled:opacity-50"
        disabled={!hasNextPage}
        onClick={() => changePage(page+1)}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
