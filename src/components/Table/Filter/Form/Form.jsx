import classes from "../Filter.module.scss";
import React, { useEffect } from "react";

const Form = ({
  operators,
  headCells,
  property,
  setProperty,
  filter,
  setIsFilterChanged,
  setIsFilterDirty,
  isFilterDirty,
  setOperator,
  operator,
}) => {
  useEffect(() => {
    setIsFilterChanged(!!filter.value && isFilterDirty);
  }, [filter]);
  return (
    <form className={classes.form}>
      <div className={classes.field}>
        <label>Столбец</label>
        <select
          value={property}
          className={classes["select-property"]}
          onChange={(event) => {
            setOperator(operators[0].value);
            setProperty(event.target.value);
            setIsFilterDirty(true)
            setIsFilterChanged(true)
          }}
        >
          {headCells.map(
            (headCell) =>
              headCell.sortable && (
                <option
                  key={headCell.value}
                  value={headCell.value}
                >
                  {headCell.property}
                </option>
              )
          )}
        </select>
      </div>
      <div className={classes.field}>
        <label>Оператор</label>
        <select
          value={operator}
          onChange={(event) => {
            setOperator(event.target.value);
            setIsFilterChanged(true);
            setIsFilterDirty(true);
          }}
        >
          {operators
            .filter((operator) => {
              const headCell = headCells.find(
                (headCell) => headCell.value === property,
              );
              return headCell.numeric === operator.isRenderWithString || headCell.numeric;
            })
            .map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.field}>
        <label>Значение</label>
        <input
          type="text"
          value={filter.value}
          placeholder="значение фильтра"
          onChange={(event) => {
            filter.onChange(event);
            setIsFilterDirty(true);
          }}
        />
      </div>
    </form>
  );
};

export default Form;
