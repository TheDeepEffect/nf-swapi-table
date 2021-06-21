import { useContext, useEffect, useState } from 'react';
import { Context, HANDLE_SNACKBAR } from '../../Store/Store';
import GET from '../HttpService';

const useFetchSpecies = () => {
  const [loading, setLoading] = useState(false);
  const [totalSpecies, setTotalSpecies] = useState(0);
  const [speciesData, setSpeciesData] = useState(null);
  const [, dispatch] = useContext(Context);
  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        setLoading(true);
        const url = 'https://swapi.dev/api/species';
        const data = await GET({ url });
        setTotalSpecies(data.count);
        const totalPages = Math.ceil(data.count / 10);
        const urls = [];
        for (let i = 2; i <= totalPages; i += 1) {
          urls.push(`${url}/?page=${i}`);
        }
        const allData = await Promise.all(urls.map((x) => GET({ url: x })));
        setSpeciesData([...data.results, ...allData.flatMap((x) => x.results)]);
      } catch (error) {
        dispatch({
          type: HANDLE_SNACKBAR,
          payload: {
            visible: true,
            label: error?.message || 'Error fetching Species',
            type: 'alert',
          },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSpeciesData();
  }, [dispatch]);

  return { loading, speciesData, totalSpecies };
};

export default useFetchSpecies;
