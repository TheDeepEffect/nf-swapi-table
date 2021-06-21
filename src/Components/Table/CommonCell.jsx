import { v4 as uuidv4 } from 'uuid';

/**
 * Cell component for fields having more than 1 items in table
 *
 * @component
 */
const CommonCell = (row) => {
  if (row) {
    return row?.row?.map((x, i) => (
      <p key={uuidv4()}>
        {x}
        {i === row.row.length - 1 ? '' : ','}
        <br />
      </p>
    ));
  }
};
export default CommonCell;
