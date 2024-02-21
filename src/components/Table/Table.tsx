import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error occurred, something went wrong 🤕</div>;
  }

  return (
    <>
      <FormModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div>
        <button className={styles.btnAdd} onClick={() => setIsModalOpen(true)}>
          + Add new Item
        </button>
        <input
          className={styles.filter}
          type="text"
          value={filtering}
          placeholder="Search..."
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className={styles.tableContainer}>
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
        <button
          onClick={handleDeleteSelectedRows}
          className={styles.btnDeleteSelected}
        >
          Delete Selected
        </button>
      </div>
      <div className={styles.btnContainer}>
        <button
          onClick={() => table.setPageIndex(0)}
          className={styles.btnDefault}
        >
          First page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className={styles.btnDefault}
        >
          Previous page
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className={styles.btnDefault}
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className={styles.btnDefault}
        >
          Last page
        </button>
      </div>
    </>
  );
}
