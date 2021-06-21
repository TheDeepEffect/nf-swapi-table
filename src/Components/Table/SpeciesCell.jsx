import { v4 as uuidv4 } from 'uuid';

/**
 * Cell Component to represent species type
 *
 * @component
 */
const SpeciesCell = (row) => {
  const getSpecies = (species) => {
    switch (species) {
      case 'Droid':
        return (
          <i
            className="fa fa-android"
            aria-hidden="true"
            key={uuidv4()}
          />
        );
      case 'Human':
        return (
          <i
            className="fa fa-user-circle"
            key={uuidv4()}
          />
        );
      default:
        return (
          <i
            className="fa fa-question-circle"
            aria-hidden="true"
            key={uuidv4()}
          />
        );
    }
  };
  if (row) {
    const { row: rowData } = row;
    if (rowData.length) {
      return rowData?.map((x) => getSpecies(x));
    }
  }
  return <i className="fa fa-question-circle" aria-hidden="true" />;
};

export default SpeciesCell;
