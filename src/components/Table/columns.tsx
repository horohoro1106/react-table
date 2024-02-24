import { createColumnHelper } from "@tanstack/react-table";
import { type Product } from "../../lib/types";
import { TableCell } from "../TableCell/TableCell";
import { EditCell } from "../EditCell/EditCell";
import { MyCheckbox } from "../MyCheckbox/MyCheckbox";

const columnHelper = createColumnHelper<Product>();

export const COLUMNS = [
  columnHelper.display({
    id: "select",
    header(props) {
      return (
        <MyCheckbox
          isChecked={props.table.getIsAllRowsSelected()}
          onChange={props.table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell(props) {
      return (
        <MyCheckbox
          isChecked={props.row.getIsSelected()}
          onChange={props.row.getToggleSelectedHandler()}
        />
      );
    },
  }),
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
    header: "Actions",
    id: "edit",
    cell: EditCell,
  }),
];
