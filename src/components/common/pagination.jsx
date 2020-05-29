import React from "react";
import PropTypes from "prop-types";

const itemsNumber = (count) => {
  const numbers = [];

  for (let index = 1; index <= count; index++) {
    numbers.push(index);
  }
  return numbers;
};

const Pagination = ({ totalCount, pageSize, onPageChange, currentPage }) => {
  const countPages = Math.ceil(totalCount / pageSize);

  const pages = itemsNumber(countPages);

  if (countPages === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
