import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import useTable from '../../Helpers/Hooks/useTable';
import Pagination from './Pagination';
import Search from './Search';
import SortButton from './SortButton';
import './Table.css';

/**
 * Table component
 *
 * @component
 */
const Table = ({ columns, searchFields }) => {
  const {
    data,
    loading,
    sortTableData: onSort,
    sortStatus,
    total,
    setCurrentPage,
    currentPage,
    setSearchText: searchOnChange,
    searchText,
  } = useTable({
    url: 'https://swapi.dev/api/people/',
    searchFields,
  });

  return (
    <div className="table_wrapper">
      <div className="table_header">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          total={total}
          loading={loading}
        />
        <Search
          searchText={searchText}
          onChange={searchOnChange}
          loading={loading}
        />
      </div>
      <table className="table_main">
        <thead>
          <tr>
            {columns.map((x) => (
              <th key={uuidv4()}>
                {x.Header}
                <SortButton
                  key={uuidv4()}
                  sortStatus={sortStatus}
                  accessor={x.accessor}
                  onSort={onSort}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line no-nested-ternary
            loading ? (
              <div className="loading_spinner">
                <i className="fa fa-spinner fa-spin" aria-hidden="true" />
              </div>
            ) : data ? (
              data.map((x) => (

                <tr key={uuidv4()}>
                  {columns.map((col) => {
                    if (col?.Cell) {
                      const { Cell } = col;
                      return (
                        <td key={uuidv4()}>
                          <Cell row={x[col.accessor]} />
                        </td>
                      );
                    }
                    return <td key={uuidv4()}>{x[col.accessor]}</td>;
                  })}
                </tr>
              ))
            ) : (
              ''
            )
          }
        </tbody>

      </table>
    </div>
  );
};
Table.propTypes = {
  columns: PropTypes.array,
  searchFields: PropTypes.array,

};

export default Table;
