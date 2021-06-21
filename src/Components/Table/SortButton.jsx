import PropTypes from 'prop-types';

/**
 * Sort button for table header
 *
 * @component
 */
const SortButton = ({
  sortStatus: { order, key },
  accessor,
  onSort,
}) => (
  <button
    className={`sort_button${order === 'asce' && key === accessor ? ' asce' : ''}`}
    onClick={() => onSort(accessor)}
    type="button"
  >
    {order !== 'default' && key === accessor ? '^' : '-'}
  </button>
);

SortButton.propTypes = {
  sortStatus: PropTypes.object,
  accessor: PropTypes.string,
  onSort: PropTypes.func,
};
export default SortButton;
