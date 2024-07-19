import React from "react";

const Pagination = ({ postsPerPage, length, paginate }) => {
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className='join pagination'>
        {paginationNumbers.map((pageNumber) => (
            <button className='join-item btn' key={pageNumber} onClick={() => paginate(pageNumber)}>
            {pageNumber}
            </button>
        ))}
    </div>
  );
};

export default Pagination;
