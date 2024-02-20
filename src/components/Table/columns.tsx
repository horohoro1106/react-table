import { createColumnHelper } from "@tanstack/react-table";
import { type Product } from "../../lib/types";
import { TableCell } from "../TableCell/TableCell";
import { EditCell } from "../EditCell/EditCell";

const columnHelper = createColumnHelper<Product>();

export const COLUMNS = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("category", {
    header: "Category",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("description", {
    header: "Description",
    cell: TableCell,
    meta: {
      type: "text",
    },
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: TableCell,
    meta: {
      type: "number",
    },
  }),
  columnHelper.display({
    id: "edit",
    cell: EditCell,
  }),
];

/* 
export const COLUMNS = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("title", {
    header: "Title",
  }),
  columnHelper.accessor("brand", {
    header: "Brand",
  }),
  columnHelper.accessor("category", {
    header: "Category",
  }),
  columnHelper.accessor("description", {
    header: "Description",
  }),
  columnHelper.accessor("rating", {
    header: "Rating",
  }),
  columnHelper.accessor("stock", {
    header: "Stock",
  }),
  columnHelper.accessor("price", {
    header: "Price",
  }),
  columnHelper.accessor("discountPercentage", {
    header: "Discount",
    cell: (props) => props.getValue() + "%",
  }),
  columnHelper.accessor("price", {
    header: "Sale Price",
    cell(props) {
      const price: number = props.row.getValue("price");
      const discount: number = props.row.getValue("discountPercentage");
      return (price - (price * discount) / 100).toFixed(2);
    },
  }),
  columnHelper.display({
    header: "Edit / Delete",
    id: "delete",
    cell: (tableProps) => (
      <>
        <span>Edit🛠</span>
        <span
          style={{}}
          onClick={() => {
            // ES6 Syntax use the rvalue if your data is an array.
            /*  const dataCopy = [...data];
              // It should not matter what you name tableProps. It made the most sense to me.
              dataCopy.splice(tableProps.row.index, 1); */
/* setData(dataCopy); */
/*   }}
          >
            Delete❌
          </span>
        </>
      ),
    }),
  ]; */
