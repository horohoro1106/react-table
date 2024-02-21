import { useEffect, useState } from "react";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { updateField } from "../../app/reducer";
import { TableCellProps } from "../../lib/types";

export function TableCell<TData, TValue>({
  getValue,
  row,
  column,
}: TableCellProps<TData, TValue>) {
  const initialValue = getValue() as string | number;
  const dispatch = useDispatch();
  const editedRows = useAppSelector(
    (state: RootState) => state.table.editedRows
  );
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    dispatch(updateField(row.index, column.id, value));
  };

  if (editedRows[row.id]) {
    return (
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={column.columnDef.meta?.type || "text"}
      />
    );
  }

  return <span>{value}</span>;
}
