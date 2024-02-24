import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { deleteItem, editItems, revertItem } from "../../app/reducer";
import { RootState } from "../../app/store";
import { TableCellProps } from "../../lib/types";
import styles from "./EditCell.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
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
        className={`${styles.cellBtn} ${styles.done}`}
        onClick={setEditedRows}
        name="done"
      >
        <CheckIcon />
      </button>
      <button
        className={`${styles.cellBtn} ${styles.cancel}`}
        onClick={setEditedRows}
        name="cancel"
      >
        <ClearIcon />
      </button>
    </div>
  ) : (
    <div className={styles.cellContainer}>
      <button
        className={`${styles.cellBtn} ${styles.edit}`}
        onClick={setEditedRows}
      >
        <EditIcon />
      </button>
      <button
        className={`${styles.cellBtn} ${styles.remove}`}
        onClick={deleteRow}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
