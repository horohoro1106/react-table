import { useAppDispatch } from "../../app/hooks";
import { deleteItem } from "../../app/reducer";

export const EditCell = ({ row, table }) => {
  const dispatch = useAppDispatch();
  const deleteRow = () => {
    dispatch(deleteItem(row.index));
  };
  const meta = table.options.meta;
  const setEditedRows = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    meta?.setEditedRows((old: []) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
  };
  return meta?.editedRows[row.id] ? (
    <>
      <button onClick={() => 2}>X</button>{" "}
      <button onClick={setEditedRows}>✔</button>
    </>
  ) : (
    <>
      <button onClick={setEditedRows}>✐</button>
      <button onClick={deleteRow}>❌</button>
    </>
  );
};
