import PropTypes from 'prop-types';
import useFetchSpecies from '../../Helpers/Hooks/useFetchSpecies';
import Card from '../Card';
import './CardWrapper.css';

/**
 * Wrapper component for Cards
 *
 * @component
 */
const CardWrapper = ({ totalResults, selectedResult }) => {
  const { speciesData, loading, totalSpecies } = useFetchSpecies();
  return (
    <div className="cards_wrapper">
      <Card
        content={{
          title: 'Total Search  Results',
          data: totalResults || 0,
        }}
        style={{ width: '90%' }}
      />
      <Card
        content={{
          title: 'Selected Search Result',
          allData: selectedResult,
        }}
        style={{ width: '90%' }}
      />
      <Card
        loading={loading}
        content={{
          title: 'Total Species',
          data: totalSpecies || 0,
        }}
        style={{ width: '90%' }}
      />
      {speciesData?.length
        ? speciesData.map((species) => (
          <Card
            content={{
              title: `Total ${species?.name}`,
              data: species.people.length || 0,
            }}
          />
        ))
        : ''}
    </div>
  );
};
CardWrapper.propTypes = {
  totalResults: PropTypes.number,
  selectedResult: PropTypes.object,
};
export default CardWrapper;
