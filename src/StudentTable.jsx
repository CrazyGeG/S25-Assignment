//Displays all profiles in a sortable and filterable table.

//Imports React and the useState hook to manage component state (used for filtering input).
import React, { useState } from "react";
//imports hooks from the TanStack Table, useTable: creates the table instance, useSortBy: adds sorting functionality, and useFilters: adds filtering functionality.
import { useTable, useSortBy, useFilters } from "@tanstack/react-table";

// define the StudentTable component
//students is passed as a prop containing an array of student objects.
const StudentTable = ({ students }) => {
    // define a state variable filterInput to store the value types in the filter box
    // setFilterInput updates the state when the user types in the input field
  const [filterInput, setFilterInput] = useState("");

  // Filtering function
    //filters the students array based on the filterInput value
    //The filter is case-insensitive, meaning it will match regardless of the case of the letters.
    //if filterInput is empty, all students are shown.
    //if filterInput is "a", it filters the students with "a" in their name will be displayed
  const filteredData = students.filter(student =>
    student.name.toLowerCase().includes(filterInput.toLowerCase())
  );
    // Table columns definition
    // Header: display name of the column
    // accessor: refer to the corresponding key in the student array
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Favorite Food", accessor: "favoriteFood" },
    { Header: "Favorite Color", accessor: "favoriteColor" },
    { Header: "Likes", accessor: "likes" },
  ];

  //Creat the table instance
    // pass columns and filteredData(students that match the search)
    // useFilters enables filtering, and useSortBy enables sorting
  const tableInstance = useTable(
    { columns, data: filteredData },
    useFilters, useSortBy
  );

  //extract table props
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  //render the component
  // wraps everything in a Bootstrap-styled card
  //mt-4: margin-top, p-3: padding
  return (
    <div className="card mt-4 p-3">
      <h4>Student Directory</h4>

      {/* Filtering Input */}
      {/* type="text": standard input box for searching; className="form-control mb-2": use bootstrap styling for nice input appearance */}
      {/* placeholder: display hint text; value: current state of the input; onChange: updates the state when the user types */}
      <input
        type="text" 
        className="form-control mb-2"
        placeholder="Filter by name..."
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />

      {/* Table: table-bordered: adds borders to cell; table-striped: alternates row colors */}
      <table className="table table-bordered table-striped" {...getTableProps()}>
        {/* Header: table header group */}
        {/* table-dark: dark background for the header */}
        {/* headerGroups.map: render all column headers */}
        {/* getHeaderProps(column.getSortByToggleProps()) */}
        {/* column.getSortByToggleProps(): enables sorting when the header is clicked, display ascending or descending icons */}
        <thead className="table-dark">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Table body(rows) */}
        {/* rows.map: loops over student data to create table rows */}
        {/* prepareRow(row):ensure each row is properly formated */}
        {/* each row is wrapped in <tr>(getRowProps() handles attributes) */}
        {/* each cell <td> is generated dynamically using cell.render("Cell") */}
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
