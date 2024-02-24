import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Select from "react-select";
import { RootState } from "../../app/store";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styles from "./Table.module.css";
import { FormModal } from "../FormModal/FormModal";
import { COLUMNS } from "./columns";
import { removeSelectedItems } from "../../app/reducer";

export function Table() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.table.products);
  const status = useAppSelector((state: RootState) => state.table.status);
  const columns = useMemo(() => COLUMNS, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleDeleteSelectedRows = () => {
    const selectedRowsIndexes = table
      .getSelectedRowModel()
      .rows.map((row) => row.index);
    dispatch(removeSelectedItems(selectedRowsIndexes));
    table.resetRowSelection();
  };
  const itemsPerPageOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 15, label: "15" },
    { value: 20, label: "20" },
  ];

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error occurred, something went wrong 🤕</div>;
  }

  return (
    <>
      <FormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div className={styles.btnContainer}>
        <input
          className={styles.filter}
          type="text"
          value={filtering}
          placeholder="Search..."
          onChange={(e) => setFiltering(e.target.value)}
        />
        <button className={styles.btnAdd} onClick={() => setIsModalOpen(true)}>
          + Add new Item
        </button>
        <button
          disabled={table.getSelectedRowModel().rows.length === 0}
          onClick={handleDeleteSelectedRows}
          className={styles.btnDeleteSelected}
        >
          Delete Selected
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.btnContainer}>
        Items per page
        <Select
          options={itemsPerPageOptions}
          value={itemsPerPageOptions.find(
            (option) => option.value == table.getState().pagination.pageSize
          )}
          onChange={(selectedOption) =>
            selectedOption && table.setPageSize(Number(selectedOption.value))
          }
        />
        <span className={styles.rowInfo}>
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          -
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            table.getState().pagination.pageSize}{" "}
          of {table.getCoreRowModel().rows.length}
        </span>
        <button
          onClick={() => table.setPageIndex(0)}
          className={styles.btnDefault}
        >
          <FirstPageIcon fontSize="large" />
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className={styles.btnDefault}
        >
          <NavigateBeforeIcon fontSize="large" />
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className={styles.btnDefault}
        >
          <NavigateNextIcon fontSize="large" />
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className={styles.btnDefault}
        >
          <LastPageIcon fontSize="large" />
        </button>
      </div>
    </>
  );
}
