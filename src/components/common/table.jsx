import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table table-hover  table-striped  ">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <TableBody columns={columns} data={data} />
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        path: PropTypes.string,
        label: PropTypes.string,
      }),
      PropTypes.shape({
        content: PropTypes.func,
        key: PropTypes.string,
      }),
    ])
  ).isRequired,
  sortColumn: PropTypes.shape({
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  onSort: PropTypes.func.isRequired,

  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;
