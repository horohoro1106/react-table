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
import { Modal } from "../Modal/Modal";
import { COLUMNS } from "./columns";
import { updateField } from "../../app/reducer";

export function Table() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.table.products);
  const status = useAppSelector((state: RootState) => state.table.status);
  const columns = useMemo(() => COLUMNS, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedRows, setEditedRows] = useState({});
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        dispatch(updateField(rowIndex, columnId, value));
      },
      editedRows,
      setEditedRows,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error occurred, something went wrong 🤕</div>;
  }

  return (
    <>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <div>
        <button className="btn-add" onClick={() => setIsModalOpen(true)}>
          + Add new Item
        </button>
        <input
          className="filter"
          type="text"
          value={filtering}
          placeholder="Search..."
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table className="styled-table">
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
        <button className="btn-delete-selected">Delete Selected</button>
      </div>
      <div className="btn-container">
        <button onClick={() => table.setPageIndex(0)} className="btn-default">
          First page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="btn-default"
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
          className="btn-default"
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="btn-default"
        >
          Last page
        </button>
      </div>
    </>
  );
}
