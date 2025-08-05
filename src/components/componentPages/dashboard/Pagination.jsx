import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
  return (
    <div className='flex justify-between my-2'>
          <button
              className='border border-slate-300 py-1 px-3 rounded'
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
          >Previous</button>
          {pages.map((page) => (
              <button
                  className={` ${currentPage === page ? "bg-slate-300" : 'text-slate-300'} w-10 rounded dark:text-black`}
                  key={page}
                  onClick={()=>onPageChange(page)}
              > {page} </button>
          ))}
          <button
              className='border border-slate-300 py-1 px-3 rounded'
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
          >Next</button>
    </div>
  )
}

export default Pagination
