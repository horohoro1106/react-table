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

export type TableState = {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "error";
};

export type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Inputs = Omit<Product, "id" | "images" | "thumbnail">;

export type InputFieldProps = {
  register: UseFormRegister<Inputs>;
  label: string;
  name: Path<Inputs>;
  type?: string;
  error: boolean;
};
