import React, { useState } from "react";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
} from "react-table";
import StudentModal from "../modals/StudentModal";

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div className="search-container">
      <input
        className="form-control search-input"
        placeholder="Type to search students..."
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </div>
  );
}

const Table = ({ columns, data, generateMessage, onStudentChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [studentClicked, setStudentClicked] = useState("");

  const hideModal = () => setShowModal(false);

  const handleRowClick = (studentInfo) => {
    setStudentClicked(studentInfo);
    setShowModal(true);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <div>
      <GlobalFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <table className="table border table-striped" {...getTableProps()}>
        <thead className="table-head">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope="col"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <i
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? "fas fa-sort-down"
                          : "fas fa-sort-up"
                        : "fas fa-sort"
                    }
                  ></i>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="table-row"
                onClick={() => handleRowClick(row.original)}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {studentClicked && (
        <StudentModal
          submitButtonName="Submit Changes"
          editStudentModal
          showStudentModal={showModal}
          hideModal={hideModal}
          studentInfo={studentClicked}
          generateMessage={generateMessage}
        />
      )}
    </div>
  );
};

export default Table;