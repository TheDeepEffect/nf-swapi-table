import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import SearchBar from '../Components/SearchBar/SearchBar';
import CardWrapper from '../Components/CardsWrapper/CardWrapper';
import './SearchPage.css';
import { Context, HANDLE_SNACKBAR } from '../Store/Store';

/**
 *
 * Search page for App containg Searching functionality
 * @component
 */
const SearchPage = () => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'unset';
    };
  }, []);
  const [, dispatch] = useContext(Context);
  const [data, setData] = useState(null);
  const [selectedResult, setSelectedResult] = useState('');
  const isResultEmpty = useMemo(() => {
    if (data?.results?.length === 0) {
      return true;
    }
    return false;
  }, [data]);

  useEffect(() => {
    if (isResultEmpty) {
      dispatch({
        type: HANDLE_SNACKBAR,
        payload: {
          label: 'No results found for this search',
          type: 'alert',
          visible: true,
        },
      });
    }
  }, [isResultEmpty, dispatch]);

  return (
    <div className="search_page">
      <SearchBar
        data={data}
        setData={setData}
        setSelectedResult={setSelectedResult}
        selectedResult={selectedResult}
      />
      <CardWrapper
        totalResults={data?.count}
        selectedResult={data?.results?.find((x) => x?.name === selectedResult)}
      />
    </div>
  );
};

export default SearchPage;
