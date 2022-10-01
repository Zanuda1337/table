import React, { useEffect } from "react";
import classes from "../Table.module.scss";
import SvgSelector from "../../SvgSelector/SvgSelector";

const TheadCell = ({ orderBy, sortBy, onSort, headCell }) => {
  return (
    <th>
      <div className={classes["thead-cell"]}>
        <p>{headCell.property}</p>
        {headCell.sortable && (
          <button
            className={`${classes["grid-button"]} ${classes["common-button"]} ${
              orderBy && sortBy === headCell.value && classes["active"]
            } ${
              orderBy === "desc" && sortBy === headCell.value && classes["rotated"]
            }`}
            onClick={() => onSort(headCell.value)}
          >
            <SvgSelector id="arrow" />
          </button>
        )}
      </div>
    </th>
  );
};
export default TheadCell;
