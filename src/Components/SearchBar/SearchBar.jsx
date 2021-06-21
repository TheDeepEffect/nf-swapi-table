import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import GET from '../../Helpers/HttpService';
import { Context, HANDLE_SNACKBAR } from '../../Store/Store';
import './SearchBar.css';

/**
 * Searchbar to search people data from SWAPI
 *
 * @component
 */
const SearchBar = ({ selectedResult, setSelectedResult, setData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [, dispatch] = useContext(Context);
  const debounceSearch = (fun, delay = 300) => {
    let timeoutId;
    return (args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        fun(args);
      }, delay);
    };
  };

  const fetchSearchData = async (query) => {
    try {
      const url = `https://swapi.dev/api/people/?search=${query}`;
      const data = await GET({ url });
      if (data) {
        setData(data);
        setSuggestions(data?.results?.map((result) => result?.name));
      }
    } catch (err) {
      dispatch({
        type: HANDLE_SNACKBAR,
        payload: {
          visible: true,
          label: err?.message || 'Error in searching data',
          type: 'alert',
        },
      });
    }
  };
  const handleOnSearch = (value) => {
    fetchSearchData(value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSearchData = useCallback(debounceSearch(handleOnSearch), []);

  useEffect(() => {
    if (searchQuery) {
      onSearchData(searchQuery);
    }
  }, [onSearchData, searchQuery]);

  const handleOnSelectSuggestion = (result) => {
    setSearchQuery(result);
    setSelectedResult(result);
  };

  return (
    <div className="search_bar_wrapper">
      <input
        className="search_bar"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setSelectedResult('');
          setData(null);
        }}
      />
      {searchQuery.length
        && suggestions.length
        && suggestions.every((x) => x !== searchQuery)
        && !selectedResult
        ? (
          <div className="suggestions">
            {
              suggestions.map((result) => (
                <div
                  className="single_suggestion"
                  key={uuidv4()}
                  onClick={() => handleOnSelectSuggestion(result)}
                  aria-hidden="true"
                >
                  <span>{result}</span>
                </div>
              ))
            }
          </div>
        )
        : ''}
    </div>
  );
};
SearchBar.propTypes = {
  selectedResult: PropTypes.string,
  setSelectedResult: PropTypes.func,
  setData: PropTypes.func,
};
export default SearchBar;
