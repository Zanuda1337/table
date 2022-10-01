import React from "react";

const TableRow = ({ value: { name, count, destination, date } }) => {
  const formattedDate = new Date(date).toLocaleDateString("ru-RU");
  console.log("formattedDate", formattedDate);

  return (
    <tr>
      <td>{formattedDate}</td>
      <td>{name}</td>
      <td>{count}</td>
      <td>{destination}</td>
    </tr>
  );
};
export default TableRow;
