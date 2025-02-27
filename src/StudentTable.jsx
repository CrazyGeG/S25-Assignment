//Displays all profiles in a sortable and filterable table.

//Imports React and the useState hook to manage component state (used for filtering input).
import React, { useState } from "react";
//imports hooks from the TanStack Table, useTable: creates the table instance, useSortBy: adds sorting functionality, and useFilters: adds filtering functionality.
import { useTable, useSortBy, useFilters } from "@tanstack/react-table";

