import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteItem, editItems, revertItem } from "../../app/reducer";
import { RootState } from "../../app/store";
import { TableCellProps } from "../../lib/types";
import styles from "./EditCell.module.css";

export function EditCell<TData, TValue>({
  row,
}: TableCellProps<TData, TValue>) {
  const dispatch = useAppDispatch();
  const editedRows = useAppSelector(
    (state: RootState) => state.table.editedRows
  );
  const deleteRow = () => {
    dispatch(deleteItem(row.index));
  };
  const setEditedRows = (e: React.MouseEvent<HTMLButtonElement>) => {
    const elName = e.currentTarget.name;
    dispatch(editItems(row.index));
    if (elName === "cancel" || elName === "done") {
      dispatch(revertItem(row.index, e.currentTarget.name === "cancel"));
    }
  };
  return editedRows[row.id] ? (
    <div className={styles.cellContainer}>
      <button
        className={`${styles.cellBtn} ${styles.cancel}`}
        onClick={setEditedRows}
        name="cancel"
      >
        ⚊
      </button>
      <button
        className={`${styles.cellBtn} ${styles.done}`}
        onClick={setEditedRows}
        name="done"
      >
        ✔
      </button>
    </div>
  ) : (
    <div className={styles.cellContainer}>
      <button
        className={`${styles.cellBtn} ${styles.edit}`}
        onClick={setEditedRows}
      >
        🛠
      </button>
      <button
        className={`${styles.cellBtn} ${styles.remove}`}
        onClick={deleteRow}
      >
        ❌
      </button>
    </div>
  );
}
