import { Inputs } from "../../lib/types";

export const mountNode = document.getElementById("overlays") as HTMLDivElement;

export function createNewItem(data: Inputs, newId: number) {
  return {
    id: Number(newId),
    brand: data.brand,
    category: data.category,
    description: data.description,
    discountPercentage: Number(data.discountPercentage),
    price: Number(data.price),
    rating: Number(data.rating),
    stock: Number(data.stock),
    title: data.title,
    images: [],
    thumbnail: "",
  };
}
