import clsx from 'clsx';
import React, { useCallback } from "react";
import tableClasses from "../Table.module.scss";
import classes from "./Pagination.module.scss";

const Pagination = ({
  totalPages,
  rowsPerPageOptions,
  currentPage,
  rowsPerPage,
  onCurrentPageChange,
  onRowsPerPageChange,
}) => {
  const handlePageChange = useCallback((page) => {
    if (page < 1 || page > totalPages) return;

    onCurrentPageChange(page);
  }, [onCurrentPageChange, totalPages]);

  const rootPaginationClasses = clsx(classes.pagination, tableClasses.indent, tableClasses.tools);
  const isPreviousButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages;

  return (
    <div
      className={rootPaginationClasses}
    >
      <div className={classes["pagination-select"]}>
        <label>Строк на странице:</label>
        <div>
          <select
            value={rowsPerPage}
            onChange={(event) => {
              onRowsPerPageChange(event.target.value)
            }}
          >
            {rowsPerPageOptions.map((option, key) => (
              <option key={key}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={classes["pagination-actions"]}>
        <p>{`${currentPage} / ${totalPages}`}</p>
        <div className={classes["pagination-buttons"]}>
          <button
            disabled={isPreviousButtonDisabled}
            className={`${tableClasses["common-button"]}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ❮
          </button>
          <button
            disabled={isNextButtonDisabled}
            className={`${tableClasses["common-button"]}`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
