import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useForm } from "react-hook-form";
import { type Inputs, type ModalProps } from "../../lib/types";
import { Input } from "../Input/Input";
import { createNewItem, mountNode } from "./helpers";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { addItem } from "../../app/reducer";

export function Modal({ isOpen, setIsOpen }: ModalProps) {
  const dispatch = useAppDispatch();
  const newItemId = useAppSelector(
    (state: RootState) => state.table.products.slice(-1)[0]["id"] + 1
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const handleAddItem = (data: Inputs) => {
    const newItem = createNewItem(data, newItemId);
    dispatch(addItem(newItem));
    setIsOpen(false);
  };
  return (
    <>
      {isOpen &&
        createPortal(
          <div className={styles.modal} onClick={() => setIsOpen(false)}>
            <div
              className={styles.itemForm}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setIsOpen(false)} className={styles.close}>
                &times;
              </button>
              <form onSubmit={handleSubmit((data) => handleAddItem(data))}>
                <h3 className={styles.title}>Create new Item</h3>
                <Input
                  register={register}
                  label="Title"
                  name="title"
                  error={errors.title ? true : false}
                />
                <Input
                  register={register}
                  label="Brand"
                  name="brand"
                  error={errors.brand ? true : false}
                />
                <Input
                  register={register}
                  label="Category"
                  name="category"
                  error={errors.category ? true : false}
                />
                <Input
                  register={register}
                  label="Description"
                  name="description"
                  error={errors.description ? true : false}
                />
                <Input
                  register={register}
                  label="Discount Percentage"
                  name="discountPercentage"
                  type="number"
                  error={errors.discountPercentage ? true : false}
                />
                <Input
                  register={register}
                  label="Rating"
                  name="rating"
                  type="number"
                  error={errors.rating ? true : false}
                />
                <Input
                  register={register}
                  label="Stock"
                  name="stock"
                  type="number"
                  error={errors.stock ? true : false}
                />
                <Input
                  register={register}
                  label="Price"
                  name="price"
                  type="number"
                  error={errors.price ? true : false}
                />
                <input type="submit" />
              </form>
            </div>
          </div>,
          mountNode
        )}
    </>
  );
}
