import { CellContext } from "@tanstack/react-table";
import { type Path, type UseFormRegister } from "react-hook-form";

//TData
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type EditedRows = Record<string, boolean>;

export type TableState = {
  products: Product[];
  revertCopy: Product[];
  editedRows: EditedRows;
  status: "idle" | "loading" | "succeeded" | "error";
};

export type FormModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Inputs = Omit<Product, "id" | "images" | "thumbnail">;

export type FormInputFieldProps = {
  register: UseFormRegister<Inputs>;
  label: string;
  name: Path<Inputs>;
  type?: string;
  error: boolean;
};

export type TableCellProps<TData = unknown, TValue = unknown> = CellContext<
  TData,
  TValue
>;
