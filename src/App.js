import { Table } from "./Components/Table";

function App() {
  const data = [
    {
      id: 1,
      col1: "c1r1",
      col2: "c2r1",
      col3: "c3r1",
    },
    {
      id: 2,
      col1: "c1r2",
      col2: "c2r2",
      col3: "c3r2",
    },
    {
      id: 3,
      col1: "c1r3",
      col2: "c2r3",
      col3: "c3r3",
    },
  ];
  const columns = [
    {
      Header: "#",
      accessor: "id",
    },
    {
      Header: "Column 1",
      accessor: "col1",
    },
    {
      Header: "Column 2",
      accessor: "col2",
    },
    {
      Header: "Column 3",
      accessor: "col3",
    },
  ];
  return (
    <div className="App">
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;
