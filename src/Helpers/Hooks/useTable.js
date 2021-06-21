import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Context, HANDLE_SNACKBAR } from '../../Store/Store';
import GET from '../HttpService';

const useTable = ({ url, searchFields = [] }) => {
  const [, dispatch] = useContext(Context);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortStatus, setSortStatus] = useState({
    key: '',
    order: 'default',
  });
  const fetchSingleEntry = async (singleUrl, key) => {
    try {
      const response = await GET({ url: singleUrl });
      return response?.[key];
    } catch (error) {
      dispatch({
        type: HANDLE_SNACKBAR,
        payload: {
          visible: true,
          label: error?.mesage || 'Something went wrong',
          type: 'alert',
        },
      });
    }
  };
  const fetchMultipleEntries = async (entries, key) => {
    try {
      const response = await Promise.all(
        entries.map((entry) => fetchSingleEntry(entry, key)),
      );
      return response;
    } catch (error) {
      dispatch({
        type: HANDLE_SNACKBAR,
        payload: {
          visible: true,
          label: error?.message || 'Something went wrong',
          type: 'alert',
        },
      });
    }
  };
  const fetchAdditionalInfo = async (entry, i) => {
    const {
      homeworld, films, species, vehicles, starships, created, edited,
    } = entry;

    const homeWorldName = await fetchSingleEntry(homeworld, 'name');
    const filmTitles = await fetchMultipleEntries(films, 'title');
    const speicesName = await fetchMultipleEntries(species, 'name');
    const vehicleNames = await fetchMultipleEntries(vehicles, 'name');
    const starshipNames = await fetchMultipleEntries(starships, 'name');
    return {
      id: i + 1,
      ...entry,
      homeworld: homeWorldName,
      films: filmTitles,
      species: speicesName,
      vehicles: vehicleNames,
      starships: starshipNames,
      created: new Date(created).toLocaleDateString(),
      edited: new Date(edited).toLocaleDateString(),
    };
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchTableData = async (page = '') => {
    try {
      setLoading(true);
      const fetchURL = page ? `${url}?page=${page}` : url;
      const response = await GET({ url: fetchURL });
      setTotal(() => response?.count);
      const dataWithId = await Promise.all(
        response.results?.map(fetchAdditionalInfo),
      );
      setData(dataWithId);
    } catch (error) {
      dispatch({
        type: HANDLE_SNACKBAR,
        payload: {
          visible: true,
          label: error?.message || 'Error fetching table data',
          type: 'alert',
        },
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (currentPage) {
      fetchTableData(currentPage);
      setSortStatus({
        key: '',
        order: 'default',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const sortTableData = (key) => {
    let order = 'asce';
    switch (sortStatus.order) {
      case 'asce':
        if (key === sortStatus.key) {
          order = 'desc';
        }
        break;
      case 'desc':
        if (key === sortStatus.key) {
          order = 'default';
        }
        break;
      default:
        order = 'asce';
        break;
    }
    setSortStatus({ key, order });
  };
  const sortedData = useMemo(() => {
    let sortableData = data ? [...data] : [];
    if (searchText) {
      if (sortStatus.order !== 'default') {
        setSortStatus({
          ...sortStatus,
          order: 'default',
        });
      }
      sortableData = sortableData.filter(
        (x) => searchFields.some(
          (field) => x[field].toString().toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    } else if (sortStatus) {
      const { key } = sortStatus;
      if (key && sortStatus.order !== 'default') {
        sortableData.sort((a, b) => {
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(a[key])) {
            if (a?.[key] < b?.[key]) {
              return sortStatus.order === 'asce' ? -1 : 1;
            }
            if (a?.[key] > b?.[key]) {
              return sortStatus.order === 'desc' ? -1 : 1;
            }
            return 0;
          }
          return sortStatus.order === 'asce'
            ? a[key] - b[key]
            : b[key] - a[key];
        });
      } else {
        sortableData = data ? [...data] : [];
      }
    }
    return sortableData;
  }, [data, searchText, sortStatus, searchFields]);
  return {
    data: sortedData,
    fetchTableData,
    loading,
    sortTableData,
    sortStatus,
    total,
    currentPage,
    setCurrentPage,
    searchText,
    setSearchText,
  };
};

export default useTable;
