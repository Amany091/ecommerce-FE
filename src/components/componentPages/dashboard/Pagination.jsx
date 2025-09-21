
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null; // no need to render if only one page

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 my-4">
      {/* Previous */}
      <button
        className="border border-slate-300 py-1 px-3 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 rounded transition-colors ${
            currentPage === page
              ? "bg-slate-300 text-black"
              : "text-slate-500 hover:bg-slate-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        className="border border-slate-300 py-1 px-3 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
