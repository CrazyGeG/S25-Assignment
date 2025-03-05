import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

// Define the StudentTable component
// React.memo is used to optimize performance by memoizing the component,which is suggested by Deepseek
// It prevents unnecessary re-renders when the props haven't changed. I have the infinite rendering bug, and this this one of the method Deepseek suggested.
// This is a functional component that takes in students and setSelectedStudent as props.
// students is an array of student objects, and setSelectedStudent is a function to set the selected student when a row is clicked.
const StudentTable = React.memo(({ students, setSelectedStudent }) => {
 
  {/* Debug Line */}
  console.log("Rendering StudentTable with students:", students);

  // State to manage the filter input for the table
  // This state is used to filter the student list based on the name.
  const [filterInput, setFilterInput] = useState("");

  // useMemo is used to memoize the filtered data based on the filterInput.
  // It returns a new array of students whose names include the filter input.
  const filteredData = React.useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(filterInput.toLowerCase())
    );
  }, [students, filterInput]);

  // Define the columns for the table
  // Each column has an accessorKey, header, and sorting function.
  // The accessorKey is used to access the data in each row.
  // The header is the title of the column, and enableSorting allows sorting on that column.
  // sortingFn is the function used to sort the data in that column.
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableSorting: true,
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "favoriteFood",
        header: "Favorite Food",
        enableSorting: true,
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "favoriteColor",
        header: "Favorite Color",
        enableSorting: true,
        sortingFn: "alphanumeric",
      },
    ],
    []
  );

  // set up the table instance using useReactTable
  const tableInstance = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // returns column header and rows with student data
  const { getHeaderGroups, getRowModel } = tableInstance;

  return (
    //{/* Render the table */}
    <div className="card mt-4 p-4" style={{ maxWidth: "90%", margin: "0 auto" }}>
      <h4>Student Directory</h4>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Filter by name..."
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
        style={{ fontSize: "16px", padding: "10px" }}
      />
      <div style={{ overflowX: "auto" }}>
      <table 
        className="table table-bordered table-striped"
        style ={{ minWidth: "800px", fontSize: "18px" }}>
        <thead className="table-dark">
          {getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  onClick={
                    column.column.getCanSort()
                      ? () => column.column.toggleSorting()
                      : undefined
                  }
                  style={{
                    cursor: column.column.getCanSort() ? "pointer" : "default",
                    padding: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {flexRender(column.column.columnDef.header, column.getContext())}
                  {column.column.getIsSorted() === "asc"
                    ? " 🔼"
                    : column.column.getIsSorted() === "desc"
                    ? " 🔽"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => setSelectedStudent(row.original)}
              style={{ cursor: "pointer", height:"50px" }}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ padding: "12px", whiteSpace: "nowrap" }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
});

export default StudentTable;