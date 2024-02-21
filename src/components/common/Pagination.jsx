import React from 'react';
import * as Icons from "react-icons/tb";


const Pagination = ({ currentPage, totalPages, onPageChange,className }) => {
  const handlePageChange = (pageNumber) => {
    if (onPageChange) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={`pagination ${className ? className : ""}`}>
      <ul>
        <li className="prev" onClick={handlePrevClick}>
          <Icons.TbChevronLeft />
        </li>
        {renderPageNumbers()}
        <li className="next" onClick={handleNextClick}>
          <Icons.TbChevronRight />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
