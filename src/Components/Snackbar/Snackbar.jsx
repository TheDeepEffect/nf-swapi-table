import PropTypes from 'prop-types';
import './Snackbar.css';

/**
 * Snacknar to show notifications
 *
 * @component
 */
const Snackbar = ({
  type, label, visible, onClose,
}) => (visible ? (
  <div className="snackbar_wrapper">
    <span>{type === 'alert' ? <i className="fa fa-warning" /> : ''}</span>
    <p>{label}</p>
    <span
      className="close"
      onClick={onClose}
      aria-hidden="true"
    >
      +
    </span>
  </div>
) : (
  ''
));
Snackbar.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  visible: PropTypes.bool,
  onClose: PropTypes.func,

};
export default Snackbar;
