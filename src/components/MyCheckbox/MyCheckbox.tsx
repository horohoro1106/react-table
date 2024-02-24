import styles from "./MyCheckbox.module.css";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type MyCheckboxProps = {
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function MyCheckbox({ isChecked, onChange }: MyCheckboxProps) {
  return (
    <>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className={styles.checkbox}
      />
      {isChecked ? (
        <CheckBoxIcon color="primary" />
      ) : (
        <CheckBoxOutlineBlankIcon />
      )}
    </>
  );
}
