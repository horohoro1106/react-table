/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="vite/client" />
import "@tanstack/react-table"; //or vue, svelte, solid, etc.

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    type: string;
  }
}
