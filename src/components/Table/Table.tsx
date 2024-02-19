import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Modal } from "../Modal/Modal";
import { type Product } from "../../lib/types";

export function Table() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.table.products);
  const status = useAppSelector((state: RootState) => state.table.status);
  const columns: ColumnDef<Product>[] = useMemo(function () {
    return [
      { header: "ID", accessorKey: "id" },
      { header: "Title", accessorKey: "title" },
      { header: "Brand", accessorKey: "brand" },
      { header: "Category", accessorKey: "category" },
      { header: "Description", accessorKey: "description" },
      { header: "Rating", accessorKey: "rating" },
      { header: "Stock", accessorKey: "stock" },
      { header: "Price", accessorKey: "price" },
      {
        header: "Discount",
        accessorKey: "discountPercentage",
        cell: (info) => info.getValue() + "%",
      },
      {
        header: "Sale Price",
        accessorFn: (row) =>
          (row.price - (row.price * row.discountPercentage) / 100).toFixed(2),
      },
      {
        Header: "Delete",
        id: "delete",
        accessor: () => "delete",
        cell: (tableProps) => (
          <>
            <span>⚙</span>
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                // ES6 Syntax use the rvalue if your data is an array.
                const dataCopy = [...data];
                // It should not matter what you name tableProps. It made the most sense to me.
                dataCopy.splice(tableProps.row.index, 1);
                /* setData(dataCopy); */
              }}
            >
              ❌
            </span>
          </>
        ),
      },
    ];
  }, []);
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
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  console.log(data);

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
