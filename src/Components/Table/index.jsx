import "./Table.css";
export const Table = ({ data = [], columns = [] }) => {
  return (
    <table className="table_main">
      <caption>abcs</caption>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          {columns.map((x) => (
            <th key={x.accessor}>{x.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((x) => (
          <tr key={x.id}>
            <td>
              <input type="checkbox" />
            </td>
            {columns.map((col) => (
              <td>{x[col["accessor"]]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
