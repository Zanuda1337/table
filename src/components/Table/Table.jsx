import React, { useCallback, useEffect, useState } from "react";
import classes from "./Table.module.scss";
import Filter from "./Filter/Filter";
import Pagination from "./Pagination/Pagination";
import TheadCell from "./TheadCell/TheadCell";
import SvgSelector from "../SvgSelector/SvgSelector";
import TableRow from "./TableRow/TableRow";
import { useInput } from "hooks/validation";

const Table = ({
  data,
  headCells,
  operators,
  isFetching,
  rowsPerPageOptions,
  fetchTableData,
}) => {
  const [orderBy, setOrderBy] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  // initialProperty - название столбца, который будет в выпадающем меню по умолчанию
  // Сюда попадет первый столбец, который является сортируемым и фильтруемым
  const initialProperty = headCells.find((headCell) => headCell.sortable).value;
  const [property, setProperty] = useState(initialProperty);
  const [operator, setOperator] = useState(operators[0].value);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // Опции валидации. Если в выпадающем списке выбран столбец (property), содержащий
  // только числовые значения, то опция onlyNumbers будет включена, а также
  // будут обрезаться лишние пробелы
  const options = {
    onlyNumber: headCells.find((headCell) => headCell.value === property)
      .numeric,
    trim: headCells.find((headCell) => headCell.value === property).numeric,
  };

  // Кастомный хук валидации, который помимо значения по умолчанию принимает опции валидации
  const filter = useInput("", options);

  // Всего страниц - это округление в большую сторону всех строк таблицы, поделенных на количество отображаемых строк,
  // а если строк нет, то будет всего 1 страница
  const totalPages = data.totalCount
    ? Math.ceil(data.totalCount / rowsPerPage)
    : 1;

  const generatePaginationParams = (currentPage, rowsPerPage) => {
    return {
      offset: (currentPage - 1) * rowsPerPage,
      limit: rowsPerPage,
    };
  };

  const generateOrderBy = (orderBy, sortBy, sort) => {
    if (orderBy === null || sortBy !== sort) {
      return "asc";
    }

    if (orderBy === "asc") {
      return "desc";
    }

    return null;
  };

  const generateTableDataParams = ({
    operator,
    property,
    filterValue,
    orderBy,
    sortBy,
    currentPage,
    rowsPerPage,
  }) => {
    const paginationParams = generatePaginationParams(currentPage, rowsPerPage);

    console.log('paginationParams', paginationParams);

    const params = {
      ...paginationParams,
    };

    if (filterValue.length > 0) {
      params.filter = {
        fieldName: property, // name, count, destination
        operator, // more, less, equal, contain
        value: filterValue, // text
      };
    }

    if (orderBy && sortBy) {
      params.sort = {
        orderBy,
        field: sortBy,
      };
    }

    return params;
  };

  const handleFilterApply = ({
    operator,
    property,
    filterValue,
    orderBy,
    sortBy,
  }) => {
    const newCurrentPage = 1;
    setCurrentPage(newCurrentPage)
    const params = generateTableDataParams({
      operator,
      property,
      filterValue,
      orderBy,
      sortBy,
      currentPage: newCurrentPage,
      rowsPerPage,
    });

    fetchTableData(params);
  };

  const handleSort = (sort) => {
    const generatedOrderBy = generateOrderBy(orderBy, sortBy, sort);
    setOrderBy(generatedOrderBy);
    setSortBy(sort);

    handleFilterApply({
      operator,
      property,
      filterValue: filter.value,
      orderBy: generatedOrderBy,
      sortBy,
    });
  };

  const handleFilterReset = useCallback(() => {
    if (orderBy && sortBy) {
      fetchTableData({
        sort: {
          orderBy,
          field: sortBy,
        },
      });
    }

    fetchTableData();
  }, [orderBy]);

  useEffect(() => {
    const params = generateTableDataParams({
      operator,
      property,
      filterValue: filter.value,
      orderBy,
      sortBy,
      currentPage,
      rowsPerPage,
    });

    fetchTableData(params);
  }, []);

  const handleCurrentPageChange = (value) => {
    setCurrentPage(value);

    const params = generateTableDataParams({
      operator,
      property,
      filterValue: filter.value,
      orderBy,
      sortBy,
      currentPage: value,
      rowsPerPage,
    });

    fetchTableData(params);
  };

  const handleRowsPerPageChange = (value) => {
    const newCurrentPage = 1;

    setCurrentPage(newCurrentPage);
    setRowsPerPage(value);

    const params = generateTableDataParams({
      operator,
      property,
      filterValue: filter.value,
      orderBy,
      sortBy,
      currentPage: newCurrentPage,
      rowsPerPage: value,
    });

    fetchTableData(params);
  };

  return (
    <div className={classes.table}>
      <div className={classes.container}>
        <Filter
          headCells={headCells}
          operators={operators}
          property={property}
          operator={operator}
          filter={filter}
          sortBy={sortBy}
          orderBy={orderBy}
          setProperty={setProperty}
          setOperator={setOperator}
          onReset={handleFilterReset}
          onApply={handleFilterApply}
        />
        <div className={classes.scroll}>
          <table>
            <thead>
              <tr>
                {headCells.map((headCell) => (
                  <TheadCell
                    key={headCell.value}
                    sortBy={sortBy}
                    orderBy={orderBy}
                    headCell={headCell}
                    operator={operator}
                    fetchTableData={fetchTableData}
                    setProperty={setProperty}
                    setOperator={setOperator}
                    onSort={handleSort}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {!isFetching &&
                data.items.map((item) => (
                  <TableRow key={item.id} value={item} />
                ))}
            </tbody>
          </table>
          {isFetching && (
            <div className={classes.preloader}>
              <SvgSelector id="preloader" />
            </div>
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          rowsPerPageOptions={rowsPerPageOptions}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          onCurrentPageChange={handleCurrentPageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </div>
  );
};
export default Table;
