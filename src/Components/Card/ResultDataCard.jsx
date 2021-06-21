import PropTypes from 'prop-types';

/**
 * Renders card for selected search result
 *
 * @component
 */
const ResultDataCard = ({ content }) => (
  <div className="all_data">
    <div className="name">
      <h3>Name</h3>
      <p>{content?.allData.name}</p>
    </div>
    <div className="gender">
      <h3>Gender</h3>
      <p>{content?.allData.gender}</p>
    </div>
    <div className="skin_color">
      <h3>Skin Color</h3>
      <div
        className="color"
        style={{ backgroundColor: content.allData.skin_color }}
      />
    </div>
    <div className="eye_color">
      <h3>Eye Color</h3>
      <div
        className="color"
        style={{ backgroundColor: content.allData.eye_color }}
      />
    </div>
    <div className="hair_color">
      <h3>Hair Color</h3>
      <div
        className="color"
        style={{ backgroundColor: content.allData.hair_color }}
      />
    </div>
  </div>
);
ResultDataCard.propTypes = {
  content: PropTypes.object,
};

export default ResultDataCard;
