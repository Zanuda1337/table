import React, { useState } from "react";
import tableClasses from "../Table.module.scss";
import classes from "./Filter.module.scss";
import SvgSelector from "components/SvgSelector/SvgSelector";
import Form from "./Form/Form";

const Filter = ({
  headCells,
  operators,
  property,
  setProperty,
  operator,
  filter,
  orderBy,
  sortBy,
  setOperator,
  onReset,
  onApply,
}) => {
  const [isOpen, setOpen] = useState(false);
  // Был ли фильтр изменен
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [isFilterDirty, setIsFilterDirty] = useState(false);

  return (
    <div
      className={`${classes.filter} ${tableClasses.indent} ${tableClasses.tools}`}
    >
      {!isOpen ? (
        <h2>Таблица</h2>
      ) : (
        <Form
          operators={operators}
          headCells={headCells}
          property={property}
          filter={filter}
          setProperty={setProperty}
          setIsFilterDirty={setIsFilterDirty}
          setIsFilterChanged={setIsFilterChanged}
          isFilterDirty={isFilterDirty}
          operator={operator}
          setOperator={setOperator}
        />
      )}
      <div className={classes.buttons}>
        {filter.value && isOpen && (
          <button
            className={`${tableClasses["common-button"]} ${classes["button"]}`}
            onClick={() => {
              filter.setValue("");
              setOpen(false);
              setIsFilterChanged(false);
              setIsFilterDirty(false);
              onReset();
            }}
          >
            <SvgSelector id="reset" />
          </button>
        )}
        {filter.value && isOpen && isFilterChanged && isFilterDirty ? (
          <button
            className={`${tableClasses["common-button"]} ${classes["button"]} ${
              filter.value && classes["active"]
            }`}
            onClick={() => {
              setOpen(!isOpen);
              setIsFilterChanged(false);
              setIsFilterDirty(false);
              onApply({
                operator,
                property,
                filterValue: filter.value,
                orderBy,
                sortBy,
              });
            }}
          >
            <SvgSelector id="checkmark" />
          </button>
        ) : (
          <button
            className={`${tableClasses["common-button"]} ${classes["button"]} ${
              filter.value && classes["active"]
            }`}
            onClick={() => setOpen(!isOpen)}
          >
            <SvgSelector id="filter" />
          </button>
        )}
      </div>
    </div>
  );
};
export default Filter;
