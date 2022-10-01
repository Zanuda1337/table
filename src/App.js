import "assets/css/normalize.css";
import "assets/css/global.scss";
import React, { useEffect, useState } from "react";
import Table from "components/Table/Table";
import { getTableData } from "./API/api";

const App = () => {
  const [data, setData] = useState({ items: [], totalCount: 0 });
  const [isFetching, setIsFetching] = useState(false);
  const rowsPerPageOptions = [5, 10, 15];
  const headCells = [
    { value: 'date', property: 'дата', sortable: false, numeric: false },
    { value: 'name', property: 'название', sortable: true, numeric: false },
    { value: 'count', property: 'количество', sortable: true, numeric: true },
    { value: 'destination', property: 'расстояние', sortable: true, numeric: true },
  ];
  const operators = [
    { value: 'equal', label: 'равно', isRenderWithString: false },
    { value: 'contain', label: 'содержит', isRenderWithString: false },
    { value: 'more', label: 'больше, чем', isRenderWithString: true },
    { value: 'less', label: 'меньше, чем', isRenderWithString: true },
  ];

  const fetchTableData = async (params) => {
    setIsFetching(true);

    const response = await getTableData(params);
    setData(response.data);
    setIsFetching(false);
  };

  return (
    <Table
      data={data}
      headCells={headCells}
      operators={operators}
      isFetching={isFetching}
      rowsPerPageOptions={rowsPerPageOptions}
      fetchTableData={fetchTableData}
    />
  );
};

export default App;
