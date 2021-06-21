import PropTypes from 'prop-types';

/**
 * Search for table page data
 *
 * @component
 */
const Search = ({ searchText = '', onChange, loading }) => (
  <div className="search">
    <input
      type="text"
      className="search_bar"
      disabled={loading}
      value={searchText}
      placeholder="Search This Page"
      onChange={(e) => {
        const {
          target: { value },
        } = e;
        onChange(value);
      }}
    />
  </div>
);

Search.propTypes = {
  searchText: PropTypes.string,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default Search;
