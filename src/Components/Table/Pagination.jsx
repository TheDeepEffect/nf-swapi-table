import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Paginaion for table
 *
 * @component
 */
const Pagination = ({
  total,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  loading,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  const pageButtons = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(
        <button
          className={`pagination_btn ${i === currentPage ? 'active' : ''}`}
          key={i}
          onClick={() => onPageChange(i)}
          type="button"
          disabled={loading}
        >
          {i}
        </button>,
      );
    }
    return pages;
  }, [currentPage, totalPages, loading, onPageChange]);
  return (
    <div className="pagination">
      <div className="pagination_btn_group">
        <button
          className="pagination_btn"
          disabled={loading || currentPage === 0}
          onClick={() => onPageChange(currentPage - 1)}
          type="button"
        >
          &lt;
        </button>
        {pageButtons}
        <button
          className="pagination_btn"
          disabled={loading || currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          type="button"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};
Pagination.propTypes = {
  total: PropTypes.number,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  loading: PropTypes.bool,
};
export default Pagination;
