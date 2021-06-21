import PropTypes from 'prop-types';
import ResultDataCard from './ResultDataCard';
import './Card.css';

/**
 * Renders single card based on props
 *
 * @component
 */
const Card = ({ style, content, loading }) => (
  <div
    className="card_wrapper"
    style={{ color: 'black', backgroundColor: '#00f9b8', ...style }}
  >
    <h2>{content?.title}</h2>
    {
      // eslint-disable-next-line no-nested-ternary
      loading ? (
        <i className="fa fa-spinner fa-spin" aria-hidden="true" />
      ) : content?.allData ? (
        <ResultDataCard content={content} />
      ) : (
        <p>{content?.data}</p>
      )
    }
  </div>
);
Card.propTypes = {
  style: PropTypes.object,
  content: PropTypes.object,
  loading: PropTypes.bool,
};
export default Card;
