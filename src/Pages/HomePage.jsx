import Table from '../Components/Table';
import CommonCell from '../Components/Table/CommonCell';
import SpeciesCell from '../Components/Table/SpeciesCell';
import './HomePage.css';

/**
 *
 * Home page for App containg Table of people
 * @component
 */
const HomePage = () => {
  const searchFields = [
    'name',
    'height',
    'mass',
    'skin_color',
    'eye_color',
    'birth_year',
    'gender',
    'homeworld',
    'films',
    'species',
    'vehicles',
    'starships',
    'created',
    'edited',
  ];
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Height',
      accessor: 'height',
    },
    {
      Header: 'Mass',
      accessor: 'mass',
    },
    {
      Header: 'Skin Color',
      accessor: 'skin_color',
    },
    {
      Header: 'Eye color',
      accessor: 'eye_color',
    },
    {
      Header: 'Birth Year',
      accessor: 'birth_year',
    },
    {
      Header: 'Gender',
      accessor: 'gender',
    },
    {
      Header: 'Homeworld',
      accessor: 'homeworld',
    },
    {
      Header: 'Films',
      accessor: 'films',
      Cell: CommonCell,
    },
    {
      Header: 'Species',
      accessor: 'species',
      Cell: SpeciesCell,
    },
    {
      Header: 'Vechicles',
      accessor: 'vehicles',
      Cell: CommonCell,
    },
    {
      Header: 'Starships',
      accessor: 'starships',
      Cell: CommonCell,
    },
    {
      Header: 'Created At',
      accessor: 'created',
    },
    {
      Header: 'Edited At',
      accessor: 'edited',
    },
  ];
  return (
    <div className="homepage">
      <Table columns={columns} caption="SWAPI" searchFields={searchFields} />
    </div>
  );
};

export default HomePage;
